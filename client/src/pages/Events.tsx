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
      title: "AI Marketing Masterclass",
      date: "March 15, 2024",
      location: "Virtual Event",
      time: "9:00 AM - 4:00 PM",
      description: "Learn how to leverage AI tools for marketing automation, content generation, and customer insights.",
      capacity: "100 participants",
      type: "workshop"
    },
    {
      title: "Future of Digital Marketing Summit 2024",
      date: "April 20-21, 2024",
      location: "Nassau Tech Hub",
      time: "9:00 AM - 5:00 PM",
      description: "Join industry leaders to explore the intersection of AI and digital marketing strategies.",
      capacity: "250 participants",
      type: "conference"
    },
    {
      title: "ChatGPT for Marketing Teams",
      date: "May 5, 2024",
      location: "Virtual Event",
      time: "2:00 PM - 4:00 PM",
      description: "Practical workshop on using ChatGPT for content creation, customer service, and marketing automation.",
      capacity: "150 participants",
      type: "webinar"
    }
  ];

  return (
    <div>
      <Hero
        title="AI Marketing Events"
        description="Join our cutting-edge events to master AI-powered marketing strategies and stay ahead of the competition."
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
                        <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-purple-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-purple-500" />
                        {event.capacity}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button variant="outline">Learn More</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Register Now</Button>
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
              Subscribe to our newsletter to receive updates about upcoming AI marketing events and exclusive insights.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
