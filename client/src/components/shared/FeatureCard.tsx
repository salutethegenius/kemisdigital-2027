import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items?: string[];
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  items,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-cyan-500" />
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{description}</p>
          {items && (
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-cyan-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
