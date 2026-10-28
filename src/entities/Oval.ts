import Point from './Point';
import Shape from './Shape';

export default class Oval extends Shape {
  readonly pointA: Point;

  readonly pointB: Point;

  constructor(id: string, pointA: Point, pointB: Point) {
    super(id);
    this.pointA = pointA;
    this.pointB = pointB;
  }
}
