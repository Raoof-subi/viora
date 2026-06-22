import { SignJWT, type JWTPayload } from "jose";
import { isLocalDataMode } from "@/lib/data/config";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return new TextEncoder().encode(secret);
  }
  if (isLocalDataMode() && process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("local-dev-jwt-secret");
  }
  throw new Error("JWT_SECRET is required for local auth");
}

export interface AuthTokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function signAuthToken(payload: AuthTokenPayload): Promise<string> {
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "24h";
  const secret = getSecret();

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}
