import defaultAdminData from "@/data/admin.json";

interface AdminStore {
  users: { id: string; email: string; password: string }[];
}

function getBuiltinJwtSecret(): string {
  const users = (defaultAdminData as AdminStore).users;
  const seed = users.map((user) => `${user.id}:${user.email}:${user.password}`).join("|");
  return `viora-jwt:${seed}`;
}

export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET?.trim();
  if (secret) {
    return new TextEncoder().encode(secret);
  }

  const fallback =
    process.env.NODE_ENV === "production"
      ? getBuiltinJwtSecret()
      : "local-dev-jwt-secret";

  return new TextEncoder().encode(fallback);
}

export function requireJwtSecret(): Uint8Array {
  return getJwtSecret();
}
