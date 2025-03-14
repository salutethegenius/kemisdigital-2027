import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Menu, 
  Video, 
  Mail, 
  Home, 
  Info, 
  Sparkles, 
  Code, 
  CreditCard, 
  Newspaper,
  Calendar
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../shared/LanguageSelector";

// Import new sound components
import { useSound } from "@/hooks/use-sound-effects";
import SoundLink from "@/components/shared/SoundLink";
import SoundToggle from "@/components/shared/SoundToggle";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { t } = useTranslation();
  const { play } = useSound();

  // Handle scroll restoration on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Function to handle navigation
  const handleNavigation = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  // Function to handle contact navigation from dropdown
  const handleContactNavigation = (href: string) => {
    window.scrollTo(0, 0);
    setHoveredItem(null);
  };

  // Function to handle hover sound effect
  const handleHover = (itemName: string) => {
    setHoveredItem(itemName);
    play("hover");
  };

  const navigation = [
    { name: t('header.home'), href: "/", icon: Home, description: "Return to our homepage" },
    { name: t('header.about'), href: "/about", icon: Info, description: "Learn about our company" },
    { name: "AI Lab", href: "/services", icon: Sparkles, description: "Explore our AI-powered solutions" },
    { name: "Web Development", href: "/services/web-app-dev", icon: Code, description: "Custom web and mobile app development" },
    { name: "Payment Solutions", href: "/payment-solutions", icon: CreditCard, description: "Secure payment processing and financial solutions" },
    { name: t('header.events'), href: "/events", icon: Calendar, description: "Our events and workshops" },
    { name: t('header.latest_news'), href: "/latest-news", icon: Newspaper, description: "Stay updated with our latest news" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <SoundLink href="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
          <img src="/images/logo.png" alt="Kemis Digital Logo" className="h-8" />
        </SoundLink>

        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="relative">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name} className="relative">
                  <SoundLink
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 ${
                      location === item.href ? "text-[#00A0E3]" : "text-muted-foreground"
                    }`}
                    onMouseEnter={() => handleHover(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </SoundLink>
                  {hoveredItem === item.name && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <div className="p-4 w-[270px] bg-background rounded-md shadow-md border">
                        <SoundLink 
                          href={item.href} 
                          className="flex items-center mb-2 text-sm font-medium text-[#00A0E3]"
                          onClick={() => handleNavigation()}
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </SoundLink>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        
                        {/* Show contact link for all navigation items */}
                        <div className="mt-3 pt-3 border-t">
                          <SoundLink
                            href="/contact"
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => handleContactNavigation("/contact")}
                            soundEffect="click"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact us about {item.name.toLowerCase()}
                          </SoundLink>
                        </div>
                      </div>
                    </div>
                  )}
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <SoundLink
                  href="/meet"
                  className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 ${
                    location === "/meet" ? "text-[#00A0E3]" : "text-muted-foreground"
                  }`}
                  onClick={() => handleNavigation()}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Meet
                </SoundLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <SoundLink
                  href="/contact"
                  className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 ${
                    location === "/contact" ? "text-[#00A0E3]" : "text-muted-foreground"
                  }`}
                  onClick={() => handleNavigation()}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('header.contact')}
                </SoundLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            {/* Add Sound Toggle Button */}
            <SoundToggle className="ml-2" />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => play("click")}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex justify-center mb-4 mt-2">
                <img src="/images/logo.png" alt="Kemis Digital Logo" className="h-8" />
              </div>
              <div className="flex flex-col space-y-4 mt-2">
                {navigation.map((item) => (
                  <SoundLink
                    key={item.name}
                    href={item.href}
                    className={`text-sm flex items-center py-2 ${
                      location === item.href ? "text-[#00A0E3] font-medium" : ""
                    }`}
                    onClick={() => {
                      handleNavigation();
                      setIsOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </SoundLink>
                ))}
                
                <SoundLink
                  href="/meet"
                  className={`text-sm flex items-center py-2 ${
                    location === "/meet" ? "text-[#00A0E3] font-medium" : ""
                  }`}
                  onClick={() => {
                    handleNavigation();
                    setIsOpen(false);
                  }}
                >
                  <Video className="w-4 h-4 mr-3" />
                  Meet
                </SoundLink>
                
                <SoundLink
                  href="/contact"
                  className={`text-sm flex items-center py-2 ${
                    location === "/contact" ? "text-[#00A0E3] font-medium" : ""
                  }`}
                  onClick={() => {
                    handleNavigation();
                    setIsOpen(false);
                  }}
                >
                  <Mail className="w-4 h-4 mr-3" />
                  {t('header.contact')}
                </SoundLink>
                
                <div className="flex items-center space-x-2 pt-4 mt-2 border-t">
                  <LanguageSelector />
                  <SoundToggle className="ml-2" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
