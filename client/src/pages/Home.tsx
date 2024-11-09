import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import MembershipTier from "@/components/shared/MembershipTier";
import { motion } from "framer-motion";
import { Graduation, Users, FileText } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Hero
        title="Welcome to the Bahamas Digital Marketing Association"
        description="Elevating digital marketing standards, providing education, and setting ethical guidelines for professionals in the Bahamas."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="initial"
        animate="animate"
      >
        <FeatureCard
          title="Education & Standards"
          description="Enhance your skills with our comprehensive educational programs"
          icon={Graduation}
          items={[
            "Certified Digital Marketer Program",
            "Webinars and Workshops",
            "Professional Development"
          ]}
        />
        <FeatureCard
          title="Networking & Collaboration"
          description="Connect with industry professionals and grow your network"
          icon={Users}
          items={[
            "Industry Events",
            "Mentorship Programs",
            "Community Forums"
          ]}
        />
        <FeatureCard
          title="Resources & Support"
          description="Access exclusive resources to help you succeed"
          icon={FileText}
          items={[
            "Digital Marketing Tools",
            "Industry Research",
            "Best Practices Guides"
          ]}
        />
      </motion.div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MembershipTier
            title="Basic"
            price="$100"
            description="Perfect for individuals starting their digital marketing journey"
            features={[
              "Access to resource library",
              "Monthly webinars",
              "Community forum access",
              "Basic certification"
            ]}
          />
          <MembershipTier
            title="Professional"
            price="$250"
            description="Ideal for practicing digital marketing professionals"
            features={[
              "All Basic features",
              "Advanced certifications",
              "Priority event access",
              "1-on-1 mentoring",
              "Professional listing"
            ]}
            recommended
          />
          <MembershipTier
            title="Corporate"
            price="Contact Us"
            description="For agencies and marketing teams"
            features={[
              "All Professional features",
              "Team training sessions",
              "Custom workshops",
              "Priority support",
              "Brand visibility"
            ]}
          />
        </div>
      </section>
    </div>
  );
}
