import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Miniurl.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: `${siteUrl}/privacy`,
    title: "Privacy Policy - Miniurl",
    description: "Privacy Policy for Miniurl.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="glass max-w-4xl mx-auto p-8 md:p-12 animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-zinc-900 dark:text-white">
        Privacy Policy
      </h1>
      <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="text-sm text-zinc-500">
          Last updated: May 5, 2026
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          1. Information We Collect
        </h2>
        <p>
          At Miniurl, we take data privacy seriously. We collect information you
          provide directly to us when you create an account, such as your name
          and email address. We also automatically collect certain information
          when you use our Service, including IP addresses, browser types, and
          usage data to provide our analytics features.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          2. How We Use Your Information
        </h2>
        <p>
          We use the information we collect to operate, maintain, and improve
          our Service. This includes providing the core URL shortening
          functionality, generating click analytics, ensuring enterprise-grade
          security, and communicating with you about updates or support
          requests.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          3. Data Security
        </h2>
        <p>
          We implement industry-standard security measures to protect your data.
          All data is encrypted in transit and at rest. As an enterprise
          platform, we conduct regular security audits to maintain the integrity
          and confidentiality of your information.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          4. Third-Party Services
        </h2>
        <p>
          We may use third-party services, such as Google Analytics, to help us
          understand how our Service is used. These third parties have their own
          privacy policies addressing how they use such information.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          5. Your Rights
        </h2>
        <p>
          Depending on your location, you may have rights to access, correct, or
          delete your personal data. If you have any questions or wish to
          exercise these rights, please contact our privacy team.
        </p>
      </div>
    </div>
  );
}
