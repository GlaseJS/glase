import { GlaseODMDriver } from "./driver";
import { Schema, T } from "./types";

export class GlaseODMModel<S extends Schema, Driver extends GlaseODMDriver<any>>
{
  constructor(protected _: Driver, public name: string, public schema: S) {}
}