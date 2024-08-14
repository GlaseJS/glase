import { MongoClient } from "mongodb";
import { invariant } from "../libs/invariant";
import { singleton } from "../libs/singleton";

const uri    = invariant(process.env.DATABASE_URL, "Please set DATABASE_URL in your environment file.");
const client = singleton("MongoClient", () => new MongoClient(uri));

export const Database = client.db();
export const ping = () => Database.command({ ping: 1 });