import logger from './logger';
import Shape from './entities/Shape';
import Oval from './entities/Oval';
import Tetrahedron from './entities/Tetrahedron';
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
const AXIS_CROSS_DISTANCE = 1;
const AXES = ['x', 'y', 'z'] as const;

const resultValidator = new ResultValidator();
const ovalCalculator = new OvalCalculator();
const tetraCalculator = new TetrahedronCalculator();

const measure = (value: number, name: string): string => resultValidator
  .validateMeasure(value, name).toFixed(2);

const ratioText = (ratio: number | null): string => (ratio === null ? 'no cut' : ratio.toFixed(3));

function describeOval(oval: Oval): string {
  return [
    `area=${measure(ovalCalculator.area(oval), 'area')}`,
    `perimeter=${measure(ovalCalculator.perimeter(oval), 'perimeter')}`,
    `isCircle=${ovalCalculator.isCircle(oval)}`,
    `isOval=${ovalCalculator.isOval(oval)}`,
    `crossesOnlyOneAxis(${AXIS_CROSS_DISTANCE})=${ovalCalculator.crossesOnlyOneAxis(oval, AXIS_CROSS_DISTANCE)}`,
  ].join(', ');
}

function describeTetrahedron(tetra: Tetrahedron): string {
  if (!tetraCalculator.isTetrahedron(tetra)) {
    return 'isTetrahedron=false (degenerate shape)';
  }

  const ratios = AXES.map((axis) => `${axis}=${ratioText(tetraCalculator.volumeRatio(tetra, axis))}`);

  return [
    'isTetrahedron=true',
    `volume=${measure(tetraCalculator.volume(tetra), 'volume')}`,
    `surface area=${measure(tetraCalculator.surfaceArea(tetra), 'surface area')}`,
    `baseOnCoordinatePlane=${tetraCalculator.isBaseOnCoordinatePlane(tetra)}`,
    `volumeRatio(${ratios.join(', ')})`,
  ].join(', ');
}

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

  logResults(ovals, describeOval);
  logResults(tetras, describeTetrahedron);
} catch {
  logger.error('Execution stopped: data file is unavailable');
}
