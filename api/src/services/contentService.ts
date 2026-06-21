import * as contentRepository from "../repositories/contentRepository";
import type { PageData, SiteSettings } from "../types";

export async function getPageData(): Promise<PageData | null> {
  return contentRepository.getPageData();
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return contentRepository.getSiteSettings();
}

export async function updateSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  return contentRepository.updateSiteSettings(settings);
}
