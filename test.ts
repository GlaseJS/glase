
import { BSON } from "bson";
import { TestModel } from "~/models/test";

(async () => {
  const testDoc = await TestModel.create({
    string:     "string",
    number:     1234,
    objectid:   new BSON.ObjectId(),
    boolean:    true,
    date:       new Date(),
    json:       { object: true },
    password:   "password",
  });

  console.log(testDoc);

  const foundDoc = await TestModel.find({
    _id: new BSON.ObjectId(testDoc?._id)
  });
  
  console.log(foundDoc);

  type t = ReturnType<(typeof TestModel)["getDefaults"]>;
})();