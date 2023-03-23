import {
  type DatabaseConnection,
  type Driver,
  type TransactionSettings
} from "kysely";
import { type PartiQLConfig } from ".";
import { DynamoConnection } from "./dynamo-connection";

export class PartiQLDriver implements Driver {

  #config: PartiQLConfig;
  constructor(config: PartiQLConfig) {
    this.#config = config;
  }

  async init(): Promise<void> {
    // noop
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    return new DynamoConnection(this.#config);
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
