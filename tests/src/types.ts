import { createTestContainer } from "./helpers";

export type DBClient = Awaited<ReturnType<typeof createTestContainer>>["db"];
