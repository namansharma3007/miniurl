import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const base = getSiteUrl();
  return {
    name: "Miniurl",
    short_name: "Miniurl",
    description:
      "Fast, secure URL shortener and link management. Create short links, track clicks, and share with confidence.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#2563eb",
    id: base,
  };
}
