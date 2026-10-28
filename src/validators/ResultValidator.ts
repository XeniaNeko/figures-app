import ValidationError from '../errors/ValidationError';

export default class ResultValidator {
  isValidMeasure(value: number): boolean {
    return Number.isFinite(value) && value > 0;
  }

  validateMeasure(value: number, name: string): number {
    if (!this.isValidMeasure(value)) {
      throw new ValidationError(`Некорректный результат вычисления (${name}): ${value}`);
    }

    return value;
  }
}
