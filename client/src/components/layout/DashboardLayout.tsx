import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Calendar, Users, FileText, Settings, LogOut, BarChart, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "AI Labs", href: "/ailabs", icon: Brain },
    { name: "AI Services", href: "/dashboard/services", icon: Calendar },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Resources", href: "/dashboard/resources", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 border-r bg-card">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-2xl font-bold">KemisDigital</span>
              </div>
              <div className="px-4 mt-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Welcome, {user?.name}
                </p>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        location === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary/5",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <Icon
                        className={cn(
                          location === item.href
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary",
                          "mr-3 h-5 w-5"
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
