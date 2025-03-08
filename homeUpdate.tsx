import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Globe,
  Target,
  Sparkles,
  Code2 as Code,
  CheckCircle2,
  ArrowUpRight,
  Infinity,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { staggerChildren } from "@/lib/animations";

const aiServices = [
    {
      icon: Globe,
      title: "Digital Sales",
      description: "Complete digital sales solution including landing page, sales funnel, and professional PPC campaign management for maximum ROI.",
      benefits: [
        "Professional landing page design",
        "Complete sales funnel setup",
        "PPC campaign setup and management",
        "Monthly campaign optimization",
        "Performance tracking & reporting",
        "Lead capture integration"
      ],
      caseStudy: "A local business achieved 150% increase in qualified leads through our digital sales package",
      integration: "Seamless integration with CRM platforms and analytics systems",
      pricing: "$1,499 + $300 minimum ad budget\nPro: $1,999 + $500 ad budget\nCustom: Contact us"
    },
    {
      icon: Target,
      title: "Startup Growth Package",
      description: "Comprehensive digital marketing solution for startups, including evergreen funnel, content creation, and multi-channel marketing.",
      benefits: [
        "Evergreen marketing funnel",
        "Strategic email marketing",
        "Professional content creation",
        "Social media management",
        "High-converting landing pages",
        "PPC campaign setup & management"
      ],
      caseStudy: "A Bahamian startup saw 250% increase in monthly revenue within 6 months",
      integration: "Integration with marketing platforms and analytics systems",
      pricing: "$2,497 + $300 minimum ad budget\nPro: $3,497 + $500 ad budget\nEnterprise: Custom pricing"
    },
    {
      icon: Code,
      title: "Tourism Sector Solutions",
      description: "Tailored digital solutions for tourism businesses, combining local market expertise with cutting-edge technology for maximum impact.",
      benefits: [
        "Custom booking system integration",
        "Multi-language support",
        "Virtual tour capabilities",
        "Mobile booking optimization",
        "Local SEO optimization",
        "Review management system"
      ],
      caseStudy: "A Caribbean resort achieved 180% increase in direct bookings",
      integration: "Integration with booking systems and payment processors",
      pricing: "Essential: $5,000\nPremium: $10,000\nLuxury: $15,000+"
    }
  ];

  const successMetrics = [
    {
      icon: CheckCircle2,
      metric: "95%",
      label: "Client Success Rate",
      description: "Clients achieving their marketing goals",
    },
    {
      icon: ArrowUpRight,
      metric: "250%",
      label: "Average ROI",
      description: "Return on marketing investment",
    },
    {
      icon: Infinity,
      metric: "85%",
      label: "Client Retention",
      description: "Long-term partnership success",
    },
  ];
  
  const testimonials = [
    {
      id: 1,
      quote: "KemisDigital has been a true game-changer for my non-profit! Since the launch of our landing page in October 2024, we've captured over 1,200 leads and achieved an impressive increase in social media engagement. Their expertise and dedication have elevated our digital presence and propelled us to new heights. We look forward to a long relationship with KemisDigital.",
      author: "Azaleta Ishmael-Newry",
      role: "CEO",
      company: "MAP Bahamas Non-Profit",
      image: "https://lightning.kemisdigital.com/assets/map-bahamas-ceo.jpeg"
    },
    {
      id: 2,
      quote: "Kenneth and his team at KemisDigital transformed our tourism business with their innovative approach. Their deep understanding of the Bahamian market combined with cutting-edge digital marketing strategies helped us reach a wider audience and increased our bookings by 45%. They truly embody the 'People's Choice' spirit.",
      author: "Nathaniel Butler, CFP",
      role: "CEO",
      company: "Drewber Solutions", 
      image: "https://lightning.kemisdigital.com/assets/nat%20(1).jpg"
    },
    {
      id: 3,
      quote: "https://youtu.be/YQWbgUtp-4A",
      author: "Video Testimonial",
      role: "Tourism Director",
      company: "Bahamas Tourism Sector",
      image: "https://images.unsplash.com/photo-1577179338526-7a24b36e8a6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    }
  ];

  export default function Home() {
    return (
      <div>
        <SEO 
          title="KemisDigital - The People's Choice | Digital Marketing & Development"
          description="Backed by 20 years of experience in the Bahamian marketplace, we've crafted A-player strategies that brought ideas to life with measured success."
          keywords="digital marketing, web development, Bahamas, tourism, startups, NGOs"
          ogImage="/images/fav.png"
        />
        
        <Hero
          title="The People's Choice!"
          description="Clients say we've earned this title because we're in the game with them. Backed by 20 years of experience in the Bahamian marketplace, we've crafted A-player strategies that brought ideas to life with measured success."
          pageContext="tourism"
          primaryCTA={{
            text: "Learn More",
            href: "/about"
          }}
        />

        {/* Our Mission Section */}
