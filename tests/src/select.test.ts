
import { expect } from "chai"
import { Kysely } from "kysely"
import { PartiQLDialect } from "../../src/index"
import { createTestContainer, Database } from "./helpers"

describe("selects", () => {


  let containerUrl: string;
  before(async () => {
    const { containerUrl: url  } = await createTestContainer()
    containerUrl = url
  })

  it("Compiles simple select all", async () => {
    const db = new Kysely<Database>({
      dialect: new PartiQLDialect({
        endpoint: containerUrl
      }),
    })
    const compiled = db.selectFrom("movies").selectAll().compile()
    
    expect(compiled.sql).to.eq(`select * from "movies"`)
  })
  it("Compiles complexer select where", async () => {
    const db = new Kysely<Database>({
      dialect: new PartiQLDialect({
        endpoint: containerUrl
      }),
    })
    const compiled = db.selectFrom("movies").select("name").where("name", "=", "The Bullet Train").compile()
    
    expect(compiled.sql).to.eq(`select "name" from "movies" where "name" = ?`)
    expect(compiled.parameters).to.eql(["The Bullet Train"])
    
  })
})