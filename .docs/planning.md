# Project Planning — LinkHub

## 1. Analisis Kebutuhan

### User Stories
- User dapat menambahkan website (nama, URL, kategori, icon, favorite)
- User dapat mengedit website
- User dapat menghapus website dengan konfirmasi
- User dapat mengelompokkan website ke kategori
- User dapat membuat/mengedit/menghapus kategori
- User dapat mencari website secara realtime
- User dapat menandai/menghapus favorit
- User dapat membuka website di browser default
- User dapat mengganti tema dark/light
- User dapat export/import data JSON
- Aplikasi berjalan offline penuh
- Data tersimpan di %APPDATA%/LinkHub/data.json

### Batasan
- Local first, offline first
- Tanpa backend, server, cloud
- Target: Windows Desktop
- Stack: Tauri v2 + React + TypeScript

---

## 2. Fitur MVP

| # | Fitur | Prioritas |
|---|-------|-----------|
| 1 | Dashboard — statistik (total website, kategori, favorit) | Tinggi |
| 2 | Website CRUD — tambah, lihat, edit, hapus | Tinggi |
| 3 | Category Management — CRUD kategori | Tinggi |
| 4 | Favorite — tandai/hapus favorit | Tinggi |
| 5 | Search — pencarian realtime (nama, URL, kategori) | Tinggi |
| 6 | Open Website — buka di browser default | Tinggi |
| 7 | Local JSON Storage — auto create, read, write | Tinggi |
| 8 | Settings — theme toggle, export/import JSON | Sedang |
| 9 | UX — toast, loading, empty state, konfirmasi, shortcut | Sedang |

---

## 3. Struktur Folder

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout (Sidebar, Header)
│   └── shared/          # ConfirmDialog, EmptyState, Skeleton
├── features/
│   ├── dashboard/       # Dashboard page & stats
│   ├── websites/        # Website CRUD components
│   ├── categories/      # Category management
│   └── settings/        # Settings page
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (storage, validation)
├── stores/              # Zustand stores
├── types/               # TypeScript definitions
├── App.tsx
└── main.tsx
```

---

## 4. Arsitektur Aplikasi

### Layers
```
┌──────────────────────────────┐
│   UI Layer (React Components)│
│   shadcn/ui + TailwindCSS     │
├──────────────────────────────┤
│   State Layer (Zustand)      │
│   stores: website, category   │
│   settings, ui               │
├──────────────────────────────┤
│   Service Layer (lib/)       │
│   storageService → Tauri fs  │
├──────────────────────────────┤
│   Tauri Backend (Rust)       │
│   fs plugin → JSON file      │
└──────────────────────────────┘
```

### Data Flow
```
Action → Component → Store → Service → Tauri FS → data.json
                                                       ↓
UI ← Store update ← Service ← Tauri FS ← data.json
```

---

## 5. Flow Aplikasi

1. **Startup:** Read data.json → populate Zustand stores
2. **Dashboard:** Stats cards + Website grid
3. **Add:** Click "+" → Modal form → validasi → save → toast
4. **Edit:** Click edit → Modal pre-filled → validasi → save → toast
5. **Delete:** Click delete → Confirm dialog → hapus → toast
6. **Open:** Click open → shell.open() di browser default
7. **Favorite:** Click star → toggle → save → toast
8. **Search:** Ketik → realtime filter by name/URL/category
9. **Category:** CRUD via modal → auto-assign "Uncategorized" jika dihapus
10. **Settings:** Theme toggle → export/import JSON

---

## 6. Database Schema (JSON)

```json
{
  "settings": {
    "theme": "dark"
  },
  "categories": [
    {
      "id": "uuid-v4",
      "name": "Uncategorized",
      "createdAt": "2026-06-15T...Z"
    }
  ],
  "websites": [
    {
      "id": "uuid-v4",
      "name": "string",
      "url": "https://...",
      "categoryId": "uuid | null",
      "icon": "https://... | null",
      "favorite": false,
      "createdAt": "2026-06-15T...Z",
      "updatedAt": "2026-06-15T...Z"
    }
  ]
}
```

### Validasi URL
- Tolak: `javascript:`, `data:`, `file:`
- Terima: `https://`, `http://`

---

## 7. Roadmap Implementasi

| Phase | Fokus | Output |
|-------|-------|--------|
| 1 | Setup Project | Tauri v2 + React + TS + Tailwind + shadcn/ui |
| 2 | Storage + Stores | JSON service + Zustand stores |
| 3 | Dashboard + Website CRUD | Halaman utama + form |
| 4 | Category Management | CRUD kategori + filter |
| 5 | Search + Favorite | Pencarian + toggle favorit |
| 6 | Settings + UX | Theme, export/import, toast, loading |
| 7 | Polish | Shortcut, error handling, accessibility |
| 8 | Build | npm run tauri build → LinkHub.exe |
