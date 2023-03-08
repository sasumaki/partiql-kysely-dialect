
import { expect, } from "chai"
import { GenericContainer } from "testcontainers"
import { Kysely, Generated } from "kysely"
import { PartiQLDialect } from "../../src/index"

describe("shittistä", () => {
  interface PetTable {
    id: Generated<number>
    name: string
    owner_id: number
    species: 'dog' | 'cat'
  }
  
  interface MovieTable {
    id: Generated<string>
    name: string,
    stars: number
  }
  
  // Keys of this interface are table names.
  interface Database {
    pet: PetTable
    movie: MovieTable
  }

  const dynamodbPort = 8000
  let container
  let containerUrl: string

  before(async () => {
    container = await new GenericContainer("amazon/dynamodb-local")
      .withExposedPorts(dynamodbPort)
      .start();
    const logs = await container.logs();
    logs.on("err", (line) => console.error("[Container error]:", line));

    containerUrl = `http://${container.getHost()}:${container.getMappedPort(
      dynamodbPort
    )}`;
  })
  it("Creates Kysely with dialect", async () => {
    const db = new Kysely<Database>({
      dialect: new PartiQLDialect({
        endpoint: containerUrl
      }),
    })
    expect(db).to.be.an.instanceOf(Kysely)
  })
  it("Compiles query", async () => {
    const db = new Kysely<Database>({
      dialect: new PartiQLDialect({
        endpoint: containerUrl
      }),
    })
    const compiled = db.insertInto("movie").values({
      name: "The Big Lebowski",
      stars: 5
    }).compile()
    
    expect(compiled.sql).to.eq(`INSERT INTO "movie" value {'name':?, 'stars':?}`)
  })
})