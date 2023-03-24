import {
  type DatabaseConnection,
  type Driver,
  type TransactionSettings
} from "kysely";
import { type PartiQLConfig } from ".";
import { DynamoConnection } from "./dynamo-connection";

export class PartiQLDriver implements Driver {

  #config: PartiQLConfig;
  #connection?: DynamoConnection
  constructor(config: PartiQLConfig) {
    this.#config = config;
    this.#connection = undefined
  }

  async init(): Promise<void> {
    this.#connection = new DynamoConnection(this.#config)
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    if (this.#connection) {
      return this.#connection
    }
    this.#connection = new DynamoConnection(this.#config)
    return this.#connection
  }

  async beginTransaction(
    connection: DatabaseConnection,
    settings: TransactionSettings
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async releaseConnection(connection: DatabaseConnection): Promise<void> {
    // noop
  }

  async destroy(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
