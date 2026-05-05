"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";
import { Menu, X } from "lucide-react";
import AuthButtons from "@/components/AuthButtons";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinkClass =
  "text-sm font-medium text-zinc-600 transition-colors hover:text-blue-700 dark:text-zinc-400 dark:hover:text-cyan-300";

export default function SiteHeader({ session }: { session: Session | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="glass-nav relative top-0 z-50 w-full">
      <div className="mx-auto flex max-w-5xl flex-col px-6 py-4 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
          >
            <Image
              src="/logo.png"
              alt="miniurl"
              width={40}
              height={40}
              className="h-9 w-9 object-contain "
              priority
            />
            <span>
              miniurl<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex md:flex-row">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          {session && (
            <Link href="/dashboard" className={navLinkClass}>
              Dashboard
            </Link>
          )}
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex md:flex-row md:justify-end">
          <ThemeToggle />
          <AuthButtons session={session} />
        </div>

        <div
          className={`md:hidden ${mobileOpen ? "" : "hidden"} absolute left-6 right-6 top-full z-40 mt-3`}
        >
          <div className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-lg backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-950/95">
            <Link
              href="/"
              className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/about"
              className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <div className="mt-3 border-t border-zinc-200 pt-4 dark:border-zinc-700">
              <AuthButtons session={session} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
