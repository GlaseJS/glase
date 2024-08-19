//
//
//

export type Json = boolean | number | string | null | Json[] | { [x: string]: Json };



//
//
//

export const T = {
  ObjectId: class ObjectId { static __type = "ObjectId" as const },
  Password: class Password { static __type = "Password" as const },
  Image:    class Image    { static __type = "Image"    as const },
  JSON:     class Json     { static __type = "JSON"     as const },
  
  Boolean:  class Boolean  { static __type = "Boolean"  as const },
  Number:   class Number   {static  __type = "Number"   as const },
  String:   class String   { static __type = "String"   as const },
  Date:     class Date     { static __type = "Date"     as const },
}
export type T = typeof T;

export type NativeTypeMap = {
  ObjectId: string,
  Password: string,
  Image:    Uint8Array,
  JSON:     Json,
  
  Boolean:  boolean,
  Number:   number,
  String:   string,
  Date:     Date,
}

export type XORMap<S extends { [x in keyof T]: unknown }> = 
  { type: "ObjectId", value: S["ObjectId"] } |
  { type: "Password", value: S["Password"] } |
  { type: "Image",    value: S["Image"] }    |
  { type: "JSON",     value: S["JSON"] }     |

  { type: "Boolean",  value: S["Boolean"] }  |
  { type: "Number",   value: S["Number"] }   |
  { type: "String",   value: S["String"] }   |
  { type: "Date",     value: S["Date"] }     ;



//
//
//

export type SchemaProperty<Type extends keyof T> = {
  type: Type,
  default?: NativeTypeMap[Type],
  unique?: boolean
}
export type SchemaPropertyArray<Type extends keyof T> = {
  type: `${Type}[]`,
  default?: NativeTypeMap[Type][]
}

export type Schema = {
  [property: string]: 
    SchemaProperty<"ObjectId"> | SchemaPropertyArray<"ObjectId"> |
    SchemaProperty<"Password"> | SchemaPropertyArray<"Password"> |
    SchemaProperty<"Image">    | SchemaPropertyArray<"Image">    |
    SchemaProperty<"JSON">     | SchemaPropertyArray<"JSON">     |

    SchemaProperty<"Boolean">  | SchemaPropertyArray<"Boolean">  |
    SchemaProperty<"Number">   | SchemaPropertyArray<"Number">   |
    SchemaProperty<"String">   | SchemaPropertyArray<"String">   |
    SchemaProperty<"Date">     | SchemaPropertyArray<"Date">
}
  

export type Query<S extends Schema> = {
  [prop in keyof S]?: 
    S[prop] extends SchemaProperty<infer X> ?      { equals: NativeTypeMap[X] }   | { oneOf: NativeTypeMap[X][] }         :
    S[prop] extends SchemaPropertyArray<infer X> ? { contains: NativeTypeMap[X] } | { containsOneOf: NativeTypeMap[X][] } :
    never
}