import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";

const PaymentSolutions = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Kemis/Stripe Payment Processing Solutions</h1>
        <h2 className="text-2xl text-center mb-12 text-muted-foreground">Service Packages for Bahamian Businesses</h2>

        {/* Initial Setup Section */}
        <Card className="p-6 mb-8 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Initial Setup Fees</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Account Creation & Configuration</span>
              <span className="font-semibold">$250</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Dashboard Access Setup & Training</span>
              <span className="font-semibold">$150</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Integration Support (if needed)</span>
              <span className="font-semibold">$200</span>
            </li>
            <li className="flex justify-between items-center pt-2 border-t">
              <span className="font-bold">Total Setup</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">$600</span>
            </li>
          </ul>
        </Card>

        {/* Transaction Fees Section */}
        <Card className="p-6 mb-8 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Transaction Fees</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Payment Processing</span>
              <span className="font-semibold">6.5% per transaction</span>
            </div>
            <div className="pl-4 text-muted-foreground">
              <p>• Includes: Stripe base fee + Kemis service fee</p>
              <p>• Example: On a $1,000 transaction, fee would be $65</p>
            </div>
          </div>
        </Card>

        {/* Funds Transfer Services Section */}
        <Card className="p-6 mb-8 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-6 text-purple-600 dark:text-purple-400">Funds Transfer Services</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Standard Transfer</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Processing Time</span>
                  <span>3-5 business days</span>
                </li>
                <li className="flex justify-between">
                  <span>Wire Transfer Fee (Bank)</span>
                  <span>$25</span>
                </li>
                <li className="flex justify-between">
                  <span>Service Facilitation Fee</span>
                  <span>$15</span>
                </li>
                <li className="flex justify-between pt-2 border-t">
                  <span className="font-bold">Total Per Transfer</span>
                  <span className="font-bold">$40</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Express Transfer (Priority)</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Processing Time</span>
                  <span>1-2 business days</span>
                </li>
                <li className="flex justify-between">
                  <span>Wire Transfer Fee (Bank)</span>
                  <span>$25</span>
                </li>
                <li className="flex justify-between">
                  <span>Priority Service Fee</span>
                  <span>$30</span>
                </li>
                <li className="flex justify-between pt-2 border-t">
                  <span className="font-bold">Total Per Transfer</span>
                  <span className="font-bold">$55</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Monthly Plans Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-purple-400">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Basic Plan</h3>
            <div className="text-3xl font-bold mb-4">$49/month</div>
            <ul className="space-y-2 mb-6">
              <li>✓ Dashboard access</li>
              <li>✓ Basic reporting</li>
              <li>✓ Email support</li>
            </ul>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Select Basic Plan</Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-purple-400">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Premium Plan</h3>
            <div className="text-3xl font-bold mb-4">$99/month</div>
            <ul className="space-y-2 mb-6">
              <li>✓ Advanced reporting</li>
              <li>✓ Priority support</li>
              <li>✓ Monthly account review</li>
              <li>✓ Chargeback assistance</li>
            </ul>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Select Premium Plan</Button>
          </Card>
        </div>

        {/* Additional Services Section */}
        <Card className="p-6 mb-8 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Additional Services</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Custom Integration Support</span>
              <span className="font-semibold">$100/hour</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Additional Training Sessions</span>
              <span className="font-semibold">$75/hour</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Dispute Management</span>
              <span className="font-semibold">$25 per case</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Account Audit & Optimization</span>
              <span className="font-semibold">$200</span>
            </li>
          </ul>
        </Card>

        {/* Volume Discounts Section */}
        <Card className="p-6 mb-8 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Volume Discounts</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>$10,000+ monthly</span>
              <span className="font-semibold">6.25% processing fee</span>
            </li>
            <li className="flex justify-between items-center">
              <span>$25,000+ monthly</span>
              <span className="font-semibold">6% processing fee</span>
            </li>
            <li className="flex justify-between items-center">
              <span>$50,000+ monthly</span>
              <span className="font-semibold">5.75% processing fee</span>
            </li>
          </ul>
        </Card>

        {/* Terms Section */}
        <Card className="p-6">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Terms & Conditions</h3>
          <ul className="space-y-2">
            <li>• All fees are in USD</li>
            <li>• Setup fees due before account activation</li>
            <li>• Transaction fees deducted automatically</li>
            <li>• Transfer fees deducted from transfer amount</li>
            <li>• Monthly fees billed on the 1st of each month</li>
            <li>• 30-day notice required for service cancellation</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSolutions;