export default interface ShapeFactory<T> {
  create(line: string, id: string): T;
}
