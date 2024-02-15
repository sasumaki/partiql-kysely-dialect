
import { expect } from "chai"
import { createMovieTable, createTestContainer } from "./helpers"
import { DBClient } from "./types"

describe("Deletes", () => {
  let dbClient: DBClient
  before(async () => {
    const { db, dynamoDbClient } = await createTestContainer()
    dbClient = db;
    await createMovieTable(dynamoDbClient)
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
    const query = dbClient.deleteFrom("movies").where("name", "=", "The Bullet Train")

    expect(query.compile().sql).to.eq(`delete from "movies" where "name" = ?`)

    await query.execute()
    
    const updatedResult = await dbClient.selectFrom("movies").selectAll().where("name", "=", "The Bullet Train").executeTakeFirst()
    expect(updatedResult).to.eq(undefined)
  })
 
})