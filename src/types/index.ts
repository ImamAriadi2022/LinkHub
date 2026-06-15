export interface Website {
  id: string;
  name: string;
  url: string;
  categoryId: string | null;
  icon: string | null;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface AppSettings {
  theme: "dark" | "light";
}

export interface AppData {
  settings: AppSettings;
  categories: Category[];
  websites: Website[];
}
