import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Brain, Target, LineChart, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Hero from "@/components/shared/Hero";
import CalendarWidget from "@/components/shared/CalendarWidget";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    
    try {
      // Temporarily store the form data and show success message
      console.log('Form submitted:', values);
      
      toast({
        title: "Success",
        description: "Thank you for your message. We'll be in touch soon!",
      });

      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const contactReasons = [
    {
      icon: Brain,
      title: "AI Marketing Consultation",
      description: "Discuss your AI-powered marketing strategy and automation needs"
    },
    {
      icon: Target,
      title: "Partnership Opportunities",
      description: "Explore collaboration and strategic partnerships"
    },
    {
      icon: LineChart,
      title: "Service Inquiries",
      description: "Learn more about our AI marketing solutions and pricing"
    },
    {
      icon: Sparkles,
      title: "Support",
      description: "Get assistance with our AI marketing tools and services"
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "frontdesk@kemisdigital.com",
      link: "mailto:frontdesk@kemisdigital.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (242) 605-1522",
      link: "tel:+12426051522",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Nassau, Bahamas",
      link: "https://maps.google.com",
    },
    {
      icon: MessageSquare,
      title: "Social Media",
      content: "Connect @KemisDigital",
      link: "#",
    },
  ];

  return (
    <div>
      <Hero
        title="Contact KemisDigital"
        description="Get in touch with our AI marketing experts to transform your digital presence and drive exceptional results."
        showCTA={false}
      />

      <div className="container mx-auto py-12">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactReasons.map((reason) => (
            <Card key={reason.title}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <reason.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

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
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interest</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ai-strategy">AI Marketing Strategy</SelectItem>
                            <SelectItem value="automation">Marketing Automation</SelectItem>
                            <SelectItem value="analytics">AI Analytics & Insights</SelectItem>
                            <SelectItem value="content">AI Content Generation</SelectItem>
                            <SelectItem value="social">Social Media AI</SelectItem>
                            <SelectItem value="other">Other Services</SelectItem>
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
                            placeholder="Tell us about your AI marketing needs..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">or</p>
                      <CalendarWidget />
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {contactInfo.map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <item.icon className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <a
                        href={item.link}
                        className="text-gray-600 hover:text-purple-600 transition-colors"
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
    </div>
  );
}
