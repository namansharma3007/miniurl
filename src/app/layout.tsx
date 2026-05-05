import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SiteHeader from '@/components/SiteHeader';
import { getSiteUrl } from '@/lib/site';
import { GoogleAnalytics } from '@next/third-parties/google';


const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Miniurl | Professional link management',
    template: '%s | Miniurl',
  },
  icons: { icon: "/logo.png" },
  description:
    'Create short, trackable links in seconds. Miniurl is a fast, secure URL shortener with click analytics — built for creators, teams, and production workflows.',
  applicationName: 'Miniurl',
  keywords: [
    'URL shortener',
    'link shortener',
    'short links',
    'link management',
    'click tracking',
    'UTM',
    'Miniurl',
  ],
  authors: [{ name: 'Miniurl' }],
  creator: 'Miniurl',
  publisher: 'Miniurl',
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Miniurl',
    title: 'Miniurl | Professional link management',
    description:
      'Create short, trackable links in seconds. Fast redirects, click analytics, and a polished UI — built with Next.js.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miniurl | Professional link management',
    description:
      'Create short, trackable links in seconds. Fast redirects, click analytics, and a polished UI.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <SiteHeader session={session} />
          
          <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col">
            {children}
          </main>

          <footer className="mt-auto w-full border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
            <p>&copy; {new Date().getFullYear()} Miniurl. Enterprise Grade URL Management.</p>
          </footer>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-Z9BPC8EX39" />
    </html>
  );
}
