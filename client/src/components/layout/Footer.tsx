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
        { name: t('header.advocacy'), href: "/advocacy" },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { name: t('header.membership'), href: "/membership" },
        { name: t('footer.web_development'), href: "/services/web-development" },
        { name: t('footer.analytics'), href: "/analytics" },
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
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${link.name}-${index}`}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-[#00A0E3] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-300">
          <p>{t('footer.copyright')}</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <a 
              href="https://start.kemis.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#00A0E3] transition-colors flex items-center"
            >
              <span className="mr-2">KemisEMAIL</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
