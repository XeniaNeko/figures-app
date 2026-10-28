import TetrahedronCalculator from '../src/services/TetrahedronCalculator';
import TetrahedronFactory from '../src/factories/TetrahedronFactory';
import TetrahedronValidator from '../src/validators/TetrahedronValidator';
import ValidationError from '../src/errors/ValidationError';

describe('Tetrahedron', () => {
  const factory = new TetrahedronFactory(new TetrahedronValidator());
  const calculator = new TetrahedronCalculator();
  const corner = factory.create('0 0 0 1 0 0 0 1 0 0 0 1', 't1');
  const lifted = factory.create('1 1 1 2 1 1 1 2 1 1 1 2', 't2');
  const flat = factory.create('0 0 0 1 0 0 2 0 0 3 0 0', 't3');

  test('отношение объёмов при рассечении плоскостью', () => {
    const cut = factory.create('-1 0 0 1 0 0 1 1 0 1 0 1', 't4');
    const none = factory.create('1 1 1 2 1 1 1 2 1 1 1 2', 't5');

    expect(calculator.volumeRatio(cut, 'x')).toBeCloseTo(1 / 7);
    expect(calculator.volumeRatio(none, 'x')).toBeNull();
  });

  test('объём и площадь поверхности', () => {
    expect(calculator.volume(corner)).toBeCloseTo(1 / 6);
    expect(calculator.surfaceArea(corner)).toBeCloseTo(1.5 + Math.sqrt(3) / 2);
  });

  test('является ли тетраэдром', () => {
    expect(calculator.isTetrahedron(corner)).toBe(true);
    expect(calculator.isTetrahedron(flat)).toBe(false);
  });

  test('основание на координатной плоскости', () => {
    expect(calculator.isBaseOnCoordinatePlane(corner)).toBe(true);
    expect(calculator.isBaseOnCoordinatePlane(lifted)).toBe(false);
  });

  test('плохие строки отклоняются', () => {
    expect(() => factory.create('1 2 3', 'x')).toThrow(ValidationError);
    expect(() => factory.create('0 0 0 1 0 0 0 1 0 0 0 1a', 'y')).toThrow(ValidationError);
  });

  test('плоскость проходит через вершину или две вершины', () => {
    const oneOnPlane = factory.create('0 0 0 2 0 0 -1 1 0 -1 0 1', 't6');
    const twoOnPlane = factory.create('0 0 0 0 1 0 1 0 0 -1 0 1', 't7');

    expect(calculator.volumeRatio(oneOnPlane, 'x')).toBeCloseTo(4 / 5);
    expect(calculator.volumeRatio(twoOnPlane, 'x')).toBeCloseTo(1);
  });

  test('плоскость делит вершины 2 на 2', () => {
    const split = factory.create('-1 0 0 -2 1 0 1 0 0 1 0 3', 't8');

    expect(calculator.volumeRatio(split, 'x')).toBeGreaterThan(0);
    expect(calculator.volumeRatio(split, 'x')).toBeCloseTo(1 / 1.7692307692);
  });
});
