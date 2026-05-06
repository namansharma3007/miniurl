import type { Url } from "@prisma/client";

export let cachedUrls: Url[] | null = null;

export const setCachedUrls = (urls: Url[] | null) => {
  cachedUrls = urls;
};

export const clearDashboardCache = () => {
  cachedUrls = null;
};
