import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Miniurl.",
  alternates: { canonical: "/terms" },
  openGraph: {
    url: `${siteUrl}/terms`,
    title: "Terms of Service - Miniurl",
    description: "Terms of Service for Miniurl.",
  },
};

export default function TermsOfService() {
  return (
    <div className="glass max-w-4xl mx-auto p-8 md:p-12 animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-zinc-900 dark:text-white">
        Terms of Service
      </h1>
      <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="text-sm text-zinc-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using the Miniurl platform, services, and API
          (collectively, the &quot;Service&quot;), you agree to be bound by
          these Terms of Service. If you do not agree to these terms, please do
          not use our Service.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          2. Enterprise Usage and SLAs
        </h2>
        <p>
          Miniurl provides enterprise-grade link management solutions. For users
          on our Enterprise plans, additional Service Level Agreements (SLAs)
          apply, ensuring 99.99% uptime and dedicated support channels. Abuse of
          the platform, including generating malicious or spam links, will
          result in immediate termination of services.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          3. User Responsibilities
        </h2>
        <p>
          You are responsible for the content of the URLs you shorten. You agree
          not to use the Service to distribute malware, phishing links, illegal
          content, or any material that infringes on intellectual property
          rights. Miniurl reserves the right to disable any link that violates
          these terms.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          4. Intellectual Property
        </h2>
        <p>
          All intellectual property rights in the Service, including the
          underlying software, branding, and design, are owned by Miniurl. You
          are granted a limited, non-exclusive license to use the Service in
          accordance with these Terms.
        </p>

        <h2 className="mt-8 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          5. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, Miniurl shall not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages resulting from your use of the Service or any loss of data,
          business, or profits.
        </p>
      </div>
    </div>
  );
}
