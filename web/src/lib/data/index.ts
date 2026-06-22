import { loadLocalPageData } from "@/lib/data/local";
import type { PageData } from "@/types";

export async function getPageData(): Promise<PageData> {
  return loadLocalPageData();
}
