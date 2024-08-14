import { BSON } from "bson";
import { XOR } from "../libs/XOR";
import { T, TypeMap } from "./types";

type Property<Type> = {
  type: Type,
  default?: TypeMap<Type> | (() => TypeMap<Type>),
  required?: boolean,
  unique?: boolean,
  index?: boolean
}

type ValidProperty = XOR<
  Property<T["Password"]>, Property<T["ObjectId"]>,
  Property<T["String"]>,   Property<T["Date"]>,
  Property<T["Number"]>,   Property<T["Boolean"]>,
  Property<T["Json"]>
>;

export type Schema = {
  [P: string]: ValidProperty
}



export type FlatSchema<S extends Schema> = RequiredSchema<S> & OptionalSchema<S>;

export type RequiredSchema<S extends Schema> = {
  [P in keyof S as
    S[P] extends { required: true } ? P : 
    S[P] extends { default?: any } ? never : P
  ]: TypeMap<S[P]["type"]>;
};

export type OptionalSchema<S extends Schema> = {
  [P in keyof S as
    S[P] extends { required: true } ? never : 
    S[P] extends { default?: any } ? P : never
  ]?: TypeMap<S[P]["type"]>;
}

export type DefaultSchema<S extends Schema> = {
  [P in keyof S as S[P] extends { default: (() => any) } ? P : never]: TypeMap<S[P]["type"]>;
} & {
  [P in keyof S as S[P] extends { default: TypeMap<S[P]["type"]> } ? P : never]: TypeMap<S[P]["type"]>;
}



export const baseSchema = {
  _id: { type: T.ObjectId, unique: true, default: () => new BSON.ObjectId() },

  createdAt: { type: T.Date, default: () => new Date() },
  updatedAt: { type: T.Date, default: () => new Date() },
}
export type BaseSchema = typeof baseSchema;