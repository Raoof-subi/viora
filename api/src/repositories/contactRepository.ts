import { pool } from "../config/db";
import type { ContactSubmission } from "../types";

interface ContactRow {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  project_type: string;
  message: string;
  submitted_at: Date;
}

function mapSubmission(row: ContactRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    company: row.company ?? "",
    email: row.email,
    phone: row.phone ?? "",
    projectType: row.project_type,
    message: row.message,
    submittedAt: row.submitted_at.toISOString(),
  };
}

export async function createContactSubmission(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}): Promise<ContactSubmission> {
  const result = await pool.query<ContactRow>(
    `INSERT INTO contact_submissions (name, company, email, phone, project_type, message)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.name,
      data.company ?? "",
      data.email,
      data.phone ?? "",
      data.projectType,
      data.message,
    ]
  );
  return mapSubmission(result.rows[0]);
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const result = await pool.query<ContactRow>(
    "SELECT * FROM contact_submissions ORDER BY submitted_at DESC"
  );
  return result.rows.map(mapSubmission);
}
