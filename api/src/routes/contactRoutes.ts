import { Router } from "express";
import * as contactController from "../controllers/contactController";
import { validateBody } from "../middleware/validate";
import { contactSchema } from "../validators/schemas";

const router = Router();

router.post("/", validateBody(contactSchema), contactController.submitContact);

export default router;
