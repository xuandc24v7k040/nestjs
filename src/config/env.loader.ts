import { config } from 'dotenv';

export function getEnvFilePaths(nodeEnv = process.env.NODE_ENV): string[] {
  const env = nodeEnv?.trim();

  return env ? [`.env.${env}.local`, `.env.${env}`, '.env'] : ['.env'];
}

export function loadEnvFile(): void {
  for (const path of getEnvFilePaths()) {
    config({ path, quiet: true });
  }
}

loadEnvFile();
