import * as contactRepository from "../repositories/contactRepository";
import type { ContactSubmission } from "../types";

export async function submitContact(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}): Promise<ContactSubmission> {
  return contactRepository.createContactSubmission(data);
}

export async function listSubmissions(): Promise<ContactSubmission[]> {
  return contactRepository.listContactSubmissions();
}
