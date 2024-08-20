
import Glase from "../root";

export const UserModel = Glase.Model("user", {
  username: { type: "String", unique: true },
  password: { type: "Password" }
});