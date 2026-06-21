import { sampleData } from "@/data/sample";
import type { PageData } from "@/types";
import { getApiUrl } from "@/lib/api/client";

export async function getPageData(): Promise<PageData> {
  try {
    const response = await fetch(getApiUrl("/api/v1/content/page"), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = (await response.json()) as PageData;
    return data;
  } catch (error) {
    console.error("Failed to fetch API data, using sample data:", error);
    return sampleData;
  }
}
