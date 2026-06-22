import { fetchPageDataFromApi } from "@/lib/data/api";
import { getDataSourceConfig } from "@/lib/data/config";
import { loadLocalPageData } from "@/lib/data/local";
import type { PageData } from "@/types";

export async function getPageData(): Promise<PageData> {
  const { source, fallback } = getDataSourceConfig();

  if (source === "local") {
    return loadLocalPageData();
  }

  try {
    return await fetchPageDataFromApi();
  } catch (error) {
    if (!fallback) {
      throw error;
    }
    console.warn("API unavailable, using local data:", error);
    return loadLocalPageData();
  }
}
