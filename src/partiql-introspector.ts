import { DatabaseIntrospector, DatabaseMetadata, DatabaseMetadataOptions, SchemaMetadata, TableMetadata } from "kysely";

export class PartiQLIntrospector implements DatabaseIntrospector{
  getSchemas(): Promise<SchemaMetadata[]> {
    throw new Error("Method not implemented.");
  }
  getTables(options?: DatabaseMetadataOptions | undefined): Promise<TableMetadata[]> {
    throw new Error("Method not implemented.");
  }
  getMetadata(options?: DatabaseMetadataOptions | undefined): Promise<DatabaseMetadata> {
    throw new Error("Method not implemented.");
  }
  
}