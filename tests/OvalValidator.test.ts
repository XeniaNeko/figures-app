import OvalValidator from '../src/validators/OvalValidator';
import ValidationError from '../src/errors/ValidationError';

describe('OvalValidator', () => {
  const validator = new OvalValidator();

  test('accepts a valid line', () => {
    const result = validator.validateLine('1.0 2.0 5.0 6.0');

    expect(result).toEqual([1, 2, 5, 6]);
    expect(result).toHaveLength(4);
  });

  test('rejects a line with an invalid character', () => {
    expect(() => validator.validateLine('2a.0 3.0 4.1 5.0')).toThrow(ValidationError);
    expect(() => validator.validateLine('2a.0 3.0 4.1 5.0')).toThrow('Invalid characters');
  });

  test('rejects a line with too few numbers', () => {
    expect(() => validator.validateLine('1.0 2.0')).toThrow(ValidationError);
    expect(() => validator.validateLine('1.0 2.0')).toThrow(/Expected 4 numbers/);
  });

  test('rejects points on a line parallel to an axis', () => {
    expect(() => validator.validateLine('1.0 2.0 1.0 6.0')).toThrow(ValidationError);
    expect(() => validator.validateLine('1.0 2.0 5.0 2.0')).toThrow(ValidationError);
  });
});
