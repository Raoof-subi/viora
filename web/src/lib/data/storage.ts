import defaultAdminData from "@/data/admin.json";
import defaultContactData from "@/data/contact-submissions.json";
import defaultPageData from "@/data/page.json";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { getLocalDataPath } from "@/lib/data/config";
import {
  readGithubJsonFile,
  StorageWriteError,
  writeGithubJsonFile,
} from "@/lib/data/github";
import {
  canWriteToGithub,
  getStorageFilePaths,
  getGithubTokenSetupMessage,
  isGithubStorageConfigured,
} from "@/lib/data/storage-config";
import type { PageData, SiteSettings } from "@/types";

export { StorageWriteError };

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  submittedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

interface AdminStore {
  users: AdminUser[];
}

interface ContactStore {
  submissions: ContactSubmission[];
}

const WEB_ROOT = process.cwd();
const LOCAL_DATA_DIR = path.join(WEB_ROOT, "data", "local");
const LOCAL_PAGE_PATH = path.join(LOCAL_DATA_DIR, "page.json");
const LOCAL_CONTACT_PATH = path.join(LOCAL_DATA_DIR, "contact-submissions.json");

async function readLocalJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function ensureLocalDataDir(): Promise<void> {
  await mkdir(LOCAL_DATA_DIR, { recursive: true });
}

function canWriteToLocalDisk(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1";
}

async function writeLocalJsonFile(filePath: string, content: unknown): Promise<void> {
  if (!canWriteToLocalDisk()) {
    throw new StorageWriteError(getGithubTokenSetupMessage());
  }

  await ensureLocalDataDir();
  await writeFile(filePath, `${JSON.stringify(content, null, 2)}\n`, "utf-8");
}

async function writeStorageJsonFile(
  filePath: string,
  content: unknown,
  commitMessage: string,
  localPath: string
): Promise<void> {
  if (canWriteToGithub()) {
    await writeGithubJsonFile(filePath, content, commitMessage);
    return;
  }

  if (isGithubStorageConfigured() && process.env.VERCEL === "1") {
    throw new StorageWriteError(getGithubTokenSetupMessage());
  }

  await writeLocalJsonFile(localPath, content);
}

async function loadPageDataFromLocalDisk(): Promise<PageData | null> {
  const customPath = getLocalDataPath();
  const paths = customPath
    ? [
        path.isAbsolute(customPath) ? customPath : path.join(WEB_ROOT, customPath),
        LOCAL_PAGE_PATH,
      ]
    : [LOCAL_PAGE_PATH];

  for (const filePath of paths) {
    const data = await readLocalJsonFile<PageData>(filePath);
    if (data) {
      return data;
    }
  }

  return null;
}

async function loadContactSubmissionsFromLocalDisk(): Promise<ContactSubmission[] | null> {
  const data = await readLocalJsonFile<ContactStore>(LOCAL_CONTACT_PATH);
  return data?.submissions ?? null;
}

export async function loadPageData(): Promise<PageData> {
  const { page: pagePath } = getStorageFilePaths();

  // In development, prioritize local disk files to support local edits
  if (process.env.NODE_ENV !== "production") {
    const fromLocalDisk = await loadPageDataFromLocalDisk();
    if (fromLocalDisk) {
      return fromLocalDisk;
    }

    try {
      const paths = [
        path.join(process.cwd(), "src/data/page.json"),
        path.join(process.cwd(), "web/src/data/page.json"),
      ];
      for (const filePath of paths) {
        if (existsSync(filePath)) {
          const raw = await readFile(filePath, "utf-8");
          return JSON.parse(raw) as PageData;
        }
      }
    } catch (e) {
      console.error("Error reading page.json from disk:", e);
    }
  }

  // In production, load from GitHub if configured
  if (isGithubStorageConfigured()) {
    const fromGithub = await readGithubJsonFile<PageData>(pagePath);
    if (fromGithub) {
      return fromGithub;
    }
  }

  const fromLocalDisk = await loadPageDataFromLocalDisk();
  if (fromLocalDisk) {
    return fromLocalDisk;
  }

  return defaultPageData as PageData;
}

export async function savePageData(pageData: PageData): Promise<void> {
  const { page: pagePath } = getStorageFilePaths();
  await writeStorageJsonFile(
    pagePath,
    pageData,
    "Update site page data",
    LOCAL_PAGE_PATH
  );
}

export async function saveSettings(settings: SiteSettings): Promise<SiteSettings> {
  const pageData = await loadPageData();
  await savePageData({ ...pageData, settings });
  return settings;
}

export async function loadContactSubmissions(): Promise<ContactSubmission[]> {
  const { contactSubmissions: contactPath } = getStorageFilePaths();

  if (isGithubStorageConfigured()) {
    const fromGithub = await readGithubJsonFile<ContactStore>(contactPath);
    if (fromGithub?.submissions) {
      return fromGithub.submissions;
    }
  }

  const fromLocalDisk = await loadContactSubmissionsFromLocalDisk();
  if (fromLocalDisk) {
    return fromLocalDisk;
  }

  return (defaultContactData as ContactStore).submissions;
}

export async function appendContactSubmission(input: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}): Promise<ContactSubmission> {
  const submissions = await loadContactSubmissions();
  const submission: ContactSubmission = {
    id: crypto.randomUUID(),
    name: input.name,
    company: input.company ?? "",
    email: input.email,
    phone: input.phone ?? "",
    projectType: input.projectType,
    message: input.message,
    submittedAt: new Date().toISOString(),
  };

  submissions.unshift(submission);
  const store: ContactStore = { submissions };

  const { contactSubmissions: contactPath } = getStorageFilePaths();
  await writeStorageJsonFile(
    contactPath,
    store,
    "Add contact form submission",
    LOCAL_CONTACT_PATH
  );
  return submission;
}

export async function authenticateAdmin(
  email: string,
  password: string
): Promise<Omit<AdminUser, "password"> | null> {
  const users = (defaultAdminData as AdminStore).users;
  const user = users.find(
    (entry) =>
      entry.email.toLowerCase() === email.toLowerCase() && entry.password === password
  );

  if (!user) {
    return null;
  }

  const { password: _, ...safeUser } = user;
  return safeUser;
}
