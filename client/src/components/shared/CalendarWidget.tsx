import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface CalendarWidgetProps {
  className?: string;
}

export default function CalendarWidget({ className }: CalendarWidgetProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal.ns["frontdesk"]("ui", {
        styles: { branding: { brandColor: "#7c3aed" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className={className}>
      <Button 
        data-cal-namespace="frontdesk"
        data-cal-link="kemisdigital/consultation"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Schedule Demo
      </Button>
    </div>
  );
}
