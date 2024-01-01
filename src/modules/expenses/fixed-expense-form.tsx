import { Check } from "lucide-react";
import { z } from "zod";
import { type FieldErrors, createForm } from "simple:form";

import { CurrencyInput, Form, Input, Saving, Select } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { ExpenseCategory, FixedExpense } from "@/lib/db/schema";
import { useClientTranslations } from "@/lib/i18n/utils";
import { sanitize } from "@/lib/utils";

export const fixedExpenseForm = createForm({
	amount: z.preprocess(
		(v) => Number(String(v).replace(/[^0-9]/g, "")),
		z.number().min(1).max(9999999),
	),
	description: z.string().transform(sanitize),
	categoryId: z.string().transform(sanitize),
	startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	endDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.optional(),
	dueDay: z.number().int().min(1).max(31),
	timeZone: z.string().transform(sanitize),
});

export function FixedExpenseForm({
	serverErrors,
	fixedExpense,
	categories,
}: {
	serverErrors?: FieldErrors<typeof fixedExpenseForm>;
	fixedExpense: FixedExpense;
	categories: ExpenseCategory[];
}) {
	const t = useClientTranslations();

	return (
		<Form
			className="flex flex-col gap-4 items-start"
			fieldErrors={serverErrors}
			validator={fixedExpenseForm.validator}
			name="fixedExpenseForm"
		>
			<Label className="block w-full">
				<span className="mb-1 block">{t("expenses.amount")}</span>
				<CurrencyInput
					{...fixedExpenseForm.inputProps.amount}
					defaultValue={fixedExpense.amount}
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("expenses.description")}</span>
				<Input
					{...fixedExpenseForm.inputProps.description}
					defaultValue={fixedExpense.description}
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("expenses.category")}</span>
				<Select
					{...fixedExpenseForm.inputProps.categoryId}
					options={categories}
					defaultValue={fixedExpense.categoryId ?? undefined}
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("expenses.startDate")}</span>
				<Input
					{...fixedExpenseForm.inputProps.startDate}
					defaultValue={new Date(fixedExpense.startDate)
						.toISOString()
						.replace("T00:00:00.000Z", "")}
					type="date"
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("expenses.dueDay")}</span>
				<Input
					{...fixedExpenseForm.inputProps.dueDay}
					defaultValue={fixedExpense.dueDay}
					type="number"
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("expenses.endDate")}</span>
				<Input
					{...fixedExpenseForm.inputProps.endDate}
					defaultValue={
						fixedExpense.endDate
							? new Date(fixedExpense.endDate)
									.toISOString()
									.replace("T00:00:00.000Z", "")
							: undefined
					}
					type="date"
				/>
			</Label>
			<Input
				{...fixedExpenseForm.inputProps.timeZone}
				type="hidden"
				defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
			/>
			<div className="flex items-center flex-col-reverse md:flex-row w-full">
				<Button className="w-full md:w-auto" type="submit">
					<Check className="w-4 h-4 mr-2" />
					{t("save")}
				</Button>
				<Saving className="mb-4 md:mb-0 md:ml-4" />
			</div>
		</Form>
	);
}
