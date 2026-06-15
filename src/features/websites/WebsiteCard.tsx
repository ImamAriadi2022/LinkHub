import { ExternalLink, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFaviconUrl, getDomainName } from "@/lib/url";
import type { Website } from "@/types";
import { openUrl } from "@/lib/openUrl";

interface WebsiteCardProps {
  website: Website;
  categoryName: string;
  onEdit: (website: Website) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function WebsiteCard({
  website,
  categoryName,
  onEdit,
  onDelete,
  onToggleFavorite,
}: WebsiteCardProps) {
  return (
    <Card className="group flex items-center gap-4 p-4 transition-colors hover:bg-card-hover">
      <img
        src={getFaviconUrl(website.url)}
        alt=""
        className="h-10 w-10 rounded-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234F46E5'><rect width='24' height='24' rx='4'/></svg>";
        }}
      />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">{website.name}</p>
        <p className="truncate text-xs text-muted">{getDomainName(website.url)}</p>
        <span className="inline-block mt-1 rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted">
          {categoryName}
        </span>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleFavorite(website.id)}
          title={website.favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={`h-4 w-4 ${website.favorite ? "fill-yellow-500 text-yellow-500" : ""}`}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => openUrl(website.url)}
          title="Open website"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(website)}
          title="Edit website"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(website.id)}
          title="Delete website"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </Card>
  );
}
