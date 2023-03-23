import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { Generated } from "kysely";
import { GenericContainer } from "testcontainers";

export interface PetTable {
  id: Generated<number>
  name: string
  owner_id: number
  species: 'dog' | 'cat'
}

export interface MovieTable {
  id: Generated<string>
  name: string,
  stars: number
}

// Keys of this interface are table names.
export interface Database {
  pets: PetTable
  movies: MovieTable
}
const dynamodbPort = 8000
let container
let containerUrl: string
export const createTestContainer = async () => {
  container = await new GenericContainer("amazon/dynamodb-local")
  .withExposedPorts(dynamodbPort)
  .start();
const logs = await container.logs();
logs.on("err", (line) => console.error("[Container error]:", line));

containerUrl = `http://${container.getHost()}:${container.getMappedPort(
  dynamodbPort
)}`;
return { container, containerUrl }
}

const createMovieTabelCommandInput = {
  "TableName": "movies",
  "KeySchema": [
    {
      "AttributeName": "name",
      "KeyType": "HASH"
    },

    // {
    //   "AttributeName": "stars",
    //   "KeyType": "RANGE"
    // }

  ],
  "AttributeDefinitions": [
    {
      "AttributeName": "name",
      "AttributeType": "S"
    },
    // {
    //   "AttributeName": "stars",
    //   "AttributeType": "N"
    // },
  ],
  "ProvisionedThroughput": {
    "ReadCapacityUnits": 5,
    "WriteCapacityUnits": 5
  }
}

export const createMovieTable = async (client: DynamoDBClient) => {
  await client.send(new CreateTableCommand(createMovieTabelCommandInput))
}