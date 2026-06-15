# Changelog

Format: `[YYYY-MM-DD] | <jenis> | <deskripsi>`
Jenis: `Added`, `Changed`, `Fixed`, `Removed`, `Refactored`

---

[2026-06-15] | Added | Membuat folder .docs/ untuk dokumentasi perubahan
[2026-06-15] | Changed | Merevisi skill document-changes agar mencatat perubahan di .docs/ bukan AGENTS.md
[2026-06-15] | Added | Project Planning — analisis, MVP, struktur folder, arsitektur, flow, schema JSON, roadmap
[2026-06-15] | Added | Scaffold Tauri v2 + React + TS + Vite project
[2026-06-15] | Added | Install dependencies: TailwindCSS v4, Zustand, Lucide React, shadcn/ui components
[2026-06-15] | Added | Setup folder structure (features, components/ui, hooks, stores, lib, types)
[2026-06-15] | Added | Konfigurasi TailwindCSS v4 + CSS custom properties untuk tema dark mode
[2026-06-15] | Added | UI components: Button, Input, Label, Card, Dialog, Toast, DropdownMenu
[2026-06-15] | Added | Types: Website, Category, AppSettings, AppData
[2026-06-15] | Added | Utility: cn() (clsx + tailwind-merge)
[2026-06-15] | Added | Hook: use-toast (toast notification system)
[2026-06-15] | Added | Tauri plugin: opener (buka browser), fs (baca/tulis file JSON)
[2026-06-15] | Changed | Update tauri.conf.json: title LinkHub, window size 1100x720, min 800x500
[2026-06-15] | Added | Storage service (src/lib/storage.ts) — baca/tulis data.json via Tauri fs plugin
[2026-06-15] | Added | Zustand stores: websiteStore, categoryStore, settingsStore, uiStore
[2026-06-15] | Added | Layout: Sidebar navigasi (Dashboard/Settings), Header (search + add)
[2026-06-15] | Added | Dashboard page — stats cards, website list, filterable by category
[2026-06-15] | Added | Website components — Card, Add/Edit Dialog, Delete Confirm Dialog
[2026-06-15] | Added | Category management — Sidebar list, Add/Edit Dialog, auto "Uncategorized"
[2026-06-15] | Added | Settings page — theme toggle (dark/light), export/import JSON
[2026-06-15] | Added | Keyboard shortcuts — Ctrl+N (add website), Ctrl+F (focus search)
[2026-06-15] | Added | URL utilities — validation, favicon extraction, domain parsing
