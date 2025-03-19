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
  Calendar,
  BarChart,
  Users,
  Award
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

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { t } = useTranslation();

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

  // Function to handle hover
  const handleHover = (itemName: string) => {
    if (hoveredItem !== itemName) {
      setHoveredItem(itemName);
    }
  };

  // Function to handle hover end
  const handleHoverEnd = () => {
    setHoveredItem(null);
  };

  const navigation = [
    { name: t('header.home'), href: "/", icon: Home, description: "Return to our homepage" },
    { name: t('header.about'), href: "/about", icon: Info, description: "Learn about our company" },
    { name: "AI Labs", href: "/ai-labs", icon: Sparkles, description: "Explore our AI-powered solutions" },
    { name: "Web Development", href: "/services/web-app-dev", icon: Code, description: "Custom web and mobile app development" },
    { name: "Payment Solutions", href: "/payment-solutions", icon: CreditCard, description: "Secure payment processing and financial solutions" },
    { name: "Analytics", href: "/analytics", icon: BarChart, description: "Data analytics and visualization solutions" },
    { name: "Advocacy", href: "/advocacy", icon: Users, description: "Digital advocacy initiatives and programs" },
    { name: "Membership", href: "/membership", icon: Award, description: "Become a member and access exclusive benefits" },
    { name: t('header.events'), href: "/events", icon: Calendar, description: "Our events and workshops" },
    { name: t('header.latest_news'), href: "/latest-news", icon: Newspaper, description: "Stay updated with our latest news" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
          <img src="/images/logo.png" alt="Kemis Digital Logo" className="h-8" />
        </a>

        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="relative">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name} className="relative">
                  <a
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 ${
                      location === item.href ? "text-[#00A0E3]" : "text-muted-foreground"
                    }`}
                    onMouseEnter={() => handleHover(item.name)}
                    onMouseLeave={handleHoverEnd}
                    onClick={handleNavigation}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                  {hoveredItem === item.name && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <div className="p-4 w-[270px] bg-background rounded-md shadow-md border">
                        <a 
                          href={item.href} 
                          className="flex items-center mb-2 text-sm font-medium text-[#00A0E3]"
                          onClick={() => handleNavigation()}
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </a>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        
                        {/* Show contact link for all navigation items */}
                        <div className="mt-3 pt-3 border-t">
                          <a
                            href="/contact"
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => handleContactNavigation("/contact")}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact us about {item.name.toLowerCase()}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <a
                  href="/meet"
                  className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 ${
                    location === "/meet" ? "text-[#00A0E3]" : "text-muted-foreground"
                  }`}
                  onClick={() => handleNavigation()}
                  onMouseEnter={() => handleHover("meet")}
                  onMouseLeave={handleHoverEnd}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Meet
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a
                  href="/contact"
                  className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 ${
                    location === "/contact" ? "text-[#00A0E3]" : "text-muted-foreground"
                  }`}
                  onClick={() => handleNavigation()}
                  onMouseEnter={() => handleHover("contact")}
                  onMouseLeave={handleHoverEnd}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('header.contact')}
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2">
            <LanguageSelector />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
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
                  <a
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
                  </a>
                ))}
                
                <a
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
                </a>
                
                <a
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
                </a>
                
                <div className="flex items-center space-x-2 pt-4 mt-2 border-t">
                  <LanguageSelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
