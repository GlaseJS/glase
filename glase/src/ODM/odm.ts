import { GlaseODMDriver } from "./driver";
import { GlaseODMModel } from "./model";
import { Schema } from "./types";



export class GlaseODM<Driver extends GlaseODMDriver<any>>
{
  constructor(public driver: Driver)
  {
  
  }

  Model = <S extends Schema>(name: string, schema: S) => new GlaseODMModel(this, name, schema);
}

export const Init = <Driver extends GlaseODMDriver<any>>(driver: Driver) => new GlaseODM(driver);

