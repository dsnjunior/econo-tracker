import {
	ChevronRight,
	MoreHorizontal,
	Pencil,
	Plus,
	Trash,
} from "lucide-react";
import React from "react";

import type { CreditCardComplete } from "@/lib/db/schema";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import { useClientTranslations } from "@/lib/i18n/utils";
import { CreditCardAddExpense } from "./add-expense";
import { CreditCardDelete } from "./delete";
import { CreditCardEdit } from "./edit";

interface OptionsProps {
	creditCard: CreditCardComplete;
	open: boolean;
	mode: "menu" | "add-register" | "edit" | "delete";
}

export const Options: React.FC<OptionsProps> = ({
	creditCard,
	open: defaultOpen,
	mode: defaultMode,
}) => {
	const [open, setOpen] = React.useState(defaultOpen);
	const [mode, setMode] = React.useState<OptionsProps["mode"]>(defaultMode);

	const t = useClientTranslations();

	return (
		<>
			<Button variant="outline" size="icon" onClick={() => setOpen(true)}>
				<MoreHorizontal />
			</Button>
			<Modal
				title={t("creditCards.form.title")}
				open={open}
				onClose={() => {
					setOpen(false);
					setTimeout(() => setMode("menu"), 200);
				}}
			>
				<div className="grid gap-2">
					<Button
						onClick={() => setMode("add-register")}
						variant="outline"
						className="w-full flex items-center justify-start"
					>
						<Plus className="w-4 h-4 mr-4" /> {t("creditCards.addExpense")}{" "}
						<ChevronRight className="w-5 h-5 ml-auto pl-1" />
					</Button>
					<Button
						onClick={() => setMode("edit")}
						variant="outline"
						className="w-full flex items-center justify-start"
					>
						<Pencil className="w-4 h-4 mr-4" /> {t("edit")}{" "}
						<ChevronRight className="w-5 h-5 ml-auto pl-1" />
					</Button>
					<Button
						onClick={() => setMode("delete")}
						variant="destructive"
						className="w-full flex items-center justify-start"
					>
						<Trash className="w-4 h-4 mr-4" /> {t("delete")}{" "}
						<ChevronRight className="w-5 h-5 ml-auto pl-1" />
					</Button>
				</div>
			</Modal>

			{open && mode === "edit" && (
				<CreditCardEdit
					open
					creditCard={creditCard}
					disableDelete
					onClose={() => setMode("menu")}
				/>
			)}

			{open && mode === "delete" && (
				<CreditCardDelete
					open
					creditCard={creditCard}
					onClose={() => setMode("menu")}
				/>
			)}

			{open && mode === "add-register" && (
				<CreditCardAddExpense
					open
					creditCard={creditCard}
					onClose={() => setMode("menu")}
				/>
			)}
		</>
	);
};
