import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "About",
  description:
    "Miniurl provides enterprise-grade URL management and analytics. Empowering Fortune 500 companies and growing startups to scale their digital reach.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${siteUrl}/about`,
    title: "About Miniurl",
    description:
      "Miniurl provides enterprise-grade URL management and analytics. Empowering Fortune 500 companies and growing startups to scale their digital reach.",
  },
  twitter: {
    title: "About Miniurl",
    description:
      "Miniurl provides enterprise-grade URL management and analytics. Empowering Fortune 500 companies and growing startups to scale their digital reach.",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/about#webpage`,
  url: `${siteUrl}/about`,
  name: "About Miniurl",
  description:
    "Miniurl provides enterprise-grade URL management and analytics. Empowering Fortune 500 companies and growing startups to scale their digital reach.",
  isPartOf: { "@id": `${siteUrl}/#website` },
  inLanguage: "en-US",
};

export default function About() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <div className="glass max-w-4xl mx-auto p-8 md:p-12 animate-fade-in-up">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gradient inline-block">
            Powering the Modern Web
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Miniurl is the enterprise standard for link management, routing
            1,000+ clicks globally with zero downtime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Our Mission
            </h2>
            <p>
              Founded on the principle that digital infrastructure should be
              invisible yet incredibly powerful, Miniurl provides Fortune 500
              companies, marketing agencies, and global enterprises with
              unparalleled link management capabilities.
            </p>
            <p>
              We transform long, complex URLs into meaningful, trackable assets
              that drive engagement and provide deep, actionable analytics.
            </p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Global Scale
            </h2>
            <p>
              Operating on a highly distributed edge network, Miniurl guarantees
              sub-millisecond latency for link resolution anywhere in the world.
            </p>
            <p>
              Our infrastructure is engineered for redundancy and massive
              throughput, ensuring your critical marketing campaigns and
              operational links remain active 24/7/365.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
            Enterprise Security & Compliance
          </h2>
          <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 text-center max-w-2xl mx-auto space-y-4">
            <p>
              Trust is the foundation of our business. We adhere to the
              strictest security standards in the industry, offering
              high-grade encryption, comprehensive access controls, and
              transparent audit logging.
            </p>
            <p>
              When you build on Miniurl, you&apos;re building on a platform
              designed to meet the rigorous demands of modern regulatory
              environments.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
