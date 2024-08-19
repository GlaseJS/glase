
import { DB } from "../database.server";

export const TestModel = DB.Model("test", {
  string:     { type: "String" },
  number:     { type: "Number" },
  objectid:   { type: "ObjectId" },
  boolean:    { type: "Boolean" },
  date:       { type: "Date" },
  json:       { type: "JSON" },
  password:   { type: "Password" }
});