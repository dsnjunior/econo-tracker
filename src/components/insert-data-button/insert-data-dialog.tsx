import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface InsertDataDialogProps {
  children: React.ReactNode;
  title: string;
}

export const InsertDataDialog: React.FC<InsertDataDialogProps> = ({ children, title }) => (
  <Dialog>
    <DialogTrigger asChild><Button>{title}</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>

        <div className="pt-4">
          {children}
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)