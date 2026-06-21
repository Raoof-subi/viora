import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import contactRoutes from "./routes/contactRoutes";
import adminRoutes from "./routes/adminRoutes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true,
    })
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/content", contentRoutes);
  app.use("/api/v1/contact", contactRoutes);
  app.use("/api/v1/admin", adminRoutes);

  app.use(errorHandler);

  return app;
}
