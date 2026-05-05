import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your shortened URLs, copy share links, and review click counts — private to your account.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-host");
  const siteHost =
    forwarded
      ?.split(",")
      .map((h) => h.trim())
      .find(Boolean) ||
    hdrs.get("host") ||
    "";

  // Fetch URLs for this user
  const urls = await prisma.url.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Your Links
        </h1>
        <p className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {urls.length} <span className="opacity-50">/</span> 10 Minified
        </p>
      </div>

      <DashboardClient initialUrls={urls} siteHost={siteHost} />
    </div>
  );
}
