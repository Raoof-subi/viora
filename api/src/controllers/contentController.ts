import type { Request, Response, NextFunction } from "express";
import * as contentService from "../services/contentService";
import { AppError } from "../middleware/errorHandler";

export async function getPageData(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await contentService.getPageData();
    if (!data) {
      throw new AppError(404, "Content not found. Run database seed.");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getSettings(_req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await contentService.getSiteSettings();
    if (!settings) {
      throw new AppError(404, "Site settings not found");
    }
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await contentService.updateSiteSettings(req.body);
    res.json(settings);
  } catch (err) {
    next(err);
  }
}
