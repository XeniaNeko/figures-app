import Point3D from '../entities/Point3D';
import Tetrahedron from '../entities/Tetrahedron';
import TetrahedronValidator from '../validators/TetrahedronValidator';
import ShapeFactory from './ShapeFactory';

export default class TetrahedronFactory implements ShapeFactory<Tetrahedron> {
  private readonly validator: TetrahedronValidator;

  constructor(validator: TetrahedronValidator) {
    this.validator = validator;
  }

  create(line: string, id: string): Tetrahedron {
    const n = this.validator.validateLine(line);
    const vertices = [0, 3, 6, 9].map((i) => new Point3D(n[i], n[i + 1], n[i + 2]));

    return new Tetrahedron(id, vertices);
  }
}
