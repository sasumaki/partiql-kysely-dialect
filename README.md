# Partiql-Kysely-Dialect

### Project maturity level: **Limited** does not implement partiql completely, most likely has bugs.

Run [kysely](https://github.com/koskimas/kysely) against dynamodb with partiql dialect. Supports basic CRUD statements, see documentation [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.statements.html).

```ts
import { Kysely } from "kysely";
import { PartiQLDialect } from "partiql-kysely-dialect";

interface MovieTable {
  name: string;
  stars: number;
}

// Keys of this interface are table names.
interface Database {
  movies: MovieTable;
}

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB({})); // Create a DynamoDb client like normal
const db = new Kysely<Database>({
  dialect: new PartiQLDialect({
    endpoint: dynamoDbClient.config.endpoint,
    region: dynamoDbClient.config.region,
    credentials: dynamoDbClient.config.credentials
  }),
});

await db.insertInto("movies").values({
  name: "The Big Lebowski",
  stars: 5,
}).execute();

const result = await db
  .selectFrom("movies")
  .select("stars")
  .where("name", "=", "The Big Lebowski")
  .executeTakeFirst();

// typeof result = { stars: number}
// result == { stars: 5 }
```
