import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/shared/SEO";
import kennethImage from '@/assets/kenneth-moncur-founder.jpeg';

export default function PressReleaseKemisDigital() {
  return (
    <>
      <SEO 
        title="KemisDigital Revolutionizes Digital Marketing for Bahamian Businesses" 
        description="Kenneth Moncur, founder and CEO of KemisDigital, transforms digital marketing for small businesses in the Bahamas with AI-powered strategies and automation."
        keywords="KemisDigital, Kenneth Moncur, Bahamas digital marketing, AI marketing, small business, tourism, NGO, digital transformation, ROI analytics"
        ogUrl="/news/kemisdigital-revolutionizes-digital-marketing"
      />
      <div className="container mx-auto px-4 py-12">
        <Link href="/latest-news">
          <div className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Latest News
          </div>
        </Link>

        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="mb-6">
                <Badge className="mb-2" variant="secondary">Press Release</Badge>
                <h1 className="text-3xl font-bold mb-2">KemisDigital Revolutionizes Digital Marketing for Bahamian SBs & SMEs</h1>
                <p className="text-muted-foreground">March 6, 2025</p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="font-semibold">Nassau, Bahamas -- Thanks to KemisDigital, small businesses (SBs), including small and medium enterprises (SMEs), can stay connected to their customers and be ahead in the marketplace with the array of transformational digital services.</p>

                <div className="flex flex-col md:flex-row md:items-center gap-6 my-6">
                  <img 
                    src={kennethImage} 
                    alt="Kenneth Moncur, Founder and CEO of KemisDigital" 
                    className="rounded-lg object-cover w-full md:w-1/3 h-auto shadow-md"
                  />
                  <div>
                    <p>Kenneth Moncur calls The Bahamas home, where he started his agency journey twenty years ago, as Kemis.net. His focus has been on Bahamian businesses. Since then, he has kept pace with the ever-changing technology and expanded his services, which today involve artificial intelligence (AI) to enhance marketing strategy and execution, including seamless automation.</p>
                  </div>
                </div>
                
                <blockquote className="border-l-4 border-purple-500 pl-4 italic my-6">
                  "We've launched KemisDigital.com for our KemisDigital AI marketing firm that is focused on increasing digital sales, geared towards the tourism and NGO sectors and releasing the KemisEMAIL online store at kemis.net," said Moncur.
                </blockquote>

                <p>KemisDigital offers progressive digital marketing strategies, digital sales and web/software development services. Their customer retention is commendable, and they are proud of their track record that include more than double ROI analytics results. Their KemisEmail program has grown significantly in 20 years and continues to be an avenue to promote deals, offers, or announcements. Curated lists reach the chosen target audiences.</p>

                <p>"We've created options to help business owners work at their pace and budget, as well as automation like email marketing, social media, and customer support. Additionally, we're proud of hyper-personalisation like tailored marketing campaigns for deeper customer engagement and increasing ROI and online engagement."</p>

                <h3 className="text-xl font-semibold mt-8 mb-4">Client Success Stories</h3>

                <p>Scharad M Lightbourne, an award-winning portrait and lifestyle photographer, returned to KemisDigital for his seasonal professional headshots campaign, this time receiving superior results. "I've done these events with Kemis before, and he developed some amazing strategies and creative marketing ideas. He helped push this event to the point where we literally sold out in a week," stated Lightbourne.</p>

                <p>KemisDigital set up the photographer's landing page, used AI to enhance marketing strategy and execution, and facilitated all automation, such as a booking calendar, response emails, and the payment platform. The tools also gathered data and customer analytics and shared ROI (return on investment) information for the client.</p>

                <h3 className="text-xl font-semibold mt-8 mb-4">Current Offerings</h3>

                <p>The digital agency is currently running a landing page special, which you can learn more about at <span className="text-purple-600">www.lightning.kemisdigital.com</span>. The founder is passionate about sharing knowledge through "The Bahamas Digital Marketing Association," a platform geared towards digitisation in the local SBs, SMEs and NGO sectors.</p>

                <p>Kemis Group of Companies is more than a marketing corporation - its companies support moving forward with innovation, community engagement, and digitalisation for Bahamian businesses. Registered in The Bahamas, USA, and Europe, they offer e-commerce solutions like Stripe payment and automated marketing that help keep their clients on the cutting edge of technology and ease of doing business with customers. They can process credit cards for small Bahamian companies and professionals via Stripe.</p>

                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2">Media Contact:</h4>
                  <p>Azaleta Ishmael-Newry</p>
                  <p>242-557-0981</p>
                  <p>azaleta@azaletaandco.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
