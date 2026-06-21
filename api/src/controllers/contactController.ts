import type { Request, Response, NextFunction } from "express";
import * as contactService from "../services/contactService";

export async function submitContact(req: Request, res: Response, next: NextFunction) {
  try {
    const submission = await contactService.submitContact(req.body);
    res.status(201).json({ success: true, submission });
  } catch (err) {
    next(err);
  }
}

export async function listSubmissions(_req: Request, res: Response, next: NextFunction) {
  try {
    const submissions = await contactService.listSubmissions();
    res.json({ submissions });
  } catch (err) {
    next(err);
  }
}
