import { db, schema } from "@/lib/db";
import { and, eq, or } from "drizzle-orm";

async function deleteEmptyExpenses(userId: string) {
	await db
		.delete(schema.expense)
		.where(
			and(
				eq(schema.expense.userId, userId),
				or(eq(schema.expense.amount, 0), eq(schema.expense.timeZone, "")),
			),
		);
}

async function deleteEmptyFixedExpenses(userId: string) {
	await db
		.delete(schema.fixedExpense)
		.where(
			and(
				eq(schema.fixedExpense.userId, userId),
				or(
					eq(schema.fixedExpense.amount, 0),
					eq(schema.fixedExpense.timeZone, ""),
				),
			),
		);
}

export async function deleteAllEmptyExpenses(userId: string) {
	await Promise.all([
		deleteEmptyExpenses(userId),
		deleteEmptyFixedExpenses(userId),
	]);
}

async function deleteEmptyEarnings(userId: string) {
	await db
		.delete(schema.earning)
		.where(
			and(
				eq(schema.earning.userId, userId),
				or(eq(schema.earning.amount, 0), eq(schema.earning.timeZone, "")),
			),
		);
}

async function deleteEmptyFixedEarnings(userId: string) {
	await db
		.delete(schema.fixedEarning)
		.where(
			and(
				eq(schema.fixedEarning.userId, userId),
				or(
					eq(schema.fixedEarning.amount, 0),
					eq(schema.fixedEarning.timeZone, ""),
				),
			),
		);
}

export async function deleteAllEmptyEarnings(userId: string) {
	await Promise.all([
		deleteEmptyEarnings(userId),
		deleteEmptyFixedEarnings(userId),
	]);
}

export async function deleteEmptyData(userId: string) {
	await Promise.all([
		deleteAllEmptyExpenses(userId),
		deleteAllEmptyEarnings(userId),
	]);
}
