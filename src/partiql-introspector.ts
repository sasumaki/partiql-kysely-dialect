import { DatabaseIntrospector, DatabaseMetadata, DatabaseMetadataOptions, SchemaMetadata, TableMetadata } from "kysely";

export class PartiQLIntrospector implements DatabaseIntrospector{
  getSchemas(): Promise<SchemaMetadata[]> {
    throw new Error("Method not implemented.");
  }
  getTables(_options?: DatabaseMetadataOptions | undefined): Promise<TableMetadata[]> {
    throw new Error("Method not implemented.");
  }
  getMetadata(_options?: DatabaseMetadataOptions | undefined): Promise<DatabaseMetadata> {
    throw new Error("Method not implemented.");
  }
  
}