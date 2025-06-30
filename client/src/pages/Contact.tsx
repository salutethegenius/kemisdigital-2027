import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Brain, Target, LineChart, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

import Hero from "../components/shared/Hero";
import CalendarWidget from "../components/shared/CalendarWidget";
import { useToast } from "../hooks/use-toast";
import { staggerChildren } from "../lib/animations";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to send message');
      }

      toast({
        title: "Success",
        description: "Message sent successfully!",
      });

      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem sending your message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <Header />
      <Hero
        title="Contact KemisDigital"
        description="Get in touch with our AI marketing experts to transform your digital presence and achieve exceptional results."
        showCTA={false}
        pageContext="tourism"
      />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Contact KemisDigital</h2>
            <p className="text-xl text-muted-foreground">
              Get in touch with our AI marketing experts to transform your digital presence and achieve exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <motion.div 
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-6 h-6 text-[#00A0E3] mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">info@kemisdigital.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Phone className="w-6 h-6 text-[#00A0E3] mt-1" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">+1 (242) 447-9692</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MapPin className="w-6 h-6 text-[#00A0E3] mt-1" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-muted-foreground">Nassau, Bahamas</p>
                  </div>
                </motion.div>
              </motion.div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Our Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <Sparkles className="w-5 h-5 text-[#F7BE00]" />
                    <span>AI Marketing Strategy</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <MessageSquare className="w-5 h-5 text-[#F7BE00]" />
                    <span>AI Content Generation</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <Brain className="w-5 h-5 text-[#F7BE00]" />
                    <span>Marketing Automation</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <Target className="w-5 h-5 text-[#F7BE00]" />
                    <span>AI for Social Media</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <LineChart className="w-5 h-5 text-[#F7BE00]" />
                    <span>AI Analytics & Insights</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="overflow-hidden dark:bg-[#002333]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F7BE00]">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                              />
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
                            <FormLabel className="text-[#F7BE00]">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="you@email.com" 
                                {...field}
                              />
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
                            <FormLabel className="text-[#F7BE00]">Service Interest</FormLabel>
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
                                <SelectItem value="ai_strategy">AI Marketing Strategy</SelectItem>
                                <SelectItem value="automation">Marketing Automation</SelectItem>
                                <SelectItem value="analytics">AI Analytics & Insights</SelectItem>
                                <SelectItem value="content">AI Content Generation</SelectItem>
                                <SelectItem value="social">AI for Social Media</SelectItem>
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
                            <FormLabel className="text-[#F7BE00]">Message</FormLabel>
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

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full bg-[#00A0E3] hover:bg-[#0085BC] text-white"
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}