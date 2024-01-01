import { Check } from "lucide-react";
import { z } from "zod";
import { type FieldErrors, createForm } from "simple:form";

import { CurrencyInput, Form, Input, Saving, Select } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { EarningCategory, FixedEarning } from "@/lib/db/schema";
import { useClientTranslations } from "@/lib/i18n/utils";
import { sanitize } from "@/lib/utils";

export const fixedEarningForm = createForm({
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

export function FixedEarningForm({
	serverErrors,
	fixedEarning,
	categories,
}: {
	serverErrors?: FieldErrors<typeof fixedEarningForm>;
	fixedEarning: FixedEarning;
	categories: EarningCategory[];
}) {
	const t = useClientTranslations();

	return (
		<Form
			className="flex flex-col gap-4 items-start"
			fieldErrors={serverErrors}
			validator={fixedEarningForm.validator}
			name="fixedEarningForm"
		>
			<Label className="block w-full">
				<span className="mb-1 block">{t("earnings.amount")}</span>
				<CurrencyInput
					{...fixedEarningForm.inputProps.amount}
					defaultValue={fixedEarning.amount}
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("earnings.description")}</span>
				<Input
					{...fixedEarningForm.inputProps.description}
					defaultValue={fixedEarning.description}
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("earnings.category")}</span>
				<Select
					{...fixedEarningForm.inputProps.categoryId}
					options={categories}
					defaultValue={fixedEarning.categoryId ?? undefined}
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("earnings.startDate")}</span>
				<Input
					{...fixedEarningForm.inputProps.startDate}
					defaultValue={new Date(fixedEarning.startDate)
						.toISOString()
						.replace("T00:00:00.000Z", "")}
					type="date"
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("earnings.dueDay")}</span>
				<Input
					{...fixedEarningForm.inputProps.dueDay}
					defaultValue={fixedEarning.dueDay}
					type="number"
				/>
			</Label>
			<Label className="block w-full">
				<span className="mb-1 block">{t("earnings.endDate")}</span>
				<Input
					{...fixedEarningForm.inputProps.endDate}
					defaultValue={
						fixedEarning.endDate
							? new Date(fixedEarning.endDate)
									.toISOString()
									.replace("T00:00:00.000Z", "")
							: undefined
					}
					type="date"
				/>
			</Label>
			<Input
				{...fixedEarningForm.inputProps.timeZone}
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
