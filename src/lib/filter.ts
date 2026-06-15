import type { Website, Category } from "@/types";

export function filterWebsites(
  websites: Website[],
  searchQuery: string,
  categoryId: string | null
): Website[] {
  let filtered = websites;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.url.toLowerCase().includes(q)
    );
  }

  if (categoryId) {
    filtered = filtered.filter((w) => w.categoryId === categoryId);
  }

  return filtered;
}

export function getCategoryName(categories: Category[], categoryId: string | null): string {
  if (!categoryId) return "Uncategorized";
  const cat = categories.find((c) => c.id === categoryId);
  return cat?.name ?? "Uncategorized";
}
