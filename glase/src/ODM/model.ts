import { GlaseODM } from "./odm";
import { Schema, T } from "./types";

export class GlaseODMModel<S extends Schema>
{
  constructor(protected _: GlaseODM<any>, public name: string, public schema: S) {}
}