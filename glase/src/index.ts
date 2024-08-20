import * as ODM from "./ODM";

// Using this reduces a bit the footprint of calls to get the proper parameters for each module.
type Params<T, Driver> = T extends { Config: (config: infer U) => void } ?
  Omit<U, "driver"> & { driver: Driver } :
  never;

export const Config = <
  ODMDriver extends ODM.Driver<any>
>(config: {
  ODM: Params<typeof ODM, ODMDriver>,
}) => ({
  ...ODM.Config(config.ODM),
});

export const drivers = {
  ...ODM.drivers,
};