import { create } from "zustand";
import type { Website } from "@/types";

interface UIState {
  searchQuery: string;
  selectedCategoryId: string | null;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  editingWebsite: Website | null;
  isDeleteDialogOpen: boolean;
  deletingWebsiteId: string | null;
  isAddCategoryDialogOpen: boolean;
  isEditCategoryDialogOpen: boolean;
  editingCategoryId: string | null;
  editingCategoryName: string;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  openAddDialog: () => void;
  closeAddDialog: () => void;
  openEditDialog: (website: Website) => void;
  closeEditDialog: () => void;
  openDeleteDialog: (id: string) => void;
  closeDeleteDialog: () => void;
  openAddCategoryDialog: () => void;
  closeAddCategoryDialog: () => void;
  openEditCategoryDialog: (id: string, name: string) => void;
  closeEditCategoryDialog: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchQuery: "",
  selectedCategoryId: null,
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  editingWebsite: null,
  isDeleteDialogOpen: false,
  deletingWebsiteId: null,
  isAddCategoryDialogOpen: false,
  isEditCategoryDialogOpen: false,
  editingCategoryId: null,
  editingCategoryName: "",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (categoryId) => set({ selectedCategoryId: categoryId }),
  openAddDialog: () => set({ isAddDialogOpen: true }),
  closeAddDialog: () => set({ isAddDialogOpen: false }),
  openEditDialog: (website) => set({ isEditDialogOpen: true, editingWebsite: website }),
  closeEditDialog: () => set({ isEditDialogOpen: false, editingWebsite: null }),
  openDeleteDialog: (id) => set({ isDeleteDialogOpen: true, deletingWebsiteId: id }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false, deletingWebsiteId: null }),
  openAddCategoryDialog: () => set({ isAddCategoryDialogOpen: true }),
  closeAddCategoryDialog: () => set({ isAddCategoryDialogOpen: false }),
  openEditCategoryDialog: (id, name) =>
    set({ isEditCategoryDialogOpen: true, editingCategoryId: id, editingCategoryName: name }),
  closeEditCategoryDialog: () =>
    set({ isEditCategoryDialogOpen: false, editingCategoryId: null, editingCategoryName: "" }),
}));
