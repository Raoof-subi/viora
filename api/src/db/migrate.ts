import { readFileSync } from "fs";
import { resolve } from "path";
import { pool } from "../config/db";

export async function migrate() {
  const sqlPath = resolve(__dirname, "migrations", "001_initial.sql");
  const sql = readFileSync(sqlPath, "utf8");

  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log("Migration completed successfully.");
  } finally {
    client.release();
  }
}

if (require.main === module) {
  migrate()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}
