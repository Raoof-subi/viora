export type DataSource = "api" | "local";

function defaultDataSource(): DataSource {
  if (process.env.DATA_SOURCE) {
    return process.env.DATA_SOURCE === "local" ? "local" : "api";
  }
  return process.env.NODE_ENV === "production" ? "api" : "local";
}

export function getDataSourceConfig(): {
  source: DataSource;
  fallback: boolean;
  localDataPath?: string;
} {
  const source = defaultDataSource();
  const fallback = process.env.DATA_FALLBACK !== "false";
  const localDataPath = process.env.LOCAL_DATA_PATH?.trim() || undefined;

  return { source, fallback, localDataPath };
}

export function isLocalDataMode(): boolean {
  return getDataSourceConfig().source === "local";
}
