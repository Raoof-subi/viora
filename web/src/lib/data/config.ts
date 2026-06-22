export function getLocalDataPath(): string | undefined {
  return process.env.LOCAL_DATA_PATH?.trim() || undefined;
}
