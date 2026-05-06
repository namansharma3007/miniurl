import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
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

  return <DashboardClient siteHost={siteHost} />;
}
