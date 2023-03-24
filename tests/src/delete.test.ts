
import { expect } from "chai"
import { Kysely } from "kysely"
import { PartiQLDialect } from "../../src/index"
import { createMovieTable, createTestContainer, Database } from "./helpers"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

describe("Deletes", () => {
  let containerUrl: string;
  let db: Kysely<Database>
  before(async () => {
    const { containerUrl: url  } = await createTestContainer()
    containerUrl = url
    db = new Kysely<Database>({
      dialect: new PartiQLDialect({
        endpoint: containerUrl
      }),
    })
    const client = new DynamoDBClient({
      endpoint: containerUrl
    })
    await createMovieTable(client)
    // TODO fix multi-row-insert
    await db.insertInto("movies").values({
      name: "The Big Lebowski",
      stars: 5
    }).execute()
    await db.insertInto("movies").values({
      name: "The Bullet Train",
      stars: 3
    }).execute()
  })

  it("Basic delete", async () => {
    const query = db.deleteFrom("movies").where("name", "=", "The Bullet Train")

    expect(query.compile().sql).to.eq(`delete from "movies" where "name" = ?`)

    await query.execute()
    
    const updatedResult = await db.selectFrom("movies").selectAll().where("name", "=", "The Bullet Train").executeTakeFirst()
    expect(updatedResult).to.eq(undefined)
  })
 
})