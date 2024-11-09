import Hero from "@/components/shared/Hero";
import MembershipTier from "@/components/shared/MembershipTier";
import FeatureCard from "@/components/shared/FeatureCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Users, Briefcase, Crown } from "lucide-react";
import { staggerChildren } from "@/lib/animations";

export default function Membership() {
  const membershipBenefits = [
    {
      title: "Professional Development",
      description: "Enhance your skills and knowledge",
      icon: Award,
      items: [
        "Access to certification programs",
        "Industry-recognized credentials",
        "Continuing education credits",
        "Skill assessment tools"
      ]
    },
    {
      title: "Networking & Events",
      description: "Connect with industry professionals",
      icon: Users,
      items: [
        "Exclusive networking events",
        "Member directory access",
        "Mentorship programs",
        "Online community forums"
      ]
    },
    {
      title: "Resources & Tools",
      description: "Access premium marketing resources",
      icon: Briefcase,
      items: [
        "Digital marketing tools",
        "Templates and guides",
        "Research reports",
        "Best practice documentation"
      ]
    },
    {
      title: "Exclusive Perks",
      description: "Enjoy member-only benefits",
      icon: Crown,
      items: [
        "Event discounts",
        "Partner offers",
        "Priority registration",
        "Recognition programs"
      ]
    }
  ];

  const membershipTiers = [
    {
      title: "Student",
      price: "$25",
      description: "For students pursuing marketing or related fields",
      features: [
        "Access to entry-level workshops",
        "Student networking group",
        "Basic resource library access",
        "Volunteer opportunities"
      ]
    },
    {
      title: "Professional",
      price: "$100",
      description: "For individual marketing professionals",
      features: [
        "Full access to events and workshops",
        "Complete resource library",
        "Mentorship program eligibility",
        "Professional directory listing",
        "Certification discounts"
      ],
      recommended: true
    },
    {
      title: "Corporate",
      price: "$500",
      description: "For agencies and marketing teams",
      features: [
        "5 individual memberships",
        "Priority event access",
        "Custom training sessions",
        "Promotional opportunities",
        "Enhanced directory presence",
        "Advisory board eligibility"
      ]
    },
    {
      title: "Lifetime",
      price: "$1,000",
      description: "Long-term commitment with premium benefits",
      features: [
        "Permanent membership status",
        "VIP event access",
        "Leadership opportunities",
        "Special recognition",
        "Exclusive networking events",
        "Legacy member benefits"
      ]
    }
  ];

  return (
    <div>
      <Hero
        title="Membership"
        description="Join the Bahamas Digital Marketing Association and become part of a thriving community of marketing professionals."
      />

      <motion.section
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Member Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipBenefits.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              items={benefit.items}
            />
          ))}
        </div>
      </motion.section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTiers.map((tier) => (
            <MembershipTier
              key={tier.title}
              title={tier.title}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              recommended={tier.recommended}
            />
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">How to Join</h2>
            <p className="text-gray-600 mb-6">
              Becoming a member is easy! Follow these simple steps to join our community:
            </p>
            <ol className="list-decimal list-inside space-y-4 mb-6">
              <li>Choose your membership tier</li>
              <li>Complete the online application form</li>
              <li>Submit required documentation (if applicable)</li>
              <li>Process payment</li>
              <li>Receive welcome package and access credentials</li>
            </ol>
            <div className="flex justify-center">
              <Button size="lg">Apply for Membership</Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <section className="mb-16">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Membership FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How long is the membership term?</h3>
                <p className="text-gray-600">Memberships are valid for one year from the date of joining, except for Lifetime memberships.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I upgrade my membership?</h3>
                <p className="text-gray-600">Yes, you can upgrade your membership tier at any time. The difference in fees will be prorated.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, bank transfers, and digital payment methods.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
