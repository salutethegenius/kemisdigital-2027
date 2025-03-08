import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MembershipTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export default function MembershipTier({
  title,
  price,
  description,
  features,
  recommended = false,
}: MembershipTierProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        className={`h-full relative ${
          recommended ? "border-[#F7BE00] dark:border-[#F7BE00] border-2" : ""
        }`}
      >
        {recommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-[#F7BE00] text-white px-4 py-1 rounded-full text-sm">
              Recommended
            </span>
          </div>
        )}
        <CardHeader>
          <h3 className="text-2xl font-bold text-center">{title}</h3>
          <div className="text-center">
            <span className="text-3xl font-bold text-[#F7BE00]">{price}</span>
            {price !== "Contact Us" && <span className="text-gray-600 dark:text-gray-400">/year</span>}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">{description}</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-[#00A0E3] mt-1"
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
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className={`w-full ${
              recommended 
                ? "bg-[#F7BE00] hover:bg-[#F7BE00]/90 text-white" 
                : "bg-[#00A0E3] hover:bg-[#00A0E3]/90 text-white"
            }`}
          >
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
