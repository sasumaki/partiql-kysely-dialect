import { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from "kysely"
import { PartiQLAdapter } from "./paritql-adapter";
import { PartiQLDriver } from "./partiql-driver";
import { PartiQLIntrospector } from "./partiql-introspector";
import { PartiQLQueryCompiler } from "./partiql-query-compiler";

export interface PartiQLConfig {
  endpoint: string
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
  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new PartiQLIntrospector
  }
  
}
