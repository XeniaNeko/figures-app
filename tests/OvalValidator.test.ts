import OvalValidator from '../src/validators/OvalValidator';
import ValidationError from '../src/errors/ValidationError';

describe('OvalValidator', () => {
  const validator = new OvalValidator();

  test('принимает корректную строку', () => {
    const result = validator.validateLine('1.0 2.0 5.0 6.0');

    expect(result).toEqual([1, 2, 5, 6]);
    expect(result).toHaveLength(4);
  });

  test('отклоняет строку с недопустимым символом', () => {
    expect(() => validator.validateLine('2a.0 3.0 4.1 5.0')).toThrow(ValidationError);
    expect(() => validator.validateLine('2a.0 3.0 4.1 5.0')).toThrow('Недопустимые символы');
  });

  test('отклоняет строку с нехваткой чисел', () => {
    expect(() => validator.validateLine('1.0 2.0')).toThrow(ValidationError);
    expect(() => validator.validateLine('1.0 2.0')).toThrow(/Нужно 4 числа/);
  });

  test('отклоняет точки на одной прямой, параллельной оси', () => {
    expect(() => validator.validateLine('1.0 2.0 1.0 6.0')).toThrow(ValidationError);
    expect(() => validator.validateLine('1.0 2.0 5.0 2.0')).toThrow(ValidationError);
  });
});
