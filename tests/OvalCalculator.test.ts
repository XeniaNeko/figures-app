import OvalCalculator from '../src/services/OvalCalculator';
import Oval from '../src/entities/Oval';
import Point from '../src/entities/Point';

describe('OvalCalculator', () => {
  const calculator = new OvalCalculator();
  const circle = new Oval('c', new Point(0, 0), new Point(4, 4));
  const oval = new Oval('o', new Point(0, 0), new Point(6, 2));

  test('crosses only one axis', () => {
    const crossesYOnly = new Oval('a', new Point(-2, 3), new Point(2, 5));
    const crossesBoth = new Oval('b', new Point(-2, -2), new Point(2, 2));

    expect(calculator.crossesOnlyOneAxis(crossesYOnly, 1)).toBe(true);
    expect(calculator.crossesOnlyOneAxis(crossesBoth, 1)).toBe(false);
    expect(calculator.crossesOnlyOneAxis(crossesYOnly, 5)).toBe(false);
  });

  test('area of a circle with radius 2', () => {
    expect(calculator.area(circle)).toBeCloseTo(Math.PI * 4);
    expect(calculator.area(circle)).toBeGreaterThan(12);
  });

  test('perimeter of a circle with radius 2', () => {
    expect(calculator.perimeter(circle)).toBeCloseTo(2 * Math.PI * 2);
    expect(calculator.perimeter(circle)).toBeLessThan(13);
  });

  test('tells a circle from an oval', () => {
    expect(calculator.isCircle(circle)).toBe(true);
    expect(calculator.isCircle(oval)).toBe(false);
  });

  test('tells an oval from a circle and a degenerate shape', () => {
    expect(calculator.isOval(oval)).toBe(true);
    expect(calculator.isOval(circle)).toBe(false);
    expect(calculator.isOval(new Oval('d', new Point(0, 0), new Point(0, 5)))).toBe(false);
  });
});
