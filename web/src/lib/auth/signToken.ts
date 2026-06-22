import { SignJWT, type JWTPayload } from "jose";
import { requireJwtSecret } from "@/lib/auth/config";

export interface AuthTokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function signAuthToken(payload: AuthTokenPayload): Promise<string> {
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "24h";
  const secret = requireJwtSecret();

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}
