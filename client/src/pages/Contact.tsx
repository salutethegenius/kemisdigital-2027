import Hero from "@/components/shared/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageSquare, Brain, Target, LineChart, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
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
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
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
useEffect(() => {
  console.log('EmailJS Config:', {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ? 'Present' : 'Missing',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? 'Present' : 'Missing',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing'
  });
}, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      console.log('Sending email...');
      const response = await fetch(`${API_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Server error');
      }

      const data = await response.json();
      console.log('Server response:', data);
      
      toast({
        title: "Success",
        description: "Thank you, we will be in touch soon!",
      });

      form.reset();
    } catch (error) {
      console.error('Error sending email:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof TypeError ? 'Network error' : 'Other error',
        values // Log form values for debugging
      });
      
      const errorMessage = error instanceof TypeError 
        ? 'Network error. Please check your connection and try again.'
        : error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again later.';

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
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

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
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
