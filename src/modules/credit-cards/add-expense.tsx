import { CurrencyInput, Form, Input, Saving } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import type { CreditCard } from "@/lib/db/schema";
import { useClientTranslations } from "@/lib/i18n/utils";
import { sanitize } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
import { z } from "zod";
import { type FieldErrors, createForm } from "simple:form";

export const expenseForm = createForm({
	description: z.string().transform(sanitize),
	amount: z.preprocess(
		(v) => Number(String(v).replace(/[^0-9]/g, "")),
		z.number().min(1).max(9999999),
	),
	creditCardId: z.string().transform(sanitize),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	timeZone: z.string().transform(sanitize),
});

type CreditCardAddExpenseProps = {
	creditCard: CreditCard;
	serverErrors?: FieldErrors<typeof expenseForm>;
	open: boolean;
	onClose?: () => void;
};

export const CreditCardAddExpense: React.FC<CreditCardAddExpenseProps> = ({
	creditCard,
	serverErrors,
	open,
	onClose,
}) => {
	const t = useClientTranslations();

	return (
		<Modal title={t("creditCards.form.title")} open={open} onClose={onClose}>
			<div className="grid gap-4">
				<Form
					className="grid gap-4"
					fieldErrors={serverErrors}
					validator={expenseForm.validator}
					name="expenseForm"
				>
					<Label className="block w-full">
						<span className="mb-1 block">
							{t("creditCards.expenses.description")}
						</span>
						<Input {...expenseForm.inputProps.description} />
					</Label>

					<Label className="block w-full">
						<span className="mb-1 block">
							{t("creditCards.expenses.amount")}
						</span>
						<CurrencyInput {...expenseForm.inputProps.amount} />
					</Label>

					<Label className="block w-full">
						<span className="mb-1 block">{t("creditCards.expenses.date")}</span>
						<Input {...expenseForm.inputProps.date} type="date" />
					</Label>

					<Input
						{...expenseForm.inputProps.timeZone}
						type="hidden"
						defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
					/>

					<Input
						{...expenseForm.inputProps.creditCardId}
						type="hidden"
						defaultValue={creditCard.id}
					/>

					<div className="flex items-center flex-col-reverse w-full">
						<Button className="w-full" type="submit">
							<Check className="w-4 h-4 mr-2" />
							{t("save")}
						</Button>
						<Saving className="mb-4" />
					</div>
				</Form>
			</div>
		</Modal>
	);
};
