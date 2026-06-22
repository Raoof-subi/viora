import { getApiUrl } from "@/lib/api/client";
import type { PageData } from "@/types";

export async function fetchPageDataFromApi(): Promise<PageData> {
  const response = await fetch(getApiUrl("/api/v1/content/page"), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return (await response.json()) as PageData;
}
