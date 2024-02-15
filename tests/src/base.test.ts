import { expect } from "chai"
import { Kysely } from "kysely"
import { createTestContainer } from "./helpers"
import { DBClient } from "./types";
describe("Configs", async () => {
  let dbClient: DBClient;
  before(async () => {
    const { db  } = await createTestContainer()
    dbClient = db;
  })
  it("Creates Kysely with dialect", async () => {
    expect(dbClient).to.be.an.instanceOf(Kysely)
  })
})