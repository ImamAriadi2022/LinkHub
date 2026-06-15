import { useEffect } from "react";
import { useWebsiteStore } from "@/stores/websiteStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useUIStore } from "@/stores/uiStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { DashboardStats } from "@/features/dashboard/DashboardStats";
import { WebsiteCard } from "@/features/websites/WebsiteCard";
import { WebsiteDialog } from "@/features/websites/WebsiteDialog";
import { CategoryDialog } from "@/features/categories/CategoryDialog";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { CategorySidebar } from "@/features/categories/CategorySidebar";
import { Header } from "@/components/layout/Header";
import { toast } from "@/hooks/use-toast";
import { filterWebsites, getCategoryName } from "@/lib/filter";

export function DashboardPage() {
  const websites = useWebsiteStore((s) => s.websites);
  const loadWebsites = useWebsiteStore((s) => s.loadWebsites);
  const addWebsite = useWebsiteStore((s) => s.addWebsite);
  const updateWebsite = useWebsiteStore((s) => s.updateWebsite);
  const deleteWebsite = useWebsiteStore((s) => s.deleteWebsite);
  const toggleFavorite = useWebsiteStore((s) => s.toggleFavorite);

  const categories = useCategoryStore((s) => s.categories);
  const loadCategories = useCategoryStore((s) => s.loadCategories);
  const addCategory = useCategoryStore((s) => s.addCategory);
  const updateCategory = useCategoryStore((s) => s.updateCategory);

  const loadSettings = useSettingsStore((s) => s.loadSettings);

  const searchQuery = useUIStore((s) => s.searchQuery);
  const selectedCategoryId = useUIStore((s) => s.selectedCategoryId);
  const isAddDialogOpen = useUIStore((s) => s.isAddDialogOpen);
  const isEditDialogOpen = useUIStore((s) => s.isEditDialogOpen);
  const isDeleteDialogOpen = useUIStore((s) => s.isDeleteDialogOpen);
  const isAddCategoryDialogOpen = useUIStore((s) => s.isAddCategoryDialogOpen);
  const isEditCategoryDialogOpen = useUIStore((s) => s.isEditCategoryDialogOpen);
  const editingWebsite = useUIStore((s) => s.editingWebsite);
  const deletingWebsiteId = useUIStore((s) => s.deletingWebsiteId);
  const editingCategoryId = useUIStore((s) => s.editingCategoryId);
  const editingCategoryName = useUIStore((s) => s.editingCategoryName);
  const openAddDialog = useUIStore((s) => s.openAddDialog);
  const closeAddDialog = useUIStore((s) => s.closeAddDialog);
  const openEditDialog = useUIStore((s) => s.openEditDialog);
  const closeEditDialog = useUIStore((s) => s.closeEditDialog);
  const openDeleteDialog = useUIStore((s) => s.openDeleteDialog);
  const closeDeleteDialog = useUIStore((s) => s.closeDeleteDialog);
  const openAddCategoryDialog = useUIStore((s) => s.openAddCategoryDialog);
  const closeAddCategoryDialog = useUIStore((s) => s.closeAddCategoryDialog);
  const openEditCategoryDialog = useUIStore((s) => s.openEditCategoryDialog);
  const closeEditCategoryDialog = useUIStore((s) => s.closeEditCategoryDialog);

  useEffect(() => {
    Promise.all([loadWebsites(), loadCategories(), loadSettings()]);
  }, [loadWebsites, loadCategories, loadSettings]);

  const filteredWebsites = filterWebsites(websites, searchQuery, selectedCategoryId);
  const favoriteWebsites = websites.filter((w) => w.favorite);

  async function handleAdd(data: {
    name: string;
    url: string;
    categoryId: string | null;
    icon: string | null;
    favorite: boolean;
  }) {
    try {
      await addWebsite(data);
      toast({ title: "Website added", description: `${data.name} has been added.` });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to add website." });
    }
  }

  async function handleEdit(data: {
    name: string;
    url: string;
    categoryId: string | null;
    icon: string | null;
    favorite: boolean;
  }) {
    if (!editingWebsite) return;
    try {
      await updateWebsite(editingWebsite.id, data);
      toast({ title: "Website updated", description: `${data.name} has been updated.` });
      closeEditDialog();
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to update website." });
    }
  }

  async function handleDelete() {
    if (!deletingWebsiteId) return;
    try {
      await deleteWebsite(deletingWebsiteId);
      toast({ title: "Website deleted", description: "The website has been removed." });
      closeDeleteDialog();
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete website." });
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <CategorySidebar />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {!searchQuery && !selectedCategoryId && (
            <DashboardStats
              totalWebsites={websites.length}
              totalCategories={categories.length}
              totalFavorites={favoriteWebsites.length}
            />
          )}

          {filteredWebsites.length === 0 ? (
            <EmptyState
              title={
                searchQuery
                  ? "No results found"
                  : selectedCategoryId
                  ? "No websites in this category"
                  : "No websites yet"
              }
              description={
                searchQuery
                  ? "Try a different search term."
                  : selectedCategoryId
                  ? "Add a website to this category."
                  : "Click 'Add Website' to get started."
              }
            />
          ) : (
            <div className="space-y-2">
              {filteredWebsites.map((website) => (
                <WebsiteCard
                  key={website.id}
                  website={website}
                  categoryName={getCategoryName(categories, website.categoryId)}
                  onEdit={openEditDialog}
                  onDelete={openDeleteDialog}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <WebsiteDialog
        open={isAddDialogOpen}
        onOpenChange={(v) => (v ? openAddDialog() : closeAddDialog())}
        onSubmit={handleAdd}
        categories={categories}
      />

      <WebsiteDialog
        open={isEditDialogOpen}
        onOpenChange={(v) => (v ? openEditDialog(editingWebsite!) : closeEditDialog())}
        onSubmit={handleEdit}
        categories={categories}
        website={editingWebsite}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={(v) => (v ? openDeleteDialog(deletingWebsiteId!) : closeDeleteDialog())}
        onConfirm={handleDelete}
        title="Delete Website"
        description="Are you sure you want to delete this website? This action cannot be undone."
      />

      <CategoryDialog
        open={isAddCategoryDialogOpen}
        onOpenChange={(v) => (v ? openAddCategoryDialog() : closeAddCategoryDialog())}
        onSubmit={async (name) => {
          await addCategory(name);
          toast({ title: "Category added", description: `"${name}" has been created.` });
        }}
        mode="add"
      />

      <CategoryDialog
        open={isEditCategoryDialogOpen}
        onOpenChange={(v) =>
          v ? openEditCategoryDialog(editingCategoryId!, editingCategoryName) : closeEditCategoryDialog()
        }
        onSubmit={async (name) => {
          if (editingCategoryId) {
            await updateCategory(editingCategoryId, name);
            toast({ title: "Category updated", description: `Renamed to "${name}".` });
          }
        }}
        mode="edit"
        initialName={editingCategoryName}
      />
    </div>
  );
}
