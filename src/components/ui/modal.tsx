import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/utils";

interface InsertDataDialogProps {
	children: React.ReactNode;
	title: string;
	open: boolean;
	onClose: () => void;
}

export const Modal: React.FC<InsertDataDialogProps> = ({
	children,
	title,
	open,
	onClose,
}) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onClose}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					<div className="pt-4">{children}</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onClose={onClose}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{title}</DrawerTitle>
				</DrawerHeader>
				<div className="p-4 pb-8">{children}</div>
			</DrawerContent>
		</Drawer>
	);
};
