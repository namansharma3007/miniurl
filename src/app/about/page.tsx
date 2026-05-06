import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "About",
  description:
    "Miniurl is a simple, fast, and reliable URL shortener built to make link sharing easier.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${siteUrl}/about`,
    title: "About Miniurl",
    description:
      "Miniurl is a simple, fast, and reliable URL shortener built to make link sharing easier.",
  },
  twitter: {
    title: "About Miniurl",
    description:
      "Miniurl is a simple, fast, and reliable URL shortener built to make link sharing easier.",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/about#webpage`,
  url: `${siteUrl}/about`,
  name: "About Miniurl",
  description:
    "Miniurl is a simple, fast, and reliable URL shortener built to make link sharing easier.",
  isPartOf: { "@id": `${siteUrl}/#website` },
  inLanguage: "en-US",
};

export default function About() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <div className="glass max-w-4xl mx-auto p-8 md:p-12 animate-fade-in-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gradient inline-block">
            About Miniurl
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A simple, fast, and reliable URL shortener.
          </p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
          <p>
            Miniurl was built with a simple goal: to make sharing long, complex web links easier. Whether you&apos;re posting on social media, sending a message, or writing an email, long URLs can be messy and hard to read.
          </p>
          <p>
            We provide a straightforward, no-nonsense tool to instantly shrink any URL into a clean, compact link. Just paste your URL, click shorten, and you&apos;re ready to go.
          </p>
          <p>
            Built with modern web technologies, Miniurl focuses on speed, simplicity, and a great user experience.
          </p>
        </div>
      </div>
    </>
  );
}
