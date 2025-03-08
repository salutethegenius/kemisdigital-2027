import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MouseIcon, ChevronDown } from "lucide-react";
import Preloader from "./Preloader";

// Add the new hero image to the tourism context
const newHeroImage = {
  small: 'https://images.unsplash.com/photo-1558403194-611308249627?q=75&w=800&auto=format&fit=crop',
  medium: 'https://images.unsplash.com/photo-1558403194-611308249627?q=75&w=1280&auto=format&fit=crop',
  large: 'https://images.unsplash.com/photo-1558403194-611308249627?q=75&w=1920&auto=format&fit=crop',
  blur: 'https://images.unsplash.com/photo-1558403194-611308249627?q=10&w=20&auto=format&fit=crop&blur=10'
};

// Update the Home component to use the new hero image
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
        heroImage={newHeroImage.large}
        pageContext="tourism"
        primaryCTA={{
          text: "Learn More",
          href: "/about"
        }}
      />
      
      {/* Rest of the component */}
    </div>
  );
}
