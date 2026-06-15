import { Globe, Bookmark, Heart, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  totalWebsites: number;
  totalCategories: number;
  totalFavorites: number;
}

export function DashboardStats({
  totalWebsites,
  totalCategories,
  totalFavorites,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard title="Websites" value={totalWebsites} icon={Globe} />
      <StatCard title="Categories" value={totalCategories} icon={Bookmark} />
      <StatCard title="Favorites" value={totalFavorites} icon={Heart} />
    </div>
  );
}
