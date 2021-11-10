export function castTo<T>(): (row) => T {
  return (row) => row as T;
}
