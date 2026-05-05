"use client";

import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButtons({ session }: { session: Session | null }) {
  if (session) {
    return (
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border-2 border-zinc-200 dark:border-zinc-700"
          />
        )}
        <button
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      className="w-full rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-cyan-400 md:w-auto dark:shadow-blue-900/40"
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </button>
  );
}
