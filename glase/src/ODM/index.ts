import { GetDrivers } from "glase/libs/types/getdrivers";

import * as drivers from "./drivers";
import { GlaseODMModel } from "./model";
import { Schema } from "./types";


const Config = (config: {
  driver: GetDrivers<typeof drivers>
}) => ({
  Model: <S extends Schema>(name: string, schema: S) => new GlaseODMModel(config.driver, name, schema),
});

export { Config, drivers }