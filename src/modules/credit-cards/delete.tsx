import { Form, Input, Saving } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { CreditCardWithLimits } from "@/lib/db/schema";
import { useClientTranslations } from "@/lib/i18n/utils";
import { sanitize } from "@/lib/utils";
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
import { z } from "zod";
import { type FieldErrors, createForm } from "simple:form";

export const deleteForm = createForm({
	id: z.string().transform(sanitize),
});

type CreditCardEditProps = {
	creditCard: CreditCardWithLimits;
	serverErrors?: FieldErrors<typeof deleteForm>;
	open: boolean;
	onClose?: () => void;
};

export const CreditCardDelete: React.FC<CreditCardEditProps> = ({
	creditCard,
	serverErrors,
	open,
	onClose,
}) => {
	const t = useClientTranslations();
	return (
		<Modal
			title={t("creditCards.form.delete.title")}
			open={open}
			onClose={onClose}
		>
			<Form
				fieldErrors={serverErrors}
				validator={deleteForm.validator}
				name="deleteForm"
				className="grid gap-2 w-full"
			>
				<Input
					{...deleteForm.inputProps.id}
					type="hidden"
					defaultValue={creditCard.id}
				/>

				{onClose && (
					<Button
						className="w-full flex items-center justify-start"
						type="button"
						variant="outline"
						onClick={onClose}
					>
						<ChevronLeft className="w-4 h-4 mr-2" />
						{t("cancel")}
					</Button>
				)}

				<Button
					className="w-full flex items-center justify-start"
					type="submit"
					variant="destructive"
				>
					<Trash2 className="w-4 h-4 mr-2" />
					{t("delete")}
				</Button>
				<Saving className="mb-4" />
			</Form>
		</Modal>
	);
};
