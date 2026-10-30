import ShapeReader from '../src/services/ShapeReader';
import OvalFactory from '../src/factories/OvalFactory';
import OvalValidator from '../src/validators/OvalValidator';
import TetrahedronFactory from '../src/factories/TetrahedronFactory';
import TetrahedronValidator from '../src/validators/TetrahedronValidator';
import FileReadError from '../src/errors/FileReadError';

describe('ShapeReader', () => {
  const ovalReader = new ShapeReader(new OvalFactory(new OvalValidator()), 'oval');

  test('reads ovals and skips invalid lines', () => {
    const ovals = ovalReader.readFile('data/ovals.txt');

    expect(ovals).toHaveLength(3);
    expect(ovals.map((oval) => oval.id)).toEqual(['oval-2', 'oval-8', 'oval-10']);
  });

  test('reads tetrahedrons and skips invalid lines', () => {
    const reader = new ShapeReader(new TetrahedronFactory(new TetrahedronValidator()), 'tetra');
    const tetras = reader.readFile('data/tetrahedrons.txt');

    expect(tetras).toHaveLength(3);
    expect(tetras[0].vertices).toHaveLength(4);
    expect(tetras.map((tetra) => tetra.id)).toEqual(['tetra-2', 'tetra-8', 'tetra-10']);
  });

  test('throws FileReadError when the file is missing', () => {
    expect(() => ovalReader.readFile('data/missing.txt')).toThrow(FileReadError);
    expect(() => ovalReader.readFile('data/missing.txt')).toThrow(/missing\.txt/);
  });
});
