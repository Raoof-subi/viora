import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getJwtSecret } from "@/lib/auth/config";

const TOKEN_COOKIE = "viora_token";

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value ?? null;
}

export async function verifyAuthToken(token: string) {
  const secret = getJwtSecret();
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
