import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function DataDeletion() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      // Here we would implement the actual data deletion request
      // For now, we'll just show a success message
      
      toast({
        title: "Request Submitted",
        description: "Your data deletion request has been received. We will process it within 30 days.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Data Deletion Request</h1>
          
          <Card>
            <CardHeader>
              <p className="text-lg text-muted-foreground">
                At KemisDigital, we respect your privacy and are committed to protecting your personal information. 
                If you wish to delete your personal data associated with your Facebook account, please complete the form below.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Process Overview</h2>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Submit your request using the form below</li>
                    <li>We'll verify your identity to ensure data security</li>
                    <li>Your request will be processed within 30 days</li>
                    <li>You'll receive a confirmation email once completed</li>
                  </ol>
                </section>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="facebookId" className="block text-sm font-medium mb-2">
                        Facebook User ID (optional)
                      </label>
                      <Input
                        id="facebookId"
                        name="facebookId"
                        placeholder="Your Facebook User ID"
                      />
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium mb-2">
                        Reason for Data Deletion (optional)
                      </label>
                      <Textarea
                        id="reason"
                        name="reason"
                        placeholder="Please let us know why you're requesting data deletion"
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>

                <div className="text-sm text-muted-foreground">
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p>
                    If you encounter any issues with the form or have questions about the data deletion process,
                    please contact us at{" "}
                    <a 
                      href="mailto:support@kemisdigital.com" 
                      className="text-primary hover:underline"
                    >
                      support@kemisdigital.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Toaster />
    </>
  );
}
