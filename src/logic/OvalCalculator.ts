import Oval from '../entities/Oval';

export default class OvalCalculator {
  private semiAxes(oval: Oval): [number, number] {
    const p = Math.abs(oval.pointB.x - oval.pointA.x) / 2;
    const q = Math.abs(oval.pointB.y - oval.pointA.y) / 2;

    return [p, q];
  }

  area(oval: Oval): number {
    const [p, q] = this.semiAxes(oval);

    return Math.PI * p * q;
  }

  perimeter(oval: Oval): number {
    const [p, q] = this.semiAxes(oval);

    return Math.PI * (3 * (p + q) - Math.sqrt((3 * p + q) * (p + 3 * q)));
  }

  isCircle(oval: Oval): boolean {
    const [p, q] = this.semiAxes(oval);

    return p > 0 && p === q;
  }

  isOval(oval: Oval): boolean {
    const [p, q] = this.semiAxes(oval);

    return p > 0 && q > 0 && p !== q;
  }

  crossesOnlyOneAxis(oval: Oval, distance: number): boolean {
    const { pointA: a, pointB: b } = oval;
    const crossesX = Math.min(a.y, b.y) <= -distance && Math.max(a.y, b.y) >= distance;
    const crossesY = Math.min(a.x, b.x) <= -distance && Math.max(a.x, b.x) >= distance;

    return crossesX !== crossesY;
  }
}
