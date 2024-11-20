import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";
import { Calendar, Users, FileText, Bell } from "lucide-react";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Preloader from "@/components/shared/Preloader";

const DashboardCharts = lazy(() => import("@/components/dashboard/DashboardCharts"));

export default function Dashboard() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Member Dashboard</h1>

      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Events This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Network Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resources Accessed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </motion.div>

      <ErrorBoundary>
        <Suspense fallback={<Preloader />}>
          <DashboardCharts />
        </Suspense>
      </ErrorBoundary>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Digital Marketing Summit</h3>
                  <p className="text-sm text-muted-foreground">Sep 22-24, 2023</p>
                </div>
                <Button>RSVP</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Social Media Workshop</h3>
                  <p className="text-sm text-muted-foreground">Oct 15, 2023</p>
                </div>
                <Button>RSVP</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Digital Marketing Trends 2024</h3>
                  <p className="text-sm text-muted-foreground">PDF Guide</p>
                </div>
                <Button variant="outline">Download</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">SEO Best Practices</h3>
                  <p className="text-sm text-muted-foreground">Video Course</p>
                </div>
                <Button variant="outline">Watch</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
