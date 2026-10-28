import { readFileSync } from 'fs';
import logger from '../logger';
import ShapeFactory from '../factories/ShapeFactory';
import ValidationError from '../errors/ValidationError';
import FileReadError from '../errors/FileReadError';

const LINE_SEPARATOR_REGEX = /\r?\n/;

export default class ShapeReader<T> {
  private readonly factory: ShapeFactory<T>;

  private readonly prefix: string;

  constructor(factory: ShapeFactory<T>, prefix: string) {
    this.factory = factory;
    this.prefix = prefix;
  }

  private readContent(path: string): string {
    try {
      return readFileSync(path, 'utf-8');
    } catch {
      throw new FileReadError(`Не удалось прочитать файл: ${path}`);
    }
  }

  readFile(path: string): T[] {
    const shapes: T[] = [];
    const lines = this.readContent(path).split(LINE_SEPARATOR_REGEX);

    lines.forEach((line, index) => {
      if (line.trim() === '') {
        return;
      }

      try {
        shapes.push(this.factory.create(line, `${this.prefix}-${index + 1}`));
        logger.info(`Строка ${index + 1}: фигура создана`);
      } catch (error) {
        if (error instanceof ValidationError) {
          logger.warn(`Строка ${index + 1} пропущена: ${error.message}`);
        } else {
          logger.error(`Строка ${index + 1}: неожиданная ошибка`);
        }
      }
    });

    return shapes;
  }
}
