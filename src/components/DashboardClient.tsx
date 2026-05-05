"use client";

import type { Url } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient({
  initialUrls,
  siteHost,
}: {
  initialUrls: Url[];
  siteHost: string;
}) {
  const [urls, setUrls] = useState(initialUrls);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    setLoading(id);
    try {
      const res = await fetch(`/api/urls/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUrls((prev) => prev.filter((u) => u.id !== id));
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const copyToClipboard = (shortId: string) => {
    const fullUrl = `${window.location.origin}/${shortId}`;
    navigator.clipboard.writeText(fullUrl);
    alert("Copied to clipboard!");
  };

  if (urls.length === 0) {
    return (
      <div className="glass p-12 text-center text-zinc-500 dark:text-zinc-400">
        <p>You have not minified any URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {urls.map((url) => (
        <div key={url.id} className="glass flex flex-col items-start justify-between p-5 transition-all hover:-translate-y-1 hover:border-cyan-500/30 md:flex-row md:items-center md:p-6">
          <div className="flex flex-col gap-2 overflow-hidden w-full md:w-auto mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <a href={url.original} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                {siteHost ? `${siteHost}/${url.shortId}` : `…/${url.shortId}`}
              </a>
              <button 
                onClick={() => copyToClipboard(url.shortId)} 
                className="text-zinc-500 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
                title="Copy"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <a href={url.original} target="_blank" rel="noopener noreferrer" className="max-w-[280px] truncate text-sm text-zinc-500 transition-colors hover:text-zinc-700 sm:max-w-md dark:hover:text-zinc-400">
              {url.original}
            </a>
          </div>
          
          <div className="flex items-center justify-between w-full md:w-auto gap-8">
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold leading-none text-zinc-900 dark:text-white">{url.clicks}</span>
              <span className="mt-1 text-xs uppercase tracking-widest text-zinc-500">Clicks</span>
            </div>
            <button 
              className="rounded-lg border border-red-500/30 bg-transparent px-4 py-2 text-sm font-medium text-red-600 transition-all hover:border-red-500 hover:bg-red-500/10 disabled:opacity-50 dark:text-red-400"
              onClick={() => handleDelete(url.id)}
              disabled={loading === url.id}
            >
              {loading === url.id ? "..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
