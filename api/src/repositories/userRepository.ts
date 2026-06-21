import bcrypt from "bcryptjs";
import { pool } from "../config/db";
import type { User } from "../types";

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
}

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
  };
}

export async function findUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
  const result = await pool.query<UserRow>(
    "SELECT id, email, password_hash, name, role FROM users WHERE email = $1",
    [email.toLowerCase()]
  );
  const row = result.rows[0];
  if (!row) return null;
  return { ...mapUser(row), passwordHash: row.password_hash };
}

export async function findUserById(id: string): Promise<User | null> {
  const result = await pool.query<UserRow>(
    "SELECT id, email, password_hash, name, role FROM users WHERE id = $1",
    [id]
  );
  const row = result.rows[0];
  return row ? mapUser(row) : null;
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role = "admin"
): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 12);
  const result = await pool.query<UserRow>(
    `INSERT INTO users (email, password_hash, name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, password_hash, name, role`,
    [email.toLowerCase(), passwordHash, name, role]
  );
  return mapUser(result.rows[0]);
}

export async function listUsers(): Promise<User[]> {
  const result = await pool.query<UserRow>(
    "SELECT id, email, password_hash, name, role FROM users ORDER BY created_at ASC"
  );
  return result.rows.map(mapUser);
}

export async function userExists(email: string): Promise<boolean> {
  const result = await pool.query("SELECT 1 FROM users WHERE email = $1", [email.toLowerCase()]);
  return result.rowCount !== null && result.rowCount > 0;
}
