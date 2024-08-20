import * as drivers from "./drivers";
import { Driver } from "./driver";
import { Model } from "./model";
import { Schema } from "./types";

const Config = <D extends Driver<any>>(config: {
  driver: D
}) => ({
  Model: <S extends Schema>(name: string, schema: S) => new Model(config.driver, name, schema),
});

export { Config, drivers, type Driver };