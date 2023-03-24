import { expect } from "chai"
import { InsertResult, Kysely } from "kysely"
import { PartiQLDialect } from "../../src"
import { createMovieTable, createTestContainer, Database } from "./helpers"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

describe("Inserts", async () => {
  let containerUrl: string;
  before(async () => {
    const { containerUrl: url  } = await createTestContainer()
    containerUrl = url

    const client = new DynamoDBClient({
      endpoint: containerUrl
    })
    await createMovieTable(client)
  
  })
  it("Simple insert", async () => {
    const db = new Kysely<Database>({
      dialect: new PartiQLDialect({
        endpoint: containerUrl,
      }),
    })
    
    const params = {
      name: "The Big Lebowski",
      stars: 5
    }
    const query = db.insertInto("movies").values(params)
    const compiled = query.compile()
    expect(compiled.sql).to.eq(`insert into "movies" value {'name':?, 'stars':?}`)
    expect(compiled.parameters).to.eql(["The Big Lebowski", 5])

    const insertResult = await query.executeTakeFirst()
    expect(insertResult).to.be.instanceOf(InsertResult)
    
    const insertedRow = await db.selectFrom("movies").selectAll().executeTakeFirst()
    expect(insertedRow).to.eql(params)
  })
})
