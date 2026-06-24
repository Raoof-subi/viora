import {
  canWriteToGithub,
  getGithubConfig,
  getGithubTokenSetupMessage,
  isGithubStorageConfigured,
} from "@/lib/data/storage-config";

export class StorageWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageWriteError";
  }
}

function rawFileUrl(filePath: string): string {
  const { owner, repo, branch } = getGithubConfig();
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

function contentsApiUrl(filePath: string): string {
  const { owner, repo } = getGithubConfig();
  return `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
}

function githubHeaders(): HeadersInit {
  const { token } = getGithubConfig();
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function readGithubJsonFile<T>(filePath: string): Promise<T | null> {
  if (!isGithubStorageConfigured()) {
    return null;
  }

  try {
    const response = await fetch(rawFileUrl(filePath), { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    return JSON.parse(await response.text()) as T;
  } catch {
    return null;
  }
}

export async function writeGithubJsonFile(
  filePath: string,
  content: unknown,
  message: string
): Promise<void> {
  if (!canWriteToGithub()) {
    throw new StorageWriteError(getGithubTokenSetupMessage());
  }

  const apiUrl = contentsApiUrl(filePath);
  const { branch } = getGithubConfig();

  let sha: string | undefined;
  const existing = await fetch(`${apiUrl}?ref=${branch}`, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (existing.ok) {
    const meta = (await existing.json()) as { sha: string };
    sha = meta.sha;
  } else if (existing.status !== 404) {
    throw new StorageWriteError(`GitHub read failed (${existing.status}).`);
  }

  const payload = {
    message,
    branch,
    content: Buffer.from(`${JSON.stringify(content, null, 2)}\n`).toString("base64"),
    ...(sha ? { sha } : {}),
  };

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as { message?: string };
    throw new StorageWriteError(error.message ?? `GitHub write failed (${response.status}).`);
  }
}
