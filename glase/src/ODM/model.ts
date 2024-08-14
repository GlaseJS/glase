import { BaseSchema, baseSchema, DefaultSchema, FlatSchema, RequiredSchema, Schema }   from "./schema";
import { Database } from "./database";
import { BSON, Collection, Filter, OptionalUnlessRequiredId, WithId } from "mongodb";
import { T } from "./types";

export class ODMModel <Type extends Schema> {
  collection: Collection<FlatSchema<Type & BaseSchema>>;
  schema: Type & BaseSchema;

  constructor(public name: string, schema: Type)
  {
    this.schema = { ...baseSchema, ...schema };

    this.collection = Database.collection<FlatSchema<Type & BaseSchema>>(name);
  }

  /**
   * Returns a base document with default values.
   */
  getDefaults(): DefaultSchema<Type & BaseSchema>
  {
    const def = {} as any;

    for (const key in this.schema)
    {
      
      if (typeof this.schema[key].default == "function") def[key] = this.schema[key].default();
      else                                               def[key] = this.schema[key].default;
    }

    return def;
  }

  parseDbToGlase(doc: FlatSchema<Type & BaseSchema> | null): FlatSchema<Type & BaseSchema> | null
  {
    if (doc == null) return null;
    const out = { ...doc } as FlatSchema<Type & BaseSchema>;

    for (const key in this.schema)
    {
      const schemaKey = key as keyof typeof doc;
      switch (this.schema[key].type)
      {
        case T.ObjectId: break;
      }
    }

    return out;
  }

  parseGlaseToDb(doc: FlatSchema<Type & BaseSchema> | null): FlatSchema<Type & BaseSchema> | null
  {
    if (doc == null) return null;
    const out = { ...doc } as FlatSchema<Type & BaseSchema>;

    for (const key in this.schema)
    {
      const schemaKey = key as keyof typeof doc;
      switch (this.schema[key].type)
      {
        case T.ObjectId: if (typeof out[schemaKey] == "string") out[schemaKey] = new BSON.ObjectId(out[schemaKey]) as any;
      }
    }

    return out;
  }

  /**
   * Fetch one document from database.
   */
  async find(query: Filter<FlatSchema<Type & BaseSchema>>)
  {
    const doc = await this.collection.findOne(query);

    return this.parseDbToGlase(doc as any);
  }

  /**
   * Fetch multiple documents from database.
   */
  async findMany(query: Filter<FlatSchema<Type & BaseSchema>>)
  {
    const cursor = this.collection.find(query);
    const docs = [] as (FlatSchema<Type & BaseSchema> | null)[];

    for await (const doc of cursor) docs.push(this.parseDbToGlase(doc as any));

    return docs;
  }

  /**
   * Search for multiple documents from database but return the search cursor instead of resolving right away.
   * Better suited for big searches. Resulting documents are untreated.
   */
  async searchMany(query: Filter<FlatSchema<Type & BaseSchema>>)
  {
    return this.collection.find(query);
  }



  /**
   * Create one document
   */
  async create(document: FlatSchema<Type>)
  {
    const doc = this.parseGlaseToDb({...this.getDefaults(), ...document} as any);
    await this.collection.insertOne(doc as any);

    return this.parseDbToGlase(doc as any);
  }


}

export function Model<Type extends Schema>(name: string, schema: Type)
{
  return new ODMModel(name, schema);
}