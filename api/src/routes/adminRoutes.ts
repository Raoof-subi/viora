import { Router } from "express";
import * as authController from "../controllers/authController";
import * as contentController from "../controllers/contentController";
import * as contactController from "../controllers/contactController";
import { authenticate } from "../middleware/errorHandler";
import { validateBody } from "../middleware/validate";
import { createUserSchema, siteSettingsSchema } from "../validators/schemas";

const router = Router();

router.use(authenticate);

router.get("/settings", contentController.getSettings);
router.put("/settings", validateBody(siteSettingsSchema), contentController.updateSettings);
router.get("/contact-submissions", contactController.listSubmissions);
router.get("/users", authController.listUsers);
router.post("/users", validateBody(createUserSchema), authController.createUser);

export default router;
