
import { expect } from "chai"
import { Kysely } from "kysely"
import { PartiQLDialect } from "../../src/index"
import { createMovieTable, createTestContainer, Database } from "./helpers"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

describe("Selects", () => {
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

  it("Select all", async () => {
    const query = db.selectFrom("movies").selectAll()
    
    expect(query.compile().sql).to.eq(`select * from "movies"`)

    const result = await query.execute()
    expect(result).to.eql([{
      name: "The Big Lebowski",
      stars: 5
    },{
      name: "The Bullet Train",
      stars: 3
    }])
  })
  it("Select column where condition", async () => {
    const query = db.selectFrom("movies").select("stars").where("name", "=", "The Bullet Train")
    const compiled = query.compile()
    expect(compiled.sql).to.eq(`select "stars" from "movies" where "name" = ?`)
    expect(compiled.parameters).to.eql(["The Bullet Train"])
    
    const result = await query.executeTakeFirst()
    expect(result).to.eql({
      stars: 3
    })
  })
})