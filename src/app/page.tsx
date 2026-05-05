import type { Metadata } from 'next';
import UrlShortener from '@/components/UrlShortener';
import { JsonLd } from '@/components/JsonLd';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: { absolute: 'Miniurl | Professional link management' },
  description:
    'Create short, trackable links in seconds. Miniurl is a fast, secure URL shortener with click analytics — built for creators, teams, and production workflows.',
  alternates: { canonical: '/' },
  openGraph: {
    url: siteUrl,
    title: 'Professional link management | Miniurl',
    description:
      'Create short, trackable links in seconds. Fast redirects, click analytics, and a polished UI for easier navigation.',
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Miniurl',
      description:
        'Create short, trackable links in seconds. Fast redirects, click analytics, and a polished UI.',
      inLanguage: 'en-US',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Miniurl',
      url: siteUrl,
    },
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#webapp`,
      name: 'Miniurl',
      url: siteUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-down">
        <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 md:text-7xl dark:text-white">
          Shorten Your Links. <br />
          <span className="text-gradient">Expand Your Reach.</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-zinc-600 md:text-xl dark:text-zinc-400">
          Miniurl is a lightning-fast, production-grade link management tool. 
          Create concise, shareable links in seconds with our beautiful, intuitive interface.
        </p>
      </div>

      <UrlShortener />
    </>
  );
}
