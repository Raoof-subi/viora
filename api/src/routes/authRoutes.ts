import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as authController from "../controllers/authController";
import { authenticate } from "../middleware/errorHandler";
import { validateBody } from "../middleware/validate";
import { createUserSchema, loginSchema } from "../validators/schemas";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts. Please try again later." },
});

router.post("/login", loginLimiter, validateBody(loginSchema), authController.login);
router.get("/me", authenticate, authController.me);

export default router;
