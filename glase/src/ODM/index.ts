export * as drivers from "./drivers";

import { GlaseODMDriver } from "./driver";
import { GlaseODMModel } from "./model";
import { Schema } from "./types";

export const Config = <
  Driver extends GlaseODMDriver<any> 
>(config: {
  driver: Driver
}) => ({
  Model: <S extends Schema>(name: string, schema: S) => new GlaseODMModel(config.driver, name, schema),
});