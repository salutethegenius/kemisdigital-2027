import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <Card key={unit} className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground capitalize">{unit}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
