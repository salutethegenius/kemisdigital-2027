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
import { Card, CardContent } from "@/components/ui/card";

// Import sound components
import { useSound } from "@/hooks/use-sound-effects";
import { SoundButton } from "@/components/ui/sound-button";

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
  const { play } = useSound();

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

      // Play success sound on successful submission
      play("success");
      
      toast({
        title: t('contact.form.success_title'),
        description: t('contact.form.success_message'),
      });
      
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: t('contact.form.error_title'),
        description: error instanceof Error ? error.message : t('contact.form.error_message'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleFieldFocus = () => {
    play("hover");
  };

  return (
    <div className="min-h-screen">
      <Hero
        title={t('contact.hero.title')}
        description={t('contact.hero.description')}
        showCTA={false}
      />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('contact.contact_info.title')}</h3>
              
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
                    <h4 className="font-medium">{t('contact.contact_info.email_title')}</h4>
                    <p className="text-muted-foreground">{t('contact.contact_info.email')}</p>
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
                    <h4 className="font-medium">{t('contact.contact_info.phone_title')}</h4>
                    <p className="text-muted-foreground">{t('contact.contact_info.phone')}</p>
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
                    <h4 className="font-medium">{t('contact.contact_info.address_title')}</h4>
                    <p className="text-muted-foreground">{t('contact.contact_info.address')}</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">{t('contact.services.title')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <Sparkles className="w-5 h-5 text-[#F7BE00]" />
                    <span>{t('contact.services.ai')}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <MessageSquare className="w-5 h-5 text-[#F7BE00]" />
                    <span>{t('contact.services.consulting')}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <Brain className="w-5 h-5 text-[#F7BE00]" />
                    <span>{t('contact.services.strategy')}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <Target className="w-5 h-5 text-[#F7BE00]" />
                    <span>{t('contact.services.marketing')}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <LineChart className="w-5 h-5 text-[#F7BE00]" />
                    <span>{t('contact.services.analytics')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="overflow-hidden dark:bg-[#002333]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F7BE00]">{t('contact.form.name')}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t('contact.form.name_placeholder')} 
                                {...field} 
                                onFocus={handleFieldFocus}
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
                            <FormLabel className="text-[#F7BE00]">{t('contact.form.email')}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t('contact.form.email_placeholder')} 
                                {...field} 
                                onFocus={handleFieldFocus}
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
                            <FormLabel className="text-[#F7BE00]">{t('contact.form.service')}</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              onOpenChange={() => play("hover")}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t('contact.form.service_placeholder')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ai_integration">{t('contact.form.services.ai')}</SelectItem>
                                <SelectItem value="consulting">{t('contact.form.services.consulting')}</SelectItem>
                                <SelectItem value="marketing">{t('contact.form.services.marketing')}</SelectItem>
                                <SelectItem value="analytics">{t('contact.form.services.analytics')}</SelectItem>
                                <SelectItem value="web_development">{t('contact.form.services.web')}</SelectItem>
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
                                onFocus={handleFieldFocus}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <SoundButton 
                          type="submit" 
                          className="w-full bg-[#00A0E3] hover:bg-[#0085BC] text-white"
                          disabled={isLoading}
                          soundEffect="click"
                        >
                          {isLoading ? t('contact.form.sending') : t('contact.form.submit')}
                        </SoundButton>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">{t('contact.form.or')}</p>
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
    </div>
  );
}
