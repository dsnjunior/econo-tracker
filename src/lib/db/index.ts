import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres'

import * as schema from "./schema";

export const client = postgres(import.meta.env.DATABASE_CONNECTION_STRING);

export const db = drizzle(client, { schema });

export { schema };
