import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { AppError } from "../middleware/errorHandler";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }
    const user = await authService.getCurrentUser(req.user.userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await authService.listUsers();
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name, role } = req.body;
    const user = await authService.createUser(email, password, name, role);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}
