import { Link } from "wouter";

const footerSections = [
  {
    title: "About BDMA",
    links: [
      { name: "Our Mission", href: "/about#mission" },
      { name: "Leadership", href: "/about#leadership" },
      { name: "Partners", href: "/about#partners" },
    ],
  },
  {
    title: "Membership",
    links: [
      { name: "Join BDMA", href: "/membership" },
      { name: "Member Directory", href: "/membership#directory" },
      { name: "Member Benefits", href: "/membership#benefits" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/resources#blog" },
      { name: "Webinars", href: "/resources#webinars" },
      { name: "Certifications", href: "/resources#certifications" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Get in Touch", href: "/contact" },
      { name: "Sponsorship", href: "/contact#sponsorship" },
      { name: "Support", href: "/contact#support" },
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
                      className="text-gray-400 hover:text-cyan-500 transition-colors"
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
          <p>&copy; 2024-25 Bahamas Digital Marketing Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
