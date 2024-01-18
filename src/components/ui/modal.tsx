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
	onClose?: () => void;
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
				<DialogContent closeable={!!onClose} className="px-0">
					<DialogHeader className="px-4">
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					<div className="mt-4 max-h-[calc(var(--vh)-220px)] overflow-auto">
						<div className="px-4 py-1">{children}</div>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Drawer open={open} onClose={onClose} dismissible={!!onClose}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{title}</DrawerTitle>
				</DrawerHeader>
				<div className="mt-4 max-h-[calc(var(--vh)-120px)] overflow-auto">
					<div className="px-4 pt-1 pb-8">{children}</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
