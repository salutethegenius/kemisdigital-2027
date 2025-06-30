import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";
import Hero from "@/components/shared/Hero";
import SEOHelmet from "@/components/shared/SEOHelmet";
import StaticPaymentModal from "@/components/payment/StaticPaymentModal";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * PaymentSolutions Component
 * 
 * Displays available payment processing solutions and pricing with Stripe integration
 * for customer subscription plans and payment processing options.
 */
const PaymentSolutions = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');

  /**
   * Handle plan selection and open payment modal
   * @param plan - The selected plan type ('basic' or 'premium')
   */
  const handlePlanSelect = (plan: 'basic' | 'premium') => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };



  return (
    <div className="pt-16">
      <Header />
      <SEOHelmet
          title="Payment Solutions | KemisDigital"
          description="Start accepting online payments in The Bahamas with Kemis Digital and Stripe. Simplify transactions with our Stripe integration."
          keywords="payment processing, Bahamas, Stripe, financial services, transaction processing, online payments"
        />
        <Hero
          title="Start Accepting Online Payments in The Bahamas!"
          description="Get Your Stripe Account Set Up with Kemis Digital"
          showCTA={false}
          pageContext="tourism"
        />
        

        
        <div className="container mx-auto px-4 py-12">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <div className="mb-12 text-center">
              <p className="text-xl mb-8">Are you a business owner in The Bahamas struggling to accept online payments? Many local businesses don't have access to Stripe or other payment solutions—but we can help!</p>
              <p className="text-xl font-semibold mb-8">At <span className="text-[#00A0E3]">Kemis Digital</span>, we make it <span className="font-bold">easy</span> for you to start selling online with Stripe. No complicated setup. No stress. Just simple, secure payment processing.</p>
            </div>

            {/* The Challenge Section */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">The Challenge: Why Selling Online is Hard in The Bahamas</h3>
              <p className="mb-4">Many business owners in The Bahamas face big challenges when trying to accept online payments:</p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 font-bold">❌</span>
                  <span><span className="font-bold">Limited Payment Options</span> – Most local banks don't offer easy online payment solutions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 font-bold">❌</span>
                  <span><span className="font-bold">High Fees & Restrictions</span> – Some international services are costly or hard to access.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 font-bold">❌</span>
                  <span><span className="font-bold">Lost Sales</span> – Customers want the convenience of paying online, but without the right tools, they take their business elsewhere.</span>
                </li>
              </ul>
            </Card>

            {/* The Solution Section */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">The Solution: Stripe + Kemis Digital</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✅</span>
                  <span><span className="font-bold">We help you set up your Stripe account</span> – No technical skills needed!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✅</span>
                  <span><span className="font-bold">We connect Stripe to your business</span> – Get paid directly to your bank account.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✅</span>
                  <span><span className="font-bold">We set up your online checkout</span> – Sell products or services with ease.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✅</span>
                  <span><span className="font-bold">We provide support</span> – If you need help, we're here for you.</span>
                </li>
              </ul>
            </Card>

            {/* ITIN Section */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">No Social Security Number (SSN)? No Worries!</h3>
              <p className="mb-4">One of the biggest reasons Bahamians struggle to use Stripe is the requirement for a <span className="font-bold">tax identification number</span>. But guess what? <span className="font-bold">We can help you get set up with an Individual Taxpayer Identification Number (ITIN)!</span></p>
              
              <p className="mb-4">An <span className="font-bold">ITIN</span> is used for tax reporting and is accepted by Stripe for account creation. This is especially useful for:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><span className="font-bold">Non-U.S. residents</span> who need to process payments.</li>
                <li><span className="font-bold">Foreign nationals</span> who must file U.S. tax returns.</li>
                <li><span className="font-bold">Individuals who aren't eligible for a Social Security Number (SSN)</span> but still need to comply with U.S. tax laws.</li>
              </ul>
              
              <h4 className="text-xl font-semibold mb-4">Why is an ITIN important for Stripe?</h4>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✅</span>
                  <span>Stripe <span className="font-bold">accepts ITINs</span> as a valid tax ID for setting up accounts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✅</span>
                  <span>Essential for <span className="font-bold">freelancers, contractors, and international sellers</span>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✅</span>
                  <span>Ensures you meet <span className="font-bold">U.S. tax compliance</span> and avoid account restrictions.</span>
                </li>
              </ul>
              
              <p className="font-semibold">We <span className="font-bold">take care of the entire ITIN process</span> for you or provide guidance if you'd like to apply on your own. No more barriers—just a <span className="font-bold">smooth and legal</span> way to start accepting payments online!</p>
            </Card>

            {/* How Stripe Works */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">How Stripe Works for You</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="font-bold">Funds are stored in your Stripe account</span> until you <span className="font-bold">add a debit card or bank account</span> to withdraw.</li>
                <li>You have full control over your money—transfer it whenever you're ready.</li>
                <li>Stripe provides secure transactions, fraud protection, and easy financial tracking.</li>
              </ul>
            </Card>

            {/* Pros & Cons */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">Pros & Cons of Using Stripe</h3>
              
              <h4 className="text-xl font-semibold mb-4">✅ Pros:</h4>
              <ul className="space-y-2 mb-6 pl-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>Accept credit/debit card payments from customers worldwide.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>Get paid faster and grow your business online.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>No need for a foreign bank account—your money stays with you.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span>Stripe is secure, reliable, and easy to use.</span>
                </li>
              </ul>
              
              <h4 className="text-xl font-semibold mb-4">❌ Cons:</h4>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✖</span>
                  <span>Requires an internet connection to manage transactions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✖</span>
                  <span>Stripe charges a small transaction fee per payment.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✖</span>
                  <span>You need to link a debit card or bank account to withdraw funds.</span>
                </li>
              </ul>
            </Card>

            {/* Setup Fee Section */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">Affordable One-Time Setup Fee – No Monthly Charges!</h3>
              <p className="mb-4">We believe in keeping things simple and affordable. That's why we charge a one-time setup fee of <span className="font-bold text-xl">$97</span>—no monthly fees!</p>
              
              <h4 className="text-xl font-semibold mb-4">What's Included in Your Setup Fee?</h4>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="mr-2">💳</span>
                  <span><span className="font-bold">Stripe Account Creation & Configuration</span> – We handle all the setup for you.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📊</span>
                  <span><span className="font-bold">Dashboard Access & Training</span> – Learn how to manage payments with ease.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔗</span>
                  <span><span className="font-bold">Integration Support (if needed)</span> – Connect Stripe to your website or social media.</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-[#00A0E3] hover:bg-[#0085bb] mt-4"
                onClick={() => handlePlanSelect('basic')}
              >
                Get Started Now
              </Button>
            </Card>

            {/* Transaction & Transfer Fees */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">Transaction & Transfer Fees</h3>
              
              <div className="flex items-center mb-6">
                <span className="mr-2 text-xl">💰</span>
                <div>
                  <span className="font-bold">Payment Processing Fee</span> – 6.5% per transaction (includes Stripe fee + Kemis service fee)
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <span className="mr-2 text-xl">💵</span>
                <div>
                  <p className="font-bold mb-2">Funds Transfer Options:</p>
                  <ul className="space-y-2 pl-4">
                    <li><span className="font-bold">Standard Transfer (3-5 business days):</span> $40 per transfer</li>
                    <li><span className="font-bold">Express Transfer (1-2 business days):</span> $55 per transfer</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Volume Discounts */}
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-6 text-[#00A0E3] dark:text-[#00A0E3]">Volume Discounts for Large Transactions</h3>
              <p className="mb-4">If your business processes high volumes, you'll enjoy lower fees:</p>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">🔹</span>
                  <span><span className="font-bold">$10,000+ monthly:</span> 6.25% processing fee</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">🔹</span>
                  <span><span className="font-bold">$25,000+ monthly:</span> 6% processing fee</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">🔹</span>
                  <span><span className="font-bold">$50,000+ monthly:</span> 5.75% processing fee</span>
                </li>
              </ul>
            </Card>

            {/* Call to Action */}
            <Card className="p-8 bg-gradient-to-r from-[#0085bb] to-[#00A0E3] text-white">
              <h3 className="text-2xl font-semibold mb-6">Start Selling Online Today!</h3>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-white mr-2">🔹</span>
                  <span>Take credit card payments from customers worldwide.</span>
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">🔹</span>
                  <span>Get paid faster and grow your business online.</span>
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">🔹</span>
                  <span>No need for a foreign bank account—your money goes straight to you!</span>
                </li>
              </ul>
              
              <div className="text-center">
                <h4 className="text-xl font-bold mb-4">🚀 Ready to get started?</h4>
                <Button 
                  className="w-full bg-white text-[#00A0E3] hover:bg-gray-100"
                  onClick={() => handlePlanSelect('basic')}
                >
                  Contact Us Today
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
        
        <Footer />
        
        {/* Payment Modal */}
        <StaticPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          selectedPlan={selectedPlan}
        />
    </div>
  );
};

export default PaymentSolutions;
