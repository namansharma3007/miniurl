import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn how miniurl helps you shorten links, track clicks, and ship faster — with a modern UI built for performance and scale.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: `${siteUrl}/about`,
    title: 'About Miniurl',
    description:
      'Learn how miniurl helps you shorten links, track clicks, and ship faster — with a modern UI built for performance and scale.',
  },
  twitter: {
    title: 'About miniurl',
    description:
      'Learn how miniurl helps you shorten links, track clicks, and ship faster — with a modern UI built for performance and scale.',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/about#webpage`,
  url: `${siteUrl}/about`,
  name: 'About miniurl',
  description:
    'Learn how miniurl helps you shorten links, track clicks, and ship faster — with a modern UI built for performance and scale.',
  isPartOf: { '@id': `${siteUrl}/#website` },
  inLanguage: 'en-US',
};

export default function About() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <div className="glass max-w-3xl mx-auto p-8 md:p-12 animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gradient">
        About miniurl
      </h1>
      
      <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Welcome to miniurl! We understand that in the modern digital age, long and clunky URLs can ruin the user experience and break the aesthetic of your content. That is why we built this tool—to provide a lightning-fast, highly scalable, and beautifully designed solution for shortening links.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Built for Scale</h2>
        <p>
          Whether you are an individual sharing a single link on social media or an enterprise generating thousands of dynamic URLs per second, miniurl is designed to handle it all. Under the hood, we use cutting-edge web technologies, including Next.js and Prisma, to ensure your links are created instantly and resolved even faster.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">SEO & Aesthetics First</h2>
        <p>
          A good URL shortener should not only work—it should look good doing it. We have poured attention into creating a vibrant glassmorphic UI with optional light or dark themes, responsive on every device from ultra-wide monitors to the phone in your pocket. Furthermore, our semantic HTML and metadata structures support solid SEO so you can find us when you need us.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">Open and Secure</h2>
        <p>
          We value your privacy and security. The links you shorten are stored securely in our database and redirected with permanent 301 redirects, ensuring that link equity is preserved and that users get exactly where they need to go.
        </p>
      </div>
    </div>
    </>
  );
}
