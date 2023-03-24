# Partiql-Kysely-Dialect

### Project maturity level: **meme**

Run [kysely](https://github.com/koskimas/kysely) against dynamodb with partiql dialect. Supports basic CRUD statements, see documentation [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.statements.html).

```ts
import { Kysely } from "kysely";
import { PartiQLDialect } from "partiql-kysely-dialect"; // not actually published (yet) :)

interface MovieTable {
  name: string;
  stars: number;
}

// Keys of this interface are table names.
interface Database {
  movies: MovieTable;
}

const db = new Kysely<Database>({
  dialect: new PartiQLDialect({
    region: "eu-north-1",
  }),
});

await db.insertInto("movies").values({
  name: "The Big Lebowski",
  stars: 5,
});

const query = await db
  .selectFrom("movies")
  .select("stars")
  .where("name", "=", "The Big Lebowski")
  .executeTakeFirst();

// query == { stars: 5 }
```
