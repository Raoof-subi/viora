import { loadPageData } from "@/lib/data/storage";
import type { PageData } from "@/types";

export async function getPageData(): Promise<PageData> {
  return loadPageData();
}
