import ResultValidator from '../src/validators/ResultValidator';
import ValidationError from '../src/errors/ValidationError';

describe('ResultValidator', () => {
  const validator = new ResultValidator();

  test('принимает положительный результат', () => {
    expect(validator.isValidMeasure(12.5)).toBe(true);
    expect(validator.validateMeasure(12.5, 'площадь')).toBe(12.5);
  });

  test('отклоняет ноль, отрицательные и бесконечные значения', () => {
    expect(validator.isValidMeasure(0)).toBe(false);
    expect(validator.isValidMeasure(-1)).toBe(false);
    expect(validator.isValidMeasure(Infinity)).toBe(false);
    expect(validator.isValidMeasure(NaN)).toBeFalsy();
  });

  test('бросает ValidationError для плохого результата', () => {
    expect(() => validator.validateMeasure(0, 'объём')).toThrow(ValidationError);
    expect(() => validator.validateMeasure(0, 'объём')).toThrow(/объём/);
  });
});
