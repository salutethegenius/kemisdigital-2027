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
      <Card className="h-full hover:border-[#F7BE00] dark:hover:border-[#F7BE00] transition-colors">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-[#00A0E3] group-hover:text-[#F7BE00] dark:group-hover:text-[#F7BE00]" />
            <h3 className="text-xl font-semibold text-[#00A0E3]">{title}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          {items && (
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-[#00A0E3]"
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
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
