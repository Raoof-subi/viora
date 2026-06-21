import dotenv from "dotenv";

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  port: parseInt(process.env.PORT ?? "4000", 10),
  databaseUrl: requireEnv("DATABASE_URL"),
  jwtSecret: requireEnv("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "24h",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@viora.com",
  adminPassword: process.env.ADMIN_PASSWORD ?? "changeme",
  nodeEnv: process.env.NODE_ENV ?? "development",
};
