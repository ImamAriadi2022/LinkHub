import { readTextFile, writeTextFile, mkdir, exists, BaseDirectory } from "@tauri-apps/plugin-fs";
import type { AppData } from "@/types";

const APP_DIR = "LinkHub";
const FILE_NAME = "data.json";

const defaultData: AppData = {
  settings: { theme: "dark" },
  categories: [
    {
      id: crypto.randomUUID(),
      name: "Uncategorized",
      createdAt: new Date().toISOString(),
    },
  ],
  websites: [],
};

async function ensureAppDirectory(): Promise<void> {
  const dirExists = await exists(APP_DIR, { baseDir: BaseDirectory.AppData });
  if (!dirExists) {
    await mkdir(APP_DIR, { baseDir: BaseDirectory.AppData, recursive: true });
  }
}

export async function loadData(): Promise<AppData> {
  try {
    await ensureAppDirectory();
    const filePath = `${APP_DIR}/${FILE_NAME}`;
    const fileExists = await exists(filePath, { baseDir: BaseDirectory.AppData });
    if (!fileExists) {
      await writeTextFile(filePath, JSON.stringify(defaultData, null, 2), {
        baseDir: BaseDirectory.AppData,
      });
      return structuredClone(defaultData);
    }
    const content = await readTextFile(filePath, {
      baseDir: BaseDirectory.AppData,
    });
    return JSON.parse(content) as AppData;
  } catch {
    return structuredClone(defaultData);
  }
}

export async function saveData(data: AppData): Promise<void> {
  try {
    await ensureAppDirectory();
    const filePath = `${APP_DIR}/${FILE_NAME}`;
    await writeTextFile(filePath, JSON.stringify(data, null, 2), {
      baseDir: BaseDirectory.AppData,
    });
  } catch (error) {
    console.error("Failed to save data:", error);
    throw error;
  }
}
