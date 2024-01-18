import { CurrencyInput, Form, Input, Saving } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import type { CreditCardWithLimits } from "@/lib/db/schema";
import { useClientTranslations } from "@/lib/i18n/utils";
import { cn, sanitize } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react";
import React from "react";
import { z } from "zod";
import { CreditCardDelete } from "./delete";
import { type FieldErrors, createForm } from "simple:form";

export const editForm = createForm({
	name: z.string().transform(sanitize),
	color: z.string().transform(sanitize),
	limit: z.preprocess(
		(v) => Number(String(v).replace(/[^0-9]/g, "")),
		z.number().min(1).max(9999999),
	),
	dueDay: z.number().int().min(1).max(31),
	timeZone: z.string().transform(sanitize),
	id: z.string().transform(sanitize),
});

type CreditCardEditProps = {
	creditCard: CreditCardWithLimits;
	serverErrors?: FieldErrors<typeof editForm>;
	open: boolean;
	disableDelete?: boolean;
	onClose?: () => void;
};

export const CreditCardEdit: React.FC<CreditCardEditProps> = ({
	creditCard,
	serverErrors,
	open,
	disableDelete,
	onClose,
}) => {
	const t = useClientTranslations();

	const [cc, setCc] = React.useState(creditCard);
	const [deleting, setDeleting] = React.useState(false);

	return (
		<>
			<Modal title={t("creditCards.form.title")} open={open} onClose={onClose}>
				<div className="grid gap-4">
					<Form
						className="grid gap-4"
						fieldErrors={serverErrors}
						validator={editForm.validator}
						name="editForm"
					>
						<div
							className={cn(
								"flex items-center justify-center font-bold p-1",
								"fixed top-0 right-0 mt-2 mr-2 w-20 h-10 text-lg rounded",
								"md:relative md:mt-0 md:mr-0 md:w-full md:h-40 md:text-4xl md:rounded-3xl",
							)}
							style={{ background: cc.color }}
						>
							<span className="w-full text-center truncate">{cc.name}</span>
						</div>
						<Label className="block w-full">
							<span className="mb-1 block">{t("creditCards.name")}</span>
							<Input
								{...editForm.inputProps.name}
								defaultValue={creditCard.name}
								onChange={(e) => setCc({ ...cc, name: e.target.value })}
							/>
						</Label>

						<Label className="block w-full">
							<span className="mb-1 block">{t("creditCards.color")}</span>
							<Input
								{...editForm.inputProps.color}
								defaultValue={creditCard.color}
								type="color"
								onChange={(e) => setCc({ ...cc, color: e.target.value })}
							/>
						</Label>

						<Label className="block w-full">
							<span className="mb-1 block">{t("creditCards.limit")}</span>
							<CurrencyInput
								{...editForm.inputProps.limit}
								defaultValue={creditCard.limits[0]?.limit}
							/>
						</Label>

						<Label className="block w-full">
							<span className="mb-1 block">{t("creditCards.dueDay")}</span>
							<Input
								{...editForm.inputProps.dueDay}
								defaultValue={creditCard.dueDay}
								type="number"
							/>
						</Label>

						<Input
							{...editForm.inputProps.timeZone}
							type="hidden"
							defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
						/>

						<Input
							{...editForm.inputProps.id}
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
					{!disableDelete && (
						<Button
							className="w-full"
							type="button"
							variant="destructive"
							onClick={() => setDeleting(true)}
						>
							<Trash2 className="w-4 h-4 mr-2" />
							{t("delete")}
						</Button>
					)}
				</div>
			</Modal>
			{deleting && (
				<CreditCardDelete
					open
					creditCard={creditCard}
					onClose={() => setDeleting(false)}
				/>
			)}
		</>
	);
};
