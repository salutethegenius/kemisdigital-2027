import Hero from "@/components/shared/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { staggerChildren } from "@/lib/animations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@bdma.org",
      link: "mailto:info@bdma.org",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (242) 555-0123",
      link: "tel:+12425550123",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Digital Drive, Nassau, Bahamas",
      link: "https://maps.google.com",
    },
    {
      icon: MessageSquare,
      title: "Social Media",
      content: "Follow us @BDMA",
      link: "#",
    },
  ];

  return (
    <div>
      <Hero
        title="Contact Us"
        description="Get in touch with us for any inquiries about membership, events, or collaboration opportunities."
        showCTA={false}
      />

      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="membership">Membership Inquiry</SelectItem>
                          <SelectItem value="events">Events</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {contactInfo.map((item) => (
            <Card key={item.title}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <item.icon className="w-6 h-6 text-cyan-500" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-cyan-500 transition-colors"
                    >
                      {item.content}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
