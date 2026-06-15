import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/uiStore";

export function Header() {
  const searchQuery = useUIStore((s) => s.searchQuery);
  const setSearchQuery = useUIStore((s) => s.setSearchQuery);
  const openAddDialog = useUIStore((s) => s.openAddDialog);

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border px-6">
      <h1 className="text-lg font-semibold">LinkHub</h1>
      <div className="flex-1" />
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          placeholder="Search websites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button onClick={openAddDialog}>
        <Plus className="h-4 w-4" />
        Add Website
      </Button>
    </header>
  );
}
