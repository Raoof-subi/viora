import defaultAdminData from "@/data/admin.json";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import defaultPageData from "@/data/page.json";
import { getDataSourceConfig } from "@/lib/data/config";
import type { PageData, SiteSettings } from "@/types";

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

export interface LocalAdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

interface AdminStore {
  users: LocalAdminUser[];
}

const WEB_ROOT = process.cwd();
const DEFAULT_PAGE_PATH = path.join(WEB_ROOT, "src", "data", "page.json");
const LOCAL_PAGE_PATH = path.join(WEB_ROOT, "data", "local", "page.json");
const DEFAULT_ADMIN_PATH = path.join(WEB_ROOT, "src", "data", "admin.json");
const LOCAL_ADMIN_PATH = path.join(WEB_ROOT, "data", "local", "admin.json");
const CONTACT_SUBMISSIONS_PATH = path.join(
  WEB_ROOT,
  "data",
  "local",
  "contact-submissions.json"
);

function resolvePageDataPath(): string {
  const { localDataPath } = getDataSourceConfig();
  if (localDataPath) {
    return path.isAbsolute(localDataPath)
      ? localDataPath
      : path.join(WEB_ROOT, localDataPath);
  }
  return LOCAL_PAGE_PATH;
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function ensureLocalDataDir(): Promise<void> {
  await mkdir(path.dirname(LOCAL_PAGE_PATH), { recursive: true });
}

export async function loadLocalPageData(): Promise<PageData> {
  const overridePath = resolvePageDataPath();
  const paths =
    overridePath === LOCAL_PAGE_PATH
      ? [LOCAL_PAGE_PATH, DEFAULT_PAGE_PATH]
      : [overridePath, LOCAL_PAGE_PATH, DEFAULT_PAGE_PATH];

  for (const filePath of paths) {
    const data = await readJsonFile<PageData>(filePath);
    if (data) {
      return data;
    }
  }

  return defaultPageData as PageData;
}

export async function saveLocalPageData(pageData: PageData): Promise<void> {
  await ensureLocalDataDir();
  await writeFile(LOCAL_PAGE_PATH, `${JSON.stringify(pageData, null, 2)}\n`, "utf-8");
}

export async function saveLocalSettings(settings: SiteSettings): Promise<SiteSettings> {
  const pageData = await loadLocalPageData();
  const updated: PageData = { ...pageData, settings };
  await saveLocalPageData(updated);
  return settings;
}

export async function loadLocalContactSubmissions(): Promise<ContactSubmission[]> {
  const data = await readJsonFile<{ submissions: ContactSubmission[] }>(
    CONTACT_SUBMISSIONS_PATH
  );
  return data?.submissions ?? [];
}

export async function appendLocalContactSubmission(input: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}): Promise<ContactSubmission> {
  await ensureLocalDataDir();

  const submissions = await loadLocalContactSubmissions();
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
  await writeFile(
    CONTACT_SUBMISSIONS_PATH,
    `${JSON.stringify({ submissions }, null, 2)}\n`,
    "utf-8"
  );

  return submission;
}

export async function loadLocalAdminUsers(): Promise<LocalAdminUser[]> {
  const data =
    (await readJsonFile<AdminStore>(LOCAL_ADMIN_PATH)) ??
    (await readJsonFile<AdminStore>(DEFAULT_ADMIN_PATH));

  if (data?.users?.length) {
    return data.users;
  }

  return (defaultAdminData as AdminStore).users;
}

export async function authenticateLocalAdmin(
  email: string,
  password: string
): Promise<Omit<LocalAdminUser, "password"> | null> {
  const users = await loadLocalAdminUsers();
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
