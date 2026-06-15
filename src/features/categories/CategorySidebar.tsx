import { FolderPlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/stores/categoryStore";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

export function CategorySidebar() {
  const categories = useCategoryStore((s) => s.categories);
  const deleteCategory = useCategoryStore((s) => s.deleteCategory);
  const selectedCategoryId = useUIStore((s) => s.selectedCategoryId);
  const setSelectedCategory = useUIStore((s) => s.setSelectedCategory);
  const openAddCategoryDialog = useUIStore((s) => s.openAddCategoryDialog);
  const openEditCategoryDialog = useUIStore((s) => s.openEditCategoryDialog);

  return (
    <aside className="w-56 border-r border-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Categories</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={openAddCategoryDialog}>
          <FolderPlus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover",
            selectedCategoryId === null ? "bg-surface-hover text-foreground" : "text-muted"
          )}
        >
          All Websites
        </button>
        {categories.map((cat) => (
          <div key={cat.id} className="group flex items-center">
            <button
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover",
                selectedCategoryId === cat.id ? "bg-surface-hover text-foreground" : "text-muted"
              )}
            >
              {cat.name}
            </button>
            {cat.name !== "Uncategorized" && (
              <div className="hidden group-hover:flex items-center gap-0.5">
                <button
                  onClick={() => openEditCategoryDialog(cat.id, cat.name)}
                  className="rounded p-1 text-muted hover:text-foreground"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="rounded p-1 text-muted hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
