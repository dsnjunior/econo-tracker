import { eq } from "drizzle-orm";

import { db, schema } from "@/lib/db";
import { languages } from "@/lib/i18n/ui";
import { createId } from "@/lib/id";

async function createEarningCategoriesIfNotExist(
	lang: keyof typeof languages,
	userId: string,
) {
	const hasEarningsCategories = await db.query.earningCategory.findFirst({
		where: eq(schema.earningCategory.userId, userId),
		columns: { id: true },
	});

	if (!hasEarningsCategories) {
		await db.insert(schema.earningCategory).values([
			{
				id: createId("earningCategory"),
				name: lang === "pt-br" ? "Salário" : "Salary",
				userId,
				color: "#16a34a",
			},
			{
				id: createId("earningCategory"),
				name: lang === "pt-br" ? "Freela" : "Freelance",
				userId,
				color: "#2563eb",
			},
			{
				id: createId("earningCategory"),
				name: lang === "pt-br" ? "Venda" : "Sale",
				userId,
				color: "#7c3aed",
			},
			{
				id: createId("earningCategory"),
				name: lang === "pt-br" ? "Bônus" : "Bonus",
				userId,
				color: "#db2777",
			},
			{
				id: createId("earningCategory"),
				name: lang === "pt-br" ? "Outros" : "Other",
				userId,
				color: "#ea580c",
			},
		]);
	}
}

async function createExpensesCategoriesIfNotExist(
	lang: keyof typeof languages,
	userId: string,
) {
	const hasExpensesCategories = await db.query.expenseCategory.findFirst({
		where: eq(schema.expenseCategory.userId, userId),
		columns: { id: true },
	});

	if (!hasExpensesCategories) {
		await db.insert(schema.expenseCategory).values([
			{
				id: createId("expenseCategory"),
				name: lang === "pt-br" ? "Casa" : "Home",
				userId,
				color: "#fb923c",
			},
			{
				id: createId("expenseCategory"),
				name: lang === "pt-br" ? "Farmácia e Saúde" : "Medicine and Health",
				userId,
				color: "#38bdf8",
			},
			{
				id: createId("expenseCategory"),
				name: lang === "pt-br" ? "Mercado" : "Groceries",
				userId,
				color: "#4ade80",
			},
			{
				id: createId("expenseCategory"),
				name: lang === "pt-br" ? "Assinatura" : "Subscription",
				userId,
				color: "#ef4444",
			},
			{
				id: createId("expenseCategory"),
				name: lang === "pt-br" ? "Trabalho" : "Work-related",
				userId,
				color: "#a855f7",
			},
			{
				id: createId("expenseCategory"),
				name: lang === "pt-br" ? "Transporte" : "Transport",
				userId,
				color: "#84cc16",
			},
			{
				id: createId("expenseCategory"),
				name: lang === "pt-br" ? "Outros" : "Other",
				userId,
				color: "#ea580c",
			},
		]);
	}
}

export async function createCategoriesIfNotExist(
	lang: keyof typeof languages,
	userId: string,
) {
	await Promise.all([
		createEarningCategoriesIfNotExist(lang, userId),
		createExpensesCategoriesIfNotExist(lang, userId),
	]);
}
