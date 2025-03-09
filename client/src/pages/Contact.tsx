import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Brain, Target, LineChart, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
        title: t('contact.success_message'),
        description: t('contact.form.success_description'),
      });

      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        variant: "destructive",
        title: t('contact.form.error_title'),
        description: error instanceof Error ? error.message : t('contact.form.error_description'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  const contactReasons = [
    {
      icon: Brain,
      title: t('contact.reasons.consultation'),
      description: t('contact.reasons.consultation_desc')
    },
    {
      icon: Target,
      title: t('contact.reasons.partnership'),
      description: t('contact.reasons.partnership_desc')
    },
    {
      icon: LineChart,
      title: t('contact.reasons.inquiries'),
      description: t('contact.reasons.inquiries_desc')
    },
    {
      icon: Sparkles,
      title: t('contact.reasons.support'),
      description: t('contact.reasons.support_desc')
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      content: "frontdesk@kemisdigital.com",
      link: "mailto:frontdesk@kemisdigital.com",
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: "+1 (242) 605-1522",
      link: "tel:+12426051522",
    },
    {
      icon: MapPin,
      title: t('contact.address_label'),
      content: t('contact.address'),
      link: "https://maps.google.com",
    },
    {
      icon: MessageSquare,
      title: t('contact.social'),
      content: t('contact.social_handle'),
      link: "#",
    },
  ];

  return (
    <div>
      <Hero
        title={t('contact.title')}
        description={t('contact.description')}
        showCTA={false}
        pageContext="tourism"
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
                  <reason.icon className="w-12 h-12 text-[#00A0E3] mb-4" />
                  <h3 className="font-semibold mb-2 text-[#F7BE00]">{reason.title}</h3>
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
              <h2 className="text-2xl font-bold mb-6 text-[#00A0E3]">{t('contact.form.title')}</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#F7BE00]">{t('contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.name_placeholder')} {...field} />
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
                        <FormLabel className="text-[#F7BE00]">{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.email_placeholder')} {...field} />
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
                        <FormLabel className="text-[#F7BE00]">{t('contact.form.service')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[#00A0E3] focus:ring-[#00A0E3]">
                              <SelectValue placeholder={t('contact.form.service_placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ai-strategy">{t('contact.form.services.ai_strategy')}</SelectItem>
                            <SelectItem value="automation">{t('contact.form.services.automation')}</SelectItem>
                            <SelectItem value="analytics">{t('contact.form.services.analytics')}</SelectItem>
                            <SelectItem value="content">{t('contact.form.services.content')}</SelectItem>
                            <SelectItem value="social">{t('contact.form.services.social')}</SelectItem>
                            <SelectItem value="other">{t('contact.form.services.other')}</SelectItem>
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
                        <FormLabel className="text-[#F7BE00]">{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contact.form.message_placeholder')}
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
                      className="w-full bg-[#00A0E3] hover:bg-[#0085BC] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? t('contact.form.sending') : t('contact.form.submit')}
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">{t('contact.form.or')}</p>
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
                    <item.icon className="w-6 h-6 text-[#00A0E3]" />
                    <div>
                      <h3 className="font-semibold text-[#F7BE00]">{item.title}</h3>
                      <a
                        href={item.link}
                        className="text-gray-600 hover:text-[#00A0E3] transition-colors"
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
