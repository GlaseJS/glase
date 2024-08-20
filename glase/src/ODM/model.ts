import { Driver } from "./driver";
import { Schema, T } from "./types";

export class Model<S extends Schema, D extends Driver<any>>
{
  constructor(protected _: D, public name: string, public schema: S) {}
}