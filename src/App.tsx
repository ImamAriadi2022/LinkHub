import { useEffect, useState } from "react";
import { Settings, LayoutDashboard } from "lucide-react";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { Toaster } from "@/components/ui/toaster";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

type Page = "dashboard" | "settings";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const openAddDialog = useUIStore((s) => s.openAddDialog);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        openAddDialog();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>("input[placeholder='Search websites...']");
        input?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openAddDialog]);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <nav className="flex w-14 flex-col items-center gap-2 border-r border-border py-4">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
              currentPage === "dashboard"
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:text-foreground"
            )}
            title="Dashboard"
          >
            <LayoutDashboard className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentPage("settings")}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
              currentPage === "settings"
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:text-foreground"
            )}
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </nav>
        <div className="flex-1">
          {currentPage === "dashboard" ? <DashboardPage /> : <SettingsPage />}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
