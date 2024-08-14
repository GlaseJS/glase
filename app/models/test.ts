
import { T, Model } from "glase";

export const TestModel = Model("test", {
  string:     { type: T.String },
  number:     { type: T.Number },
  objectid:   { type: T.ObjectId },
  boolean:    { type: T.Boolean },
  date:       { type: T.Date },
  json:       { type: T.Json },
  password:   { type: T.Password }
});