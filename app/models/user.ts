
import { T, Model } from "glase";

const schema = {
  username: { type: T.String, unique: true },
  password: { type: T.Password }
};

export const UserModel = Model("user", schema);

type t = ReturnType<(typeof UserModel)["getDefaults"]>;