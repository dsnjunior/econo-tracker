import { createId as createIdBase } from "@paralleldrive/cuid2";

export const idContext = {
	user: "usr",
	session: "ses",
	earning: "ern",
	earningCategory: "ern_cat",
	fixedEarning: "fern",
	fixedEarningRegister: "fernr",
	expense: "exp",
	expenseCategory: "exp_cat",
	fixedExpense: "fexp",
	fixedExpenseRegister: "fexpr",
} as const;

export function createId(context: keyof typeof idContext) {
	return `${idContext[context]}_${createIdBase()}`;
}
