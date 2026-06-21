import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import * as userRepository from "../repositories/userRepository";
import type { JwtPayload, User } from "../types";

export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const payload: JwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  return userRepository.findUserById(userId);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}

export async function listUsers(): Promise<User[]> {
  return userRepository.listUsers();
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role = "admin"
): Promise<User> {
  const exists = await userRepository.userExists(email);
  if (exists) {
    throw new Error("User with this email already exists");
  }
  return userRepository.createUser(email, password, name, role);
}
