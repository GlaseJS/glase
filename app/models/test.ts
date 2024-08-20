
import Glase from "../root";

export const TestModel = Glase.Model("test", {
  string:     { type: "String" },
  number:     { type: "Number" },
  objectid:   { type: "ObjectId" },
  boolean:    { type: "Boolean" },
  date:       { type: "Date" },
  json:       { type: "JSON" },
  password:   { type: "Password" }
});