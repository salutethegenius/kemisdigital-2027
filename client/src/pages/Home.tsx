import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import MembershipTier from "@/components/shared/MembershipTier";
import { motion } from "framer-motion";
import { GraduationCap, Users, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

export default function Home() {
  return (
    <div>
      <Hero
        title="Welcome to the Bahamas Digital Marketing Association"
        description="Elevating digital marketing standards, providing education, and setting ethical guidelines for professionals in the Bahamas."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <FeatureCard
          title="Education & Standards"
          description="Enhance your skills with our comprehensive educational programs"
          icon={GraduationCap}
          items={[
            "Certified Digital Marketer Program",
            "Webinars and Workshops",
            "Ethical Guidelines for Digital Marketing"
          ]}
        />
        <FeatureCard
          title="Networking & Collaboration"
          description="Connect with industry professionals and grow your network"
          icon={Users}
          items={[
            "Annual Digital Marketing Summit",
            "Monthly Meetups and Webinars",
            "Mentorship Programs"
          ]}
        />
        <FeatureCard
          title="Advocacy & Representation"
          description="Supporting the growth and regulation of digital marketing"
          icon={Scale}
          items={[
            "Policy Influence on Digital Transformation",
            "Representation in Government Discussions",
            "Promotion of Fair Digital Marketing Practices"
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

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Annual Digital Marketing Summit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Join us for our flagship event featuring keynote speakers, workshops, and networking opportunities.</p>
              <p className="mb-4">Date: September 22-24, 2023</p>
              <Button>Learn More & Register</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Meetup: Social Media Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Discuss the latest social media trends and strategies for Bahamian businesses.</p>
              <p className="mb-4">Date: June 15, 2023</p>
              <Button>RSVP Now</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16 bg-cyan-600 text-white py-16 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Industry Partnerships</h2>
          <p className="max-w-2xl mx-auto">We collaborate with leading organizations to support the growth of digital marketing in the Bahamas.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((partner) => (
            <div key={partner} className="bg-white rounded-full p-4 aspect-square flex items-center justify-center">
              <p className="text-cyan-600 font-semibold">Partner {partner}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="mb-6">Join our newsletter to stay updated on the latest digital marketing trends, events, and association news.</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
