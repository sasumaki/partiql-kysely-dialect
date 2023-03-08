import { CompiledQuery, DatabaseConnection, QueryResult } from "kysely"
export class DynamoConnection implements DatabaseConnection {
  #config: any;
  constructor(config: any){
    this.#config = config
  }
  executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    console.log(compiledQuery)
    return "lol" as any
  }
  streamQuery<R>(compiledQuery: CompiledQuery<unknown>, chunkSize?: number | undefined): AsyncIterableIterator<QueryResult<R>> {
    throw new Error("Method not implemented.");
  }

}