# 001 — Storage Service & State Management

## Tujuan

Membangun layer penyimpanan data dan state management sebagai fondasi seluruh fitur.

## Storage Service

File: `src/lib/storage.ts`

- Menggunakan `@tauri-apps/plugin-fs` untuk baca/tulis file
- Data disimpan di `%APPDATA%/LinkHub/data.json`
- Auto-create file jika belum ada
- Fungsi: `loadData()`, `saveData()`
- Seluruh operasi baca/tulis via Tauri (tidak bisa diakses langsung dari browser)

## Zustand Stores

### websiteStore (`src/stores/websiteStore.ts`)
- State: `websites: Website[]`
- Actions: `addWebsite`, `updateWebsite`, `deleteWebsite`, `toggleFavorite`
- Setiap perubahan auto-save ke JSON

### categoryStore (`src/stores/categoryStore.ts`)
- State: `categories: Category[]`
- Actions: `addCategory`, `updateCategory`, `deleteCategory`
- Delete category → pindahkan website ke "Uncategorized"

### settingsStore (`src/stores/settingsStore.ts`)
- State: `theme: 'dark' | 'light'`, `isLoading`
- Actions: `toggleTheme`, `setTheme`
- Auto-apply theme ke `document.documentElement`

### uiStore (`src/stores/uiStore.ts`)
- State: `searchQuery`, `selectedCategoryId`, `isAddDialogOpen`, `editingWebsite`, etc.
- Actions: `setSearchQuery`, `setSelectedCategory`, `openAddDialog`, `closeAddDialog`, dll.

## Data Flow

```
User Action → Component → Zustand Action → Storage Service → data.json
                                                        ↓
UI ← Store Update ← Zustand State ← Storage Service ← data.json
```
