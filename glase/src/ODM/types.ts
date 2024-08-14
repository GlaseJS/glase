import { ObjectId } from "bson";

export const T = {
  Password: class Password { private __type: "Password" = "Password"; },
  ObjectId: class ObjectId { private __type: "ObjectId" = "ObjectId"; },
  String:   class String   { private __type: "String"   = "String"; },
  Number:   class Number   { private __type: "Number"   = "Number"; },
  Boolean:  class Boolean  { private __type: "Boolean"  = "Boolean"; },
  Date:     class Date     { private __type: "Date"     = "Date"; },
  Json:     class Json     { private __type: "Json"     = "Json"; }
}
export type T = typeof T;

type Constructor<T> = new () => T;

export type JsonValue = string | number | boolean | Date | JsonObject | JsonValue[];
export type JsonObject = {
  [x in string]: JsonValue;
}
export function isJson(value: any): value is JsonObject
{
  try
  {
    const stringified = JSON.stringify(value);
    const result      = JSON.parse(stringified);

    if (typeof result === "object") return true;
    return false;
  }
  catch
  {
    return false;
  }
}

export type TypeMap<Type> =
  Type extends T["Password"] ? string : 
  Type extends T["ObjectId"] ? ObjectId | string :
  Type extends T["String"]   ? string :
  Type extends T["Number"]   ? number :
  Type extends T["Boolean"]  ? boolean:
  Type extends T["Date"]     ? Date :
  Type extends T["Json"]     ? JsonObject :
  never;