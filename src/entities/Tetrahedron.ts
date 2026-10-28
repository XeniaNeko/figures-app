import Point3D from './Point3D';
import Shape from './Shape';

export default class Tetrahedron extends Shape {
  readonly vertices: Point3D[];

  constructor(id: string, vertices: Point3D[]) {
    super(id);
    this.vertices = vertices;
  }
}
