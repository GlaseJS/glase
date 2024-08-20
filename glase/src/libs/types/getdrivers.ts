
export type GetDrivers<T> = T extends { [x in string]: () => infer Driver } ? Driver : never;