import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
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
        <Link href="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
          <img src="/images/logo.png" alt="Kemis Digital Logo" className="h-10" />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="relative">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 ${
                      location === item.href ? "text-[#00A0E3]" : "text-muted-foreground"
                    }`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                  {hoveredItem === item.name && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <div className="p-4 w-[270px] bg-background rounded-md shadow-md border">
                        <Link 
                          href={item.href} 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-5 w-5 text-[#00A0E3]" />
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
                            {item.description}
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem className="relative">
                <div
                  className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center px-3 py-2 cursor-pointer ${
                    location === "/contact" || location === "/meet" ? "text-[#00A0E3]" : "text-muted-foreground"
                  }`}
                  onMouseEnter={() => setHoveredItem("contact")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('header.contact')}
                </div>
                {hoveredItem === "contact" && (
                  <div 
                    className="absolute top-full left-0 mt-1 z-50"
                    onMouseEnter={() => setHoveredItem("contact")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="p-4 w-[270px] bg-background rounded-md shadow-md border">
                      <div className="grid gap-3">
                        <Link 
                          href="/contact" 
                          className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                          onClick={handleContactNavigation}
                        >
                          <Mail className="w-4 h-4" />
                          <span>{t('header.contact')}</span>
                        </Link>
                        <Link 
                          href="/meet" 
                          className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-md"
                          onClick={handleContactNavigation}
                        >
                          <Video className="w-4 h-4" />
                          <span>Video Meeting</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <LanguageSelector />
          <Button asChild className="bg-[#00A0E3] hover:bg-[#00A0E3]/90 text-white">
            <Link href="/services" onClick={() => window.scrollTo(0, 0)}>{t('homepage.cta.get_started')}</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex justify-center mb-4 mt-2">
              <img src="/images/logo.png" alt="Kemis Digital Logo" className="h-8" />
            </div>
            <div className="flex flex-col space-y-4 mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#00A0E3] flex items-center space-x-2 ${
                    location === item.href ? "text-[#00A0E3]" : "text-muted-foreground"
                  }`}
                  onClick={handleNavigation}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="space-y-2 border-t pt-4">
                <h3 className="text-sm font-medium text-[#F7BE00]">{t('header.contact')}</h3>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 text-sm hover:text-[#00A0E3]"
                  onClick={handleNavigation}
                >
                  <Mail className="w-4 h-4" />
                  <span>{t('header.contact')}</span>
                </Link>
                <Link
                  href="/meet"
                  className="flex items-center space-x-2 text-sm hover:text-[#00A0E3]"
                  onClick={handleNavigation}
                >
                  <Video className="w-4 h-4" />
                  <span>Video Meeting</span>
                </Link>
              </div>
              <div className="flex justify-center my-2">
                <LanguageSelector />
              </div>
              <Button className="w-full bg-[#00A0E3] hover:bg-[#00A0E3]/90 text-white" asChild>
                <Link href="/services" onClick={handleNavigation}>{t('homepage.cta.get_started')}</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
