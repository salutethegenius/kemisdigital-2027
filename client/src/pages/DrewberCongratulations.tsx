
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle, Trophy, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { fadeIn, staggerChildren } from "@/lib/animations";
import smartBlackBookPDF from "@/assets/The Smart Black Book Of Digital Marketing_ Breaking It Down For Small Business Owners (1).pdf";

export default function DrewberCongratulations() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = smartBlackBookPDF;
    link.download = 'The Smart Black Book Of Digital Marketing.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-[#00A0E3]/5 via-background to-[#F7BE00]/5">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header Section */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#00A0E3] to-[#F7BE00] mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#00A0E3] to-[#F7BE00] bg-clip-text text-transparent">
              Congratulations!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Ready to Take Your Digital Footprint to the Next Level?
            </p>
          </motion.div>

          {/* Event Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Badge variant="outline" className="text-lg px-6 py-2 border-[#00A0E3] text-[#00A0E3]">
              <Sparkles className="w-4 h-4 mr-2" />
              Drewber Solutions Group 1st Company Retreat - July 25th, 2025
            </Badge>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <Card className="border-2 border-[#00A0E3]/20 shadow-2xl bg-transparent">
              <CardContent className="p-8 md:p-12">
                <motion.div
                  variants={fadeIn}
                  className="flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  <h2 className="text-2xl md:text-3xl font-bold">You're In!</h2>
                </motion.div>

                <motion.p
                  variants={fadeIn}
                  className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
                >
                  Thank you for attending Cortney McDonald's presentation on "Taking Your Digital Media Footprint to the Next Level" at Margaritaville Beach Resort. As promised, here's your exclusive access to valuable digital marketing resources.
                </motion.p>

                {/* Free Resource Offer */}
                <motion.div
                  variants={fadeIn}
                  className="rounded-lg p-8 mb-8"
                >
                  <h3 className="text-2xl font-bold mb-4">🎁 Exclusive Free Access</h3>
                  <h4 className="text-xl font-semibold text-[#00A0E3] mb-4">
                    The Smart Black Book Of Digital Marketing
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    A comprehensive guide packed with proven strategies, insider tips, and actionable insights to transform your digital presence and accelerate your business growth.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Digital Strategy Framework</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Social Media Blueprints</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>ROI Optimization Tactics</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleDownload}
                    size="lg"
                    className="bg-gradient-to-r from-[#00A0E3] to-[#F7BE00] hover:from-[#00A0E3]/90 hover:to-[#F7BE00]/90 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Get Your Free Limited Access
                  </Button>
                </motion.div>

                {/* Additional Value */}
                <motion.div
                  variants={fadeIn}
                  className="border-t pt-8"
                >
                  <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="font-semibold text-[#00A0E3] mb-2">🚀 Ready to Implement?</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect with KemisDigital for personalized digital marketing strategies tailored to your business goals.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#00A0E3] mb-2">📈 Need Expert Guidance?</h4>
                      <p className="text-sm text-muted-foreground">
                        Schedule a consultation to discuss how we can elevate your digital presence in the Caribbean market.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                  variants={fadeIn}
                  className="mt-8 p-6 rounded-lg"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    Questions about the content or need personalized digital marketing support?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" asChild>
                      <a href="/contact">Get In Touch</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/services">Explore Our Services</a>
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-muted-foreground">
              Thank you for being part of Drewber Solutions Group's journey. 
              <br />
              <span className="text-[#00A0E3] font-medium">Let's build the future of digital business together.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
