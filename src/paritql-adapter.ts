import { DialectAdapterBase, Kysely } from "kysely";

export class PartiQLAdapter extends DialectAdapterBase {
  acquireMigrationLock(db: Kysely<any>): Promise<void> {
    throw new Error("No migrations in this db");
  }
  releaseMigrationLock(db: Kysely<any>): Promise<void> {
    throw new Error("No migrations in this db");
  }
}