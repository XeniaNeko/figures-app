import ShapeReader from '../src/services/ShapeReader';
import OvalFactory from '../src/factories/OvalFactory';
import OvalValidator from '../src/validators/OvalValidator';
import TetrahedronFactory from '../src/factories/TetrahedronFactory';
import TetrahedronValidator from '../src/validators/TetrahedronValidator';
import FileReadError from '../src/errors/FileReadError';

describe('ShapeReader', () => {
  const ovalReader = new ShapeReader(new OvalFactory(new OvalValidator()), 'oval');

  test('читает овалы и пропускает некорректные строки', () => {
    const ovals = ovalReader.readFile('data/ovals.txt');

    expect(ovals).toHaveLength(3);
    expect(ovals.map((oval) => oval.id)).toEqual(['oval-1', 'oval-4', 'oval-5']);
  });

  test('читает тетраэдры и пропускает некорректные строки', () => {
    const reader = new ShapeReader(new TetrahedronFactory(new TetrahedronValidator()), 'tetra');
    const tetras = reader.readFile('data/tetrahedrons.txt');

    expect(tetras).toHaveLength(3);
    expect(tetras[0].vertices).toHaveLength(4);
  });

  test('бросает FileReadError, если файла нет', () => {
    expect(() => ovalReader.readFile('data/missing.txt')).toThrow(FileReadError);
    expect(() => ovalReader.readFile('data/missing.txt')).toThrow(/missing\.txt/);
  });
});
