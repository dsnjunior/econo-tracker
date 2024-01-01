import { Plus } from "lucide-react";
import React from "react";

import { useMediaQuery } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface InsertDataDialogProps {
	children: React.ReactNode;
	title: string;
}

export const InsertDataDialog: React.FC<InsertDataDialogProps> = ({
	children,
	title,
}) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [open, setOpen] = React.useState(false);

	return (
		<>
			{isDesktop ? (
				<Button onClick={() => setOpen(true)}>{title}</Button>
			) : (
				<Button
					className="fixed bottom-3 right-3 z-10"
					size="icon"
					onClick={() => setOpen(true)}
				>
					<Plus className="w-6 h-6 shrink-0" />
					<span className="sr-only">{title}</span>
				</Button>
			)}
			<Modal title={title} open={open} onClose={() => setOpen(false)}>
				{children}
			</Modal>
		</>
	);
};
