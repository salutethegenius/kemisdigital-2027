import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  locale?: string;
  type?: string;
  siteName?: string;
}

export default function SEOHelmet({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  locale = 'en_BS', // Default to Bahamas English locale
  type = 'website',
  siteName = 'KemisDigital - The People\'s Choice'
}: SEOHelmetProps) {
  const siteUrl = 'https://kemisdigital.com';
  const finalOgUrl = ogUrl ? `${siteUrl}${ogUrl}` : siteUrl;
  
  // Default OG image for Bahamian branding if none provided
  const defaultOgImage = 'https://lightning.kemisdigital.com/assets/kemis-social-card.jpg';
  const finalOgImage = ogImage || defaultOgImage;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={finalOgUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/images/fav.png" />
      <link rel="apple-touch-icon" href="/images/fav.png" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalOgUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={finalOgImage} />
      <meta property="twitter:site" content="@kemisdigital" />
      
      {/* Additional SEO elements */}
      <meta name="theme-color" content="#00A0E3" />
      <meta name="author" content="KemisDigital" />
      <meta name="geo.region" content="BS" />
      <meta name="geo.placename" content="Nassau" />
    </Helmet>
  );
}