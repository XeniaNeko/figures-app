import logger from './logger';
import Shape from './entities/Shape';
import OvalFactory from './factories/OvalFactory';
import TetrahedronFactory from './factories/TetrahedronFactory';
import OvalValidator from './validators/OvalValidator';
import TetrahedronValidator from './validators/TetrahedronValidator';
import ResultValidator from './validators/ResultValidator';
import OvalCalculator from './services/OvalCalculator';
import TetrahedronCalculator from './services/TetrahedronCalculator';
import ShapeReader from './services/ShapeReader';

const OVALS_FILE = 'data/ovals.txt';
const TETRAHEDRONS_FILE = 'data/tetrahedrons.txt';

const resultValidator = new ResultValidator();
const ovalCalculator = new OvalCalculator();
const tetraCalculator = new TetrahedronCalculator();

const measure = (value: number, name: string): string => resultValidator
  .validateMeasure(value, name).toFixed(2);

function logResults<T extends Shape>(shapes: T[], describe: (shape: T) => string): void {
  shapes.forEach((shape) => {
    try {
      logger.info(`${shape.id}: ${describe(shape)}`);
    } catch {
      logger.warn(`${shape.id}: расчёт отклонён (некорректный результат)`);
    }
  });
}

try {
  const ovals = new ShapeReader(new OvalFactory(new OvalValidator()), 'oval').readFile(OVALS_FILE);
  const tetras = new ShapeReader(new TetrahedronFactory(new TetrahedronValidator()), 'tetra')
    .readFile(TETRAHEDRONS_FILE);

  logResults(ovals, (oval) => `площадь=${measure(ovalCalculator.area(oval), 'площадь')}, `
    + `периметр=${measure(ovalCalculator.perimeter(oval), 'периметр')}`);
  logResults(tetras, (tetra) => `объём=${measure(tetraCalculator.volume(tetra), 'объём')}, `
    + `площадь поверхности=${measure(tetraCalculator.surfaceArea(tetra), 'площадь поверхности')}`);
} catch {
  logger.error('Работа остановлена: файл с данными недоступен');
}
