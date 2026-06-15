import { create } from "zustand";
import type { Category } from "@/types";
import { loadData, saveData } from "@/lib/storage";

interface CategoryState {
  categories: Category[];
  loadCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],

  loadCategories: async () => {
    const data = await loadData();
    set({ categories: data.categories });
  },

  addCategory: async (name) => {
    const data = await loadData();
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    data.categories.push(newCategory);
    await saveData(data);
    set({ categories: [...get().categories, newCategory] });
  },

  updateCategory: async (id, name) => {
    const data = await loadData();
    const category = data.categories.find((c) => c.id === id);
    if (!category) return;
    category.name = name;
    await saveData(data);
    set({
      categories: get().categories.map((c) =>
        c.id === id ? { ...c, name } : c
      ),
    });
  },

  deleteCategory: async (id) => {
    const data = await loadData();
    data.categories = data.categories.filter((c) => c.id !== id);
    // pindahkan website ke Uncategorized
    const uncategorized = data.categories.find((c) => c.name === "Uncategorized")
      || { id: crypto.randomUUID(), name: "Uncategorized", createdAt: new Date().toISOString() };
    if (!data.categories.find((c) => c.name === "Uncategorized")) {
      data.categories.push(uncategorized);
    }
    data.websites = data.websites.map((w) =>
      w.categoryId === id ? { ...w, categoryId: uncategorized.id } : w
    );
    await saveData(data);
    set({
      categories: get().categories.filter((c) => c.id !== id),
    });
  },
}));
