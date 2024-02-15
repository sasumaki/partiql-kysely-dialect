
import { expect } from "chai"
import { createMovieTable, createTestContainer } from "./helpers"
import { DBClient } from "./types"

describe("Selects", () => {
  let dbClient: DBClient
  before(async () => {
    const { db, dynamoDbClient  } = await createTestContainer()
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

  it("Select all", async () => {
    const query = dbClient.selectFrom("movies").selectAll()
    
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
    const query = dbClient.selectFrom("movies").select("stars").where("name", "=", "The Bullet Train")
    const compiled = query.compile()
    expect(compiled.sql).to.eq(`select "stars" from "movies" where "name" = ?`)
    expect(compiled.parameters).to.eql(["The Bullet Train"])
    
    const result = await query.executeTakeFirst()
    expect(result).to.eql({
      stars: 3
    })
  })
})