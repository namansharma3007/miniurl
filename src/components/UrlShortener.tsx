"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UrlShortener() {
  const { data: session } = useSession();
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [existsMessage, setExistsMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError("Please sign in to minify URLs.");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);
    setExistsMessage("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.exists) {
        setExistsMessage(data.message);
      }

      setShortUrl(`${window.location.origin}/${data.shortId}`);
      setUrl("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <div className="glass p-2 rounded-full shadow-2xl opacity-0 animate-fade-in-up delay-100">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full relative"
        >
          <input
            type="url"
            className="flex-1 border-b border-zinc-200 bg-transparent px-6 py-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none sm:border-b-0 md:text-lg dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
            placeholder={
              session
                ? "Paste your long link here..."
                : "Sign in to shorten URLs..."
            }
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={!session}
            required
          />
          <button
            type="submit"
            className="m-2 whitespace-nowrap rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:scale-105 hover:from-blue-500 hover:to-cyan-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:shadow-blue-900/40"
            disabled={loading || !session}
          >
            {loading ? "Minifying..." : "Minify URL"}
          </button>
        </form>
      </div>

      {error && (
        <p className="mt-6 text-center font-medium text-red-600 dark:text-red-500">
          {error}
        </p>
      )}
      {existsMessage && (
        <p className="mt-6 text-center font-medium text-emerald-600 dark:text-emerald-500">
          {existsMessage}
        </p>
      )}

      {shortUrl && (
        <div className="mt-8 p-6 glass flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto opacity-0 animate-fade-in">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-lg font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {shortUrl}
          </a>
          <button
            onClick={copyToClipboard}
            className="w-full rounded-lg border border-zinc-300 bg-white px-6 py-2 font-medium transition-colors hover:bg-zinc-50 sm:w-auto dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
