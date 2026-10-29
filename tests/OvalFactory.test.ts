import OvalFactory from '../src/factories/OvalFactory';
import OvalValidator from '../src/validators/OvalValidator';
import Oval from '../src/entities/Oval';
import ValidationError from '../src/errors/ValidationError';

describe('OvalFactory', () => {
  const factory = new OvalFactory(new OvalValidator());

  test('creates an oval from a valid line', () => {
    const oval = factory.create('1.0 2.0 5.0 6.0', 'oval-1');

    expect(oval).toBeInstanceOf(Oval);
    expect(oval.id).toBe('oval-1');
    expect(oval.pointA.x).toBe(1);
    expect(oval.pointB.y).toBe(6);
  });

  test('propagates the error for an invalid line', () => {
    expect(() => factory.create('2a.0 3.0 4.1 5.0', 'oval-2')).toThrow(ValidationError);
    expect(() => factory.create('1.0 2.0', 'oval-3')).toThrow(ValidationError);
  });
});
