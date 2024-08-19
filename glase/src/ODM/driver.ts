import { T, NativeTypeMap, XORMap } from "./types";

export abstract class GlaseODMDriver<
  TypeMap extends { [type in keyof T]: unknown }
>{
  abstract transformMap:       { [type in keyof T]: (value: NativeTypeMap[type]) => TypeMap[type] }
  abstract invertTransformMap: { [type in keyof T]: (value: TypeMap[type]) => NativeTypeMap[type] }

  transform<S extends { [x in string]: XORMap<NativeTypeMap> }>(from: S): ({ [x in keyof S]: TypeMap[S[x]["type"]] })
  {
    const to = {} as { [x in keyof S]: TypeMap[S[x]["type"]] };

    for (const key in from)
    {
      to[key] = this.transformMap[from[key].type](from[key].value as never);
    }

    return to;
  }
  
  invertTransform<S extends { [x in string]: XORMap<TypeMap> }>(from: S): ({ [x in keyof S]: NativeTypeMap[S[x]["type"]] })
  {
    const to = {} as { [x in keyof S]: NativeTypeMap[S[x]["type"]] };

    for (const key in from)
    {
      to[key] = this.invertTransformMap[from[key].type](from[key].value) as never;
    }

    return to;
  }
}