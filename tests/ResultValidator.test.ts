import ResultValidator from '../src/validators/ResultValidator';
import ValidationError from '../src/errors/ValidationError';

describe('ResultValidator', () => {
  const validator = new ResultValidator();

  test('accepts a positive result', () => {
    expect(validator.isValidMeasure(12.5)).toBe(true);
    expect(validator.validateMeasure(12.5, 'area')).toBe(12.5);
  });

  test('rejects zero, negative and infinite values', () => {
    expect(validator.isValidMeasure(0)).toBe(false);
    expect(validator.isValidMeasure(-1)).toBe(false);
    expect(validator.isValidMeasure(Infinity)).toBe(false);
    expect(validator.isValidMeasure(NaN)).toBeFalsy();
  });

  test('throws ValidationError for a bad result', () => {
    expect(() => validator.validateMeasure(0, 'volume')).toThrow(ValidationError);
    expect(() => validator.validateMeasure(0, 'volume')).toThrow(/volume/);
  });
});
