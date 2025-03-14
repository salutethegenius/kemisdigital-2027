import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/use-sound-effects";
import { SoundButton } from "@/components/ui/sound-button";

interface CalendarWidgetProps {
  className?: string;
}

export default function CalendarWidget({ className }: CalendarWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { play } = useSound();

  const handleScheduleRequest = () => {
    toast({
      title: "Coming Soon",
      description: "Online scheduling will be available soon. For now, please use the contact form above to request a consultation.",
    });
    play("success");
    setIsOpen(false);
  };

  const handleOpenDialog = () => {
    play("click");
    setIsOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      play("hover");
    }
    setIsOpen(open);
  };

  return (
    <div className={className}>
      <SoundButton 
        onClick={handleOpenDialog}
        className="bg-[#00A0E3] hover:bg-[#0078A8] text-white"
        soundEffect="click"
      >
        Schedule Demo
      </SoundButton>

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
            <SoundButton 
              onClick={handleScheduleRequest}
              className="bg-[#00A0E3] hover:bg-[#0078A8] text-white"
              soundEffect="click"
            >
              Request Demo
            </SoundButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
