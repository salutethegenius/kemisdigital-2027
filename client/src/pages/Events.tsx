import Hero from "@/components/shared/Hero";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";

interface Event {
  title: string;
  date: string;
  location: string;
  time: string;
  description: string;
  capacity: string;
  type: "workshop" | "conference" | "webinar";
}

export default function Events() {
  const upcomingEvents: Event[] = [
    {
      title: "Advanced Digital Marketing Workshop",
      date: "March 15, 2024",
      location: "Bahamas Baptist University College",
      time: "9:00 AM - 4:00 PM",
      description: "Intensive workshop covering advanced digital marketing strategies, analytics, and campaign management.",
      capacity: "30 participants",
      type: "workshop"
    },
    {
      title: "Annual Digital Marketing Summit 2024",
      date: "April 20-21, 2024",
      location: "Atlantis Paradise Island",
      time: "9:00 AM - 5:00 PM",
      description: "Two-day conference featuring industry leaders, networking sessions, and the latest digital marketing trends.",
      capacity: "200 participants",
      type: "conference"
    },
    {
      title: "Social Media Strategy Masterclass",
      date: "May 5, 2024",
      location: "Virtual Event",
      time: "2:00 PM - 4:00 PM",
      description: "Learn effective social media strategies and best practices from industry experts.",
      capacity: "100 participants",
      type: "webinar"
    }
  ];

  return (
    <div>
      <Hero
        title="Upcoming Events"
        description="Join us for professional development opportunities, networking events, and industry conferences."
        showCTA={false}
      />

      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-6 mb-16"
      >
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.capacity}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button variant="outline">Learn More</Button>
                <Button>Register Now</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <section className="mb-16">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to receive updates about upcoming events and professional development opportunities.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
