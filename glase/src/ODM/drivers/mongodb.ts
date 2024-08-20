import { invariant, singleton } from "glase/libs";
import { GlaseODMDriver } from "../driver";
import { Json } from "../types";
import { BSON, MongoClient } from "mongodb";


class MongoDbDriver extends GlaseODMDriver<{
  ObjectId: BSON.ObjectId,
  Password: string,
  Image:    BSON.Binary,
  JSON:     Json,
  
  Boolean:  boolean,
  Number:   number,
  String:   string,
  Date:     Date,
}>
{
  transformMap = {
    "ObjectId": (value: string)  => new BSON.ObjectId(value),
    "Password": (value: string)  => value,
    "Image"   : (value: Uint8Array)  => new BSON.Binary(value),
    "JSON"    : (value: Json)    => value,

    "Boolean" : (value: boolean) => value,
    "Number"  : (value: number)  => value,
    "String"  : (value: string)  => value,
    "Date"    : (value: Date)    => value
  };

  invertTransformMap = {
    "ObjectId": (value: BSON.ObjectId) => value.toHexString(),
    "Password": (value: string)        => value,
    "Image"   : (value: BSON.Binary)   => value.buffer,
    "JSON"    : (value: Json)          => value,

    "Boolean" : (value: boolean) => value,
    "Number"  : (value: number)  => value,
    "String"  : (value: string)  => value,
    "Date"    : (value: Date)    => value
  };

  
  URI = invariant(process.env.DATABASE_URL, "Please add `DATABASE_URL=url` to your environment file or make sure the environment file is properly loaded.");
  DATABASE = singleton("Glase_MongoClient", () => new MongoClient(this.URI));

  constructor()
  {
    super();
  }
}

export const MongoDB = () => new MongoDbDriver();