import { create } from "zustand";
import type { Website } from "@/types";
import { loadData, saveData } from "@/lib/storage";

interface WebsiteState {
  websites: Website[];
  isLoading: boolean;
  loadWebsites: () => Promise<void>;
  addWebsite: (website: Omit<Website, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateWebsite: (id: string, data: Partial<Website>) => Promise<void>;
  deleteWebsite: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
}

export const useWebsiteStore = create<WebsiteState>((set, get) => ({
  websites: [],
  isLoading: true,

  loadWebsites: async () => {
    set({ isLoading: true });
    const data = await loadData();
    set({ websites: data.websites, isLoading: false });
  },

  addWebsite: async (website) => {
    const data = await loadData();
    const now = new Date().toISOString();
    const newWebsite: Website = {
      ...website,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    data.websites.push(newWebsite);
    await saveData(data);
    set({ websites: [...get().websites, newWebsite] });
  },

  updateWebsite: async (id, data) => {
    const storeData = await loadData();
    const index = storeData.websites.findIndex((w) => w.id === id);
    if (index === -1) return;
    storeData.websites[index] = {
      ...storeData.websites[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await saveData(storeData);
    set({
      websites: get().websites.map((w) =>
        w.id === id ? { ...w, ...data, updatedAt: new Date().toISOString() } : w
      ),
    });
  },

  deleteWebsite: async (id) => {
    const data = await loadData();
    data.websites = data.websites.filter((w) => w.id !== id);
    await saveData(data);
    set({ websites: get().websites.filter((w) => w.id !== id) });
  },

  toggleFavorite: async (id) => {
    const data = await loadData();
    const website = data.websites.find((w) => w.id === id);
    if (!website) return;
    website.favorite = !website.favorite;
    website.updatedAt = new Date().toISOString();
    await saveData(data);
    set({
      websites: get().websites.map((w) =>
        w.id === id ? { ...w, favorite: !w.favorite, updatedAt: new Date().toISOString() } : w
      ),
    });
  },
}));
