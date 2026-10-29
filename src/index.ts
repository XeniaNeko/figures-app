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
      logger.warn(`${shape.id}: calculation rejected (invalid result)`);
    }
  });
}

try {
  const ovals = new ShapeReader(new OvalFactory(new OvalValidator()), 'oval').readFile(OVALS_FILE);
  const tetras = new ShapeReader(new TetrahedronFactory(new TetrahedronValidator()), 'tetra')
    .readFile(TETRAHEDRONS_FILE);

  logResults(ovals, (oval) => `area=${measure(ovalCalculator.area(oval), 'area')}, `
    + `perimeter=${measure(ovalCalculator.perimeter(oval), 'perimeter')}`);
  logResults(tetras, (tetra) => `volume=${measure(tetraCalculator.volume(tetra), 'volume')}, `
    + `surface area=${measure(tetraCalculator.surfaceArea(tetra), 'surface area')}`);
} catch {
  logger.error('Execution stopped: data file is unavailable');
}
