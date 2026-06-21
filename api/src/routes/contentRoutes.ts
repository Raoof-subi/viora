import { Router } from "express";
import * as contentController from "../controllers/contentController";

const router = Router();

router.get("/page", contentController.getPageData);

export default router;
