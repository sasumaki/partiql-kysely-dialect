import { CompiledQuery, DatabaseConnection, QueryResult } from "kysely"
import { DynamoDBClient, ExecuteStatementCommand, AttributeValue } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall }  from "@aws-sdk/util-dynamodb";
import {toPairs} from "remeda"
export class DynamoConnection implements DatabaseConnection {
  #config: any;
  #client: DynamoDBClient;

  constructor(config: any){
    this.#config = config
    this.#client = new DynamoDBClient(this.#config)
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const marshalledParams = marshall(compiledQuery.parameters)
    const command = new ExecuteStatementCommand({
      Statement: compiledQuery.sql,
      Parameters: marshalledParams as unknown as AttributeValue[] // marshall is typed wrong..
    })
    const executeResult = await this.#client.send(command)
    const unMarshalled = executeResult.Items?.map(item => {
      return unmarshall(item)
    }) ?? []
    return {
      rows: unMarshalled as unknown as R[] // TODO: how to type?
    }
  }
  streamQuery<R>(compiledQuery: CompiledQuery<unknown>, chunkSize?: number | undefined): AsyncIterableIterator<QueryResult<R>> {
    throw new Error("Method not implemented.");
  }

}