import { relations } from "drizzle-orm";
import {
	bigint,
	date,
	integer,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core";

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
	idleExpires: bigint("idle_expires", { mode: "bigint" }).notNull(),
});

export const userKey = pgTable("user_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: text("hashed_password"),
});

export const earningCategory = pgTable("earning_category", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	name: text("name").notNull(),
	color: text("color").notNull(),
});

export type EarningCategory = typeof earningCategory.$inferSelect;

export const earning = pgTable("earning", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	amount: integer("amount").notNull(),
	categoryId: text("category_id").references(() => earningCategory.id),
	description: text("description").notNull(),
	date: date("date").notNull(),
	timeZone: varchar("time_zone").notNull(),
});

export type Earning = typeof earning.$inferSelect;

export const earningRelations = relations(earning, ({ one }) => ({
	category: one(earningCategory, {
		fields: [earning.categoryId],
		references: [earningCategory.id],
	}),
}));

export const fixedEarning = pgTable("fixed_earning", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	amount: integer("amount").notNull(),
	categoryId: text("category_id").references(() => earningCategory.id),
	description: text("description").notNull(),
	dueDay: integer("due_day").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date"),
	timeZone: varchar("time_zone").notNull(),
});

export type FixedEarning = typeof fixedEarning.$inferSelect;

export const fixedEarningRegister = pgTable("fixed_earning_register", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	fixedEarningId: text("fixed_earning_id")
		.notNull()
		.references(() => fixedEarning.id),
	amount: integer("amount").notNull(),
	dueDate: date("due_date").notNull(),
	timeZone: varchar("time_zone").notNull(),
	status: varchar("status", { enum: ["pending", "paid"] })
		.notNull()
		.default("pending"),
});

export type FixedEarningRegister = typeof fixedEarningRegister.$inferSelect;

export const fixedEarningRegisterRelations = relations(
	fixedEarningRegister,
	({ one }) => ({
		fixedEarning: one(fixedEarning, {
			fields: [fixedEarningRegister.fixedEarningId],
			references: [fixedEarning.id],
		}),
	}),
);

export const fixedEarningRelations = relations(
	fixedEarning,
	({ one, many }) => ({
		category: one(earningCategory, {
			fields: [fixedEarning.categoryId],
			references: [earningCategory.id],
		}),
		registers: many(fixedEarningRegister),
	}),
);

export const expenseCategory = pgTable("expense_category", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	name: text("name").notNull(),
	color: text("color").notNull(),
});

export type ExpenseCategory = typeof expenseCategory.$inferSelect;

export const expense = pgTable("expense", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	amount: integer("amount").notNull(),
	categoryId: text("category_id").references(() => expenseCategory.id),
	description: text("description").notNull(),
	date: date("date").notNull(),
	timeZone: varchar("time_zone").notNull(),
});

export type Expense = typeof expense.$inferSelect;

export const expenseRelations = relations(expense, ({ one }) => ({
	category: one(expenseCategory, {
		fields: [expense.categoryId],
		references: [expenseCategory.id],
	}),
}));

export const fixedExpense = pgTable("fixed_expense", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	amount: integer("amount").notNull(),
	categoryId: text("category_id").references(() => expenseCategory.id),
	description: text("description").notNull(),
	dueDay: integer("due_day").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date"),
	timeZone: varchar("time_zone").notNull(),
});

export type FixedExpense = typeof fixedExpense.$inferSelect;

export const fixedExpenseRegister = pgTable("fixed_expense_register", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	fixedExpenseId: text("fixed_expense_id")
		.notNull()
		.references(() => fixedExpense.id),
	amount: integer("amount").notNull(),
	dueDate: date("due_date").notNull(),
	timeZone: varchar("time_zone").notNull(),
	status: varchar("status", { enum: ["pending", "paid"] })
		.notNull()
		.default("pending"),
});

export type FixedExpenseRegister = typeof fixedExpenseRegister.$inferSelect;

export const fixedExpenseRegisterRelations = relations(
	fixedExpenseRegister,
	({ one }) => ({
		fixedExpense: one(fixedExpense, {
			fields: [fixedExpenseRegister.fixedExpenseId],
			references: [fixedExpense.id],
		}),
	}),
);

export const fixedExpenseRelations = relations(
	fixedExpense,
	({ one, many }) => ({
		category: one(expenseCategory, {
			fields: [fixedExpense.categoryId],
			references: [expenseCategory.id],
		}),
		registers: many(fixedExpenseRegister),
	}),
);

export const creditCard = pgTable("credit_card", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	name: text("name").notNull(),
	color: text("color").notNull(),
	dueDay: integer("due_day").notNull(),
});

export type CreditCard = typeof creditCard.$inferSelect;

export const creditCardRelations = relations(creditCard, ({ many }) => ({
	limits: many(creditCardLimit),
	expenses: many(creditCardExpense),
}));

export type CreditCardWithLimits = CreditCard & {
	limits: CreditCardLimit[];
};

export type CreditCardComplete = CreditCard & {
	limits: CreditCardLimit[];
	expenses: CreditCardExpense[];
};

export const creditCardLimit = pgTable("credit_card_limit", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	creditCardId: text("credit_card_id")
		.notNull()
		.references(() => creditCard.id),
	limit: integer("limit").notNull(),
	date: date("date").notNull(),
	timeZone: varchar("time_zone").notNull(),
});

export type CreditCardLimit = typeof creditCardLimit.$inferSelect;

export const creditCardLimitRelations = relations(
	creditCardLimit,
	({ one }) => ({
		creditCard: one(creditCard, {
			fields: [creditCardLimit.creditCardId],
			references: [creditCard.id],
		}),
	}),
);

export const creditCardExpense = pgTable("credit_card_expense", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	creditCardId: text("credit_card_id")
		.notNull()
		.references(() => creditCard.id),
	amount: integer("amount").notNull(),
	description: text("description").notNull(),
	date: date("date").notNull(),
	timeZone: varchar("time_zone").notNull(),
});

export type CreditCardExpense = typeof creditCardExpense.$inferSelect;

export const creditCardExpenseRelations = relations(
	creditCardExpense,
	({ one }) => ({
		creditCard: one(creditCard, {
			fields: [creditCardExpense.creditCardId],
			references: [creditCard.id],
		}),
	}),
);
