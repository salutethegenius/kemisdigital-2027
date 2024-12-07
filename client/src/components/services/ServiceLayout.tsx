import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";
import Hero from "@/components/shared/Hero";

interface Feature {
  title: string;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
}

interface ServiceLayoutProps {
  title: string;
  description: string;
  features: Feature[];
  benefits: Benefit[];
  technologies: string[];
  integrations: string[];
  pricing: {
    startingAt: string;
    description: string;
  };
  caseStudy?: {
    title: string;
    description: string;
    results: string[];
  };
}

export default function ServiceLayout({
  title,
  description,
  features,
  benefits,
  technologies,
  integrations,
  pricing,
  caseStudy,
}: ServiceLayoutProps) {
  return (
    <div>
      <Hero
        title={title}
        description={description}
        showCTA={false}
      />

      <div className="container mx-auto py-12">
        <Link href="/services">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </Link>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {/* Features Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Technologies & Integrations */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Technologies</h2>
                <ul className="list-disc list-inside space-y-2">
                  {technologies.map((tech, index) => (
                    <li key={index} className="text-muted-foreground">{tech}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Integrations</h2>
                <ul className="list-disc list-inside space-y-2">
                  {integrations.map((integration, index) => (
                    <li key={index} className="text-muted-foreground">{integration}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Case Study Section */}
          {caseStudy && (
            <section>
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Case Study: {caseStudy.title}</h2>
                  <p className="text-muted-foreground mb-4">{caseStudy.description}</p>
                  <h3 className="text-xl font-semibold mb-2">Results</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {caseStudy.results.map((result, index) => (
                      <li key={index} className="text-muted-foreground">{result}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Pricing Section */}
          <section>
            <Card>
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Investment</h2>
                <p className="text-3xl font-bold text-purple-600 mb-2">
                  Starting at {pricing.startingAt}
                </p>
                <p className="text-muted-foreground mb-6">{pricing.description}</p>
                <Link href="/contact">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Request Consultation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
