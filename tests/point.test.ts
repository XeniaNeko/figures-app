import Point from '../src/entities/Point';

describe('Point', () => {
  test('сохраняет координаты', () => {
    const point = new Point(1, 2);

    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    expect(point).toBeInstanceOf(Point);
  });
});
