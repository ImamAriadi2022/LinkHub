import { openUrl as tauriOpenUrl } from "@tauri-apps/plugin-opener";
import { validateUrl } from "@/lib/url";

export async function openUrl(url: string): Promise<void> {
  if (!validateUrl(url)) return;
  try {
    await tauriOpenUrl(url);
  } catch (error) {
    console.error("Failed to open URL:", error);
  }
}
