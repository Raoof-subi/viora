import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { isLocalDataMode } from "@/lib/data/config";

const TOKEN_COOKIE = "viora_token";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return new TextEncoder().encode(secret);
  }
  if (isLocalDataMode() && process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("local-dev-jwt-secret");
  }
  return null;
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value ?? null;
}

export async function verifyAuthToken(token: string) {
  const secret = getSecret();
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function getAuthUser() {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyAuthToken(token);
}

export { TOKEN_COOKIE };
