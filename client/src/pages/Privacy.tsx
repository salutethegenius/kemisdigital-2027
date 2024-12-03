import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <Card>
          <CardContent className="prose dark:prose-invert max-w-none p-6">
            <p className="text-muted-foreground mb-6">Effective Date: January 1st, 2025</p>
            
            <p className="mb-6">
              At KemisDigital, your privacy is a top priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website, services, and digital tools.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Name, email address, phone number, and other contact details</li>
              <li>Billing and payment information when purchasing our services</li>
              <li>Login credentials for your account</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Non-Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Browser type, IP address, device information, and operating system</li>
              <li>Cookies and analytics data to track website usage patterns</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">1.3 Third-Party Data</h3>
            <p className="mb-6">
              If you integrate third-party services with our tools, we may collect data from those services, such as social media accounts or email marketing platforms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize user experiences on our platform</li>
              <li>Communicate about updates, promotions, and support</li>
              <li>Process payments and manage accounts</li>
              <li>Analyze usage trends to enhance functionality</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Share Your Information</h2>
            <p className="mb-4">We do not sell your personal information. However, we may share your information under the following circumstances:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Service Providers: With trusted third-party vendors who assist in delivering our services</li>
              <li>Legal Obligations: If required by law, court order, or to protect our rights</li>
              <li>Business Transfers: In case of a merger, acquisition, or asset sale, your data may be transferred to the new entity</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Rights and Choices</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access and Correction: Request access to or correction of your data</li>
              <li>Opt-Out: Unsubscribe from marketing communications at any time</li>
              <li>Data Deletion: Request the deletion of your account and personal data, subject to legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction. However, no method of transmission or storage is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="mb-6">
              We use cookies to enhance your browsing experience. You can manage your cookie preferences through your browser settings. Note that disabling cookies may affect site functionality.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Links</h2>
            <p className="mb-6">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of these sites and encourage you to review their policies.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p className="mb-6">
              KemisDigital's services are not directed to individuals under 18. We do not knowingly collect personal data from children.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Users</h2>
            <p className="mb-6">
              By using our services, you consent to your data being transferred to and processed in the Bahamas, where KemisDigital operates.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. Changes will be posted on this page, and the "Effective Date" will be updated accordingly.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
            <p className="mb-6">
              If you have any questions or concerns about this Privacy Policy or your data, please contact us at:
            </p>
            <div className="pl-6">
              <p>KemisDigital</p>
              <p>support@kemisdigital.com</p>
              <p>+1 (242) 605-1522</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
