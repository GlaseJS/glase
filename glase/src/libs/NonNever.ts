export type NonNever<T> = {
  [property in keyof T as T[property] extends never ? never : property]: T[property]
}

export type NonUndefined<T> = {
  [property in keyof T as T[property] extends undefined ? never : property]: T[property]
}