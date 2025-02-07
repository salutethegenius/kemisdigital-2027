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
  { name: "Latest News", href: "/latest-news" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center space-x-2 font-bold text-2xl" aria-label="Kemis Digital home">
          <span className="text-primary">Kemis</span>
          <span>Digital</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === item.href ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={location === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === "/contact" || location === "/meet" ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-label="Contact options"
                >
                  Contact
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[200px]" role="menu">
                    <NavigationMenuLink asChild>
                      <Link href="/contact" className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-md" role="menuitem">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        <span>Contact Us</span>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/meet" className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-md" role="menuitem">
                        <Video className="w-4 h-4" aria-hidden="true" />
                        <span>Video Meeting</span>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/services">Get Started</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-6" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={location === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="space-y-2 border-t pt-4">
                <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  href="/meet"
                  className="flex items-center space-x-2 text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <Video className="w-4 h-4" aria-hidden="true" />
                  <span>Video Meeting</span>
                </Link>
              </div>
              <ThemeToggle />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white" asChild onClick={() => setIsOpen(false)}>
                <Link href="/services">Get Started</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}