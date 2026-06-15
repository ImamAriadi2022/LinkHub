import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { validateUrl } from "@/lib/url";
import type { Website, Category } from "@/types";

interface WebsiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    url: string;
    categoryId: string | null;
    icon: string | null;
    favorite: boolean;
  }) => void;
  categories: Category[];
  website?: Website | null;
}

export function WebsiteDialog({
  open,
  onOpenChange,
  onSubmit,
  categories,
  website,
}: WebsiteDialogProps) {
  const [name, setName] = useState(website?.name ?? "");
  const [url, setUrl] = useState(website?.url ?? "");
  const [categoryId, setCategoryId] = useState<string | null>(website?.categoryId ?? categories[0]?.id ?? null);
  const [favorite, setFavorite] = useState(website?.favorite ?? false);
  const [errors, setErrors] = useState<{ name?: string; url?: string }>({});

  function resetForm() {
    setName(website?.name ?? "");
    setUrl(website?.url ?? "");
    setCategoryId(website?.categoryId ?? categories[0]?.id ?? null);
    setFavorite(website?.favorite ?? false);
    setErrors({});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { name?: string; url?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!validateUrl(url)) {
      newErrors.url = "Invalid URL (must start with http:// or https://)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: name.trim(),
      url: url.trim(),
      categoryId,
      icon: null,
      favorite,
    });

    resetForm();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{website ? "Edit Website" : "Add Website"}</DialogTitle>
          <DialogDescription>
            {website ? "Update the website details below." : "Fill in the details to add a new website."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Website"
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
            {errors.url && <p className="text-xs text-destructive">{errors.url}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(e.target.value || null)}
              className="flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="favorite"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-surface text-primary focus:ring-primary"
            />
            <Label htmlFor="favorite">Mark as favorite</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{website ? "Save Changes" : "Add Website"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
