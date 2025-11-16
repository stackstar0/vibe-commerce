import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center animate-in zoom-in duration-300">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Order Placed Successfully!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be delivered soon.
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Button>
      </DialogContent>
    </Dialog>
  );
};
