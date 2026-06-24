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

function pickFirst(...values: Array<string | undefined>): string {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return "";
}

export function getGithubConfig(): GithubStorageConfig {
  const fromFile = storageConfig.github;

  return {
    owner: pickFirst(fromFile.owner, process.env.VERCEL_GIT_REPO_OWNER),
    repo: pickFirst(fromFile.repo, process.env.VERCEL_GIT_REPO_SLUG),
    branch: pickFirst(fromFile.branch, process.env.VERCEL_GIT_COMMIT_REF, "main"),
    token: pickFirst(fromFile.token, process.env.GITHUB_TOKEN),
  };
}

export function getStorageFilePaths(): StorageFilePaths {
  return storageConfig.files;
}

export function isGithubStorageConfigured(): boolean {
  const { owner, repo } = getGithubConfig();
  return Boolean(owner && repo);
}

export function canWriteToGithub(): boolean {
  return isGithubStorageConfigured() && Boolean(getGithubConfig().token);
}

export function getGithubTokenSetupMessage(): string {
  const { owner, repo } = getGithubConfig();
  const repoLabel = owner && repo ? `${owner}/${repo}` : "your repository";

  return (
    `GitHub token required to save data on Vercel. ` +
    `Create a token at https://github.com/settings/tokens/new?scopes=repo&description=viora-cms ` +
    `with Contents read/write access for ${repoLabel}, then add it to ` +
    `"token" in web/src/config/storage.json (or set GITHUB_TOKEN in Vercel) and redeploy.`
  );
}
