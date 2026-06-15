import { create } from "zustand";
import type { AppSettings } from "@/types";
import { loadData, saveData } from "@/lib/storage";

interface SettingsState {
  settings: AppSettings;
  isLoading: boolean;
  loadSettings: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  setTheme: (theme: "dark" | "light") => Promise<void>;
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: { theme: "dark" },
  isLoading: true,

  loadSettings: async () => {
    set({ isLoading: true });
    const data = await loadData();
    applyTheme(data.settings.theme);
    set({ settings: data.settings, isLoading: false });
  },

  toggleTheme: async () => {
    const newTheme = get().settings.theme === "dark" ? "light" : "dark";
    const data = await loadData();
    data.settings.theme = newTheme;
    await saveData(data);
    applyTheme(newTheme);
    set({ settings: { theme: newTheme } });
  },

  setTheme: async (theme) => {
    const data = await loadData();
    data.settings.theme = theme;
    await saveData(data);
    applyTheme(theme);
    set({ settings: { theme } });
  },
}));
