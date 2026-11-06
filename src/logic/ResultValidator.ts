import ValidationError from '../errors/ValidationError';

export default class ResultValidator {
  isValidMeasure(value: number): boolean {
    return Number.isFinite(value) && value > 0;
  }

  validateMeasure(value: number, name: string): number {
    if (!this.isValidMeasure(value)) {
      throw new ValidationError(`Invalid calculation result (${name}): ${value}`);
    }

    return value;
  }
}
