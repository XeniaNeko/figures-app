import ValidationError from '../errors/ValidationError';

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;
const WHITESPACE_REGEX = /\s+/;
const OVAL_PARAMS_COUNT = 4;

export default class OvalValidator {
  validateLine(line: string): number[] {
    const parts = line.trim().split(WHITESPACE_REGEX);

    if (parts.length !== OVAL_PARAMS_COUNT) {
      throw new ValidationError(`Нужно ${OVAL_PARAMS_COUNT} числа, получено ${parts.length}: "${line}"`);
    }

    const allNumbers = parts.every((part) => NUMBER_REGEX.test(part));

    if (!allNumbers) {
      throw new ValidationError(`Недопустимые символы в строке: "${line}"`);
    }

    const [x1, y1, x2, y2] = parts.map(Number);

    if (x1 === x2 || y1 === y2) {
      throw new ValidationError(`Точки лежат на одной прямой, параллельной оси: "${line}"`);
    }

    return [x1, y1, x2, y2];
  }
}
