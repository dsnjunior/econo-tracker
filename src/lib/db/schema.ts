import { pgTable, text, bigint } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  google_sub: text("google_sub"),
  avatar_url: text("avatar_url"),
  display_name: text("display_name"),
});

export const userSession = pgTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", { mode: "bigint" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: 'bigint' }).notNull(),
});

export const userKey = pgTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});
