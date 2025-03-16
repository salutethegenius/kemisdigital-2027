import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface CalendarWidgetProps {
  className?: string;
}

export default function CalendarWidget({ className }: CalendarWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleScheduleRequest = () => {
    toast({
      title: "Coming Soon",
      description: "Online scheduling will be available soon. For now, please use the contact form above to request a consultation.",
    });
    setIsOpen(false);
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className={className}>
      <Button 
        onClick={handleOpenDialog}
        className="bg-[#00A0E3] hover:bg-[#0078A8] text-white"
      >
        Schedule Demo
      </Button>

      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule a Demo</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Online scheduling is coming soon! In the meantime, please fill out the contact form above
              and we'll get back to you within 24 hours to schedule your demo.
            </p>
            <Button 
              onClick={handleScheduleRequest}
              className="bg-[#00A0E3] hover:bg-[#0078A8] text-white"
            >
              Request Demo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
