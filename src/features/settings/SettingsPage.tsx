import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettingsStore } from "@/stores/settingsStore";
import { loadData, saveData } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";

export function SettingsPage() {
  const { settings, toggleTheme } = useSettingsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleExport() {
    try {
      const data = await loadData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `linkhub-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Export successful", description: "Data has been exported." });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to export data." });
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.websites || !data.categories || !data.settings) {
        throw new Error("Invalid data format");
      }
      await saveData(data);
      toast({ title: "Import successful", description: "Data has been imported. Please restart the app." });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Invalid JSON file." });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted">Manage your application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted">
                Current: {settings.theme === "dark" ? "Dark Mode" : "Light Mode"}
              </p>
            </div>
            <Button variant="outline" onClick={toggleTheme}>
              Toggle {settings.theme === "dark" ? "Light" : "Dark"} Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Export Data</p>
              <p className="text-xs text-muted">Download your data as a JSON file.</p>
            </div>
            <Button variant="outline" onClick={handleExport}>
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Import Data</p>
              <p className="text-xs text-muted">Restore data from a JSON file.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
