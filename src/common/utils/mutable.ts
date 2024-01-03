/**
 * readonlyの削除を行う
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
