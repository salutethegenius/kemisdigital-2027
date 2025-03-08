import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Video, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "AI Services", href: "/services" },
  { name: "Web/App Development", href: "/services/web-app-dev" },
  { name: "Payment Solutions", href: "/payment-solutions" },
  { name: "Latest News", href: "/latest-news" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Kemis Digital Logo" className="h-10" />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-[#00A0E3] ${
                location === item.href ? "text-[#00A0E3]" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`text-sm font-medium transition-colors hover:text-[#00A0E3] ${
                  location === "/contact" || location === "/meet" ? "text-[#00A0E3]" : "text-muted-foreground"
                }`}>Contact</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[200px]">
                    <NavigationMenuLink asChild>
                      <Link href="/contact" className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                        <Mail className="w-4 h-4" />
                        <span>Contact Us</span>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/meet" className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                        <Video className="w-4 h-4" />
                        <span>Video Meeting</span>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
          <Button asChild className="bg-[#00A0E3] hover:bg-[#00A0E3]/90 text-white">
            <Link href="/services">Get Started</Link>
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
                  className={`text-sm font-medium transition-colors hover:text-[#00A0E3] ${
                    location === item.href ? "text-[#00A0E3]" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="space-y-2 border-t pt-4">
                <h3 className="text-sm font-medium text-[#F7BE00]">Contact</h3>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 text-sm hover:text-[#00A0E3]"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  href="/meet"
                  className="flex items-center space-x-2 text-sm hover:text-[#00A0E3]"
                  onClick={() => setIsOpen(false)}
                >
                  <Video className="w-4 h-4" />
                  <span>Video Meeting</span>
                </Link>
              </div>
              <ThemeToggle />
              <Button className="w-full bg-[#00A0E3] hover:bg-[#00A0E3]/90 text-white" asChild onClick={() => setIsOpen(false)}>
                <Link href="/services">Get Started</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}