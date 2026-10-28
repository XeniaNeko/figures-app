import Oval from '../entities/Oval';
import Point from '../entities/Point';
import OvalValidator from '../validators/OvalValidator';
import ShapeFactory from './ShapeFactory';

export default class OvalFactory implements ShapeFactory<Oval> {
  private readonly validator: OvalValidator;

  constructor(validator: OvalValidator) {
    this.validator = validator;
  }

  create(line: string, id: string): Oval {
    const [x1, y1, x2, y2] = this.validator.validateLine(line);

    return new Oval(id, new Point(x1, y1), new Point(x2, y2));
  }
}
