import * as ODM from "./ODM";

// Using this reduces a bit the footprint of calls to get the proper parameters, and infers driver typing.
type Params<T> = T extends { Config: (config: infer U) => void, drivers: { [x in string]: () => infer Driver } } ?
  Omit<U, "driver"> & { driver: Driver } :
  never;

export const Config = (config: {
  ODM: Params<typeof ODM>,
}) => ({
  ...ODM.Config(config.ODM),
});

export const drivers = {
  ...ODM.drivers,
};