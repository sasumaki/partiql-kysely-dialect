# Partiql-Kysely-Dialect

### Project maturity level: **meme**

Run kysely against dynamodb with partiql dialect. Supports basic CRUD statements, see documentation [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.statements.html).

```ts
import { Kysely } from "kysely";
import { PartiQLDialect } from "partiql-kysely-dialect"; // not actually published (yet) :)

export interface MovieTable {
  id: Generated<string>;
  name: string;
  stars: number;
}

// Keys of this interface are table names.
export interface Database {
  movies: MovieTable;
}

const db = new Kysely<Database>({
  dialect: new PartiQLDialect({
    region: "eu-north-1",
  }),
});

const query = db.insertInto("movies").values({
  name: "The Big Lebowski",
  stars: 5,
});

const query = await db
  .selectFrom("movies")
  .select("stars")
  .where("name", "=", "The Big Lebowski")
  .executeTakeFirst();

// { stars: 5 }
```
