import storageConfig from "@/config/storage.json";

export interface GithubStorageConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export interface StorageFilePaths {
  page: string;
  contactSubmissions: string;
}

export function getGithubConfig(): GithubStorageConfig {
  return storageConfig.github;
}

export function getStorageFilePaths(): StorageFilePaths {
  return storageConfig.files;
}

export function isGithubStorageConfigured(): boolean {
  const { owner, repo } = getGithubConfig();
  return Boolean(owner.trim() && repo.trim());
}

export function canWriteToGithub(): boolean {
  return isGithubStorageConfigured() && Boolean(getGithubConfig().token.trim());
}
