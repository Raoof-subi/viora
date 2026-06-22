export class JwtSecretMissingError extends Error {
  constructor() {
    super("JWT_SECRET is required for auth");
    this.name = "JwtSecretMissingError";
  }
}

export function getJwtSecret(): Uint8Array | null {
  const secret = process.env.JWT_SECRET?.trim();
  if (secret) {
    return new TextEncoder().encode(secret);
  }
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("local-dev-jwt-secret");
  }
  return null;
}

export function requireJwtSecret(): Uint8Array {
  const secret = getJwtSecret();
  if (!secret) {
    throw new JwtSecretMissingError();
  }
  return secret;
}
