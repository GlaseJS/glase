import * as ODM from "./ODM";

// Using this reduces a bit the footprint of calls to get the proper parameters for each module.
type Params<T> = T extends { Config: (config: infer U) => void } ? U : never;

export const Config = (config: {
  ODM: Params<typeof ODM>,
}) => ({
  ...ODM.Config(config.ODM),
});

export const drivers = {
  ...ODM.drivers,
};