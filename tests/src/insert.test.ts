import { expect } from "chai"
import { InsertResult } from "kysely"
import { createMovieTable, createTestContainer, Database } from "./helpers"
import { DBClient } from "./types"

describe("Inserts", async () => {
  let dbClient: DBClient;
  before(async () => {
    const { db, dynamoDbClient  } = await createTestContainer()
    dbClient = db;
    await createMovieTable(dynamoDbClient)
  
  })
  it("Simple insert", async () => {
    const params = {
      name: "The Big Lebowski",
      stars: 5
    }
    const query = dbClient.insertInto("movies").values(params)
    const compiled = query.compile()
    expect(compiled.sql).to.eq(`insert into "movies" value {'name':?, 'stars':?}`)
    expect(compiled.parameters).to.eql(["The Big Lebowski", 5])

    const insertResult = await query.executeTakeFirst()
    expect(insertResult).to.be.instanceOf(InsertResult)
    
    const insertedRow = await dbClient.selectFrom("movies").selectAll().executeTakeFirst()
    expect(insertedRow).to.eql(params)
  })
})
