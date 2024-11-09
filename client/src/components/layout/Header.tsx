import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Membership", href: "/membership" },
  { name: "Events", href: "/events" },
  { name: "Resources", href: "/resources" },
  { name: "Advocacy", href: "/advocacy" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-2xl">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-cyan-500"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>BDMA</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
                location === item.href ? "text-cyan-500" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button>Join Now</Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
                    location === item.href ? "text-cyan-500" : "text-gray-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="w-full">Join Now</Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
