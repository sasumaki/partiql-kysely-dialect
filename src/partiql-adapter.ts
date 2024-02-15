import { DialectAdapterBase, Kysely } from "kysely";

export class PartiQLAdapter extends DialectAdapterBase {
  override acquireMigrationLock(_db: Kysely<unknown>): Promise<void> {
    throw new Error("No migrations in this db");
  }
  override releaseMigrationLock(_db: Kysely<unknown>): Promise<void> {
    throw new Error("No migrations in this db");
  }
}