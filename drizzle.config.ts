import type { Config } from "drizzle-kit";
import "dotenv/config";

export default ({
	schema: "./src/lib/db/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		connectionString: process.env.DATABASE_CONNECTION_STRING!,
	},
} satisfies Config);
