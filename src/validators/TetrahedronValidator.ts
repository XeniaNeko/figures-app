import ValidationError from '../errors/ValidationError';

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;
const WHITESPACE_REGEX = /\s+/;
const TETRAHEDRON_PARAMS_COUNT = 12;

export default class TetrahedronValidator {
  validateLine(line: string): number[] {
    const parts = line.trim().split(WHITESPACE_REGEX);

    if (parts.length !== TETRAHEDRON_PARAMS_COUNT) {
      throw new ValidationError(`Expected ${TETRAHEDRON_PARAMS_COUNT} numbers, got ${parts.length}: "${line}"`);
    }

    if (!parts.every((part) => NUMBER_REGEX.test(part))) {
      throw new ValidationError(`Invalid characters in line: "${line}"`);
    }

    return parts.map(Number);
  }
}
