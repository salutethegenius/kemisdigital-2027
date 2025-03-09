import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t('footer.company'),
      links: [
        { name: t('header.about'), href: "/about" },
        { name: t('header.services'), href: "/services" },
        { name: t('header.latest_news'), href: "/latest-news" },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { name: t('header.ai_labs'), href: "/services#ai-marketing" },
        { name: t('footer.web_development'), href: "/services/web-development" },
        { name: t('footer.analytics'), href: "/services/analytics-dashboards" },
      ],
    },
    {
      title: t('footer.quick_links'),
      links: [
        { name: t('header.resources'), href: "/resources" },
        { name: t('header.events'), href: "/events" },
        { name: t('header.membership'), href: "/membership" },
      ],
    },
    {
      title: t('header.contact'),
      links: [
        { name: t('header.contact'), href: "/contact" },
        { name: t('footer.support'), href: "/contact" },
        { name: t('footer.schedule_demo'), href: "/meet" },
      ],
    },
  ];

  return (
    <footer className="bg-[#001621] text-gray-100 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-[#F7BE00]">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#00A0E3] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
