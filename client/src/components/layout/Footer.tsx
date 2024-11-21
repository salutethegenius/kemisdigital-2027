import { Link } from "wouter";

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI Marketing", href: "/services#ai-marketing" },
      { name: "Content Creation", href: "/services#content" },
      { name: "Analytics", href: "/services#analytics" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "AI Tools", href: "/resources#ai-tools" },
      { name: "Marketing Tools", href: "/resources#marketing-tools" },
      { name: "Documentation", href: "/resources" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Get in Touch", href: "/contact" },
      { name: "Support", href: "/support" },
      { name: "Schedule Demo", href: "/demo" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KemisDigital AI Marketing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
