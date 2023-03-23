import { expect } from "chai"
import { Kysely } from "kysely"
import { PartiQLDialect } from "../../src"
import { createTestContainer, Database } from "./helpers"

describe("Configs", async () => {
  let containerUrl: string;
  before(async () => {
    const { containerUrl: url  } = await createTestContainer()
    containerUrl = url
  })
  it("Creates Kysely with dialect", async () => {
    const db = new Kysely<Database>({
      dialect: new PartiQLDialect({
        endpoint: containerUrl
      }),
    })
    expect(db).to.be.an.instanceOf(Kysely)
  })
})