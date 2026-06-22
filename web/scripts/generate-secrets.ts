import { randomBytes } from "crypto";

const secret = randomBytes(32).toString("base64");

console.log("\nAdd this to web/.env.local:\n");
console.log(`JWT_SECRET=${secret}\n`);
