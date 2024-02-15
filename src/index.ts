import { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from "kysely"
import { PartiQLAdapter } from "./partiql-adapter";
import { PartiQLDriver } from "./partiql-driver";
import { PartiQLIntrospector } from "./partiql-introspector";
import { PartiQLQueryCompiler } from "./partiql-query-compiler";
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
export interface PartiQLConfig extends DynamoDBClientConfig {
}
export class PartiQLDialect implements Dialect {
  #config: PartiQLConfig;
  constructor(config: PartiQLConfig) {
    this.#config = config
  }
  createDriver(): Driver {
    return new PartiQLDriver(this.#config);
  }
  createQueryCompiler(): QueryCompiler {
    return new PartiQLQueryCompiler()
  }
  createAdapter(): DialectAdapter {
    return new PartiQLAdapter()
  }
  createIntrospector(_db: Kysely<any>): DatabaseIntrospector {
    return new PartiQLIntrospector
  }
  
}
