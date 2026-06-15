---
name: document-changes
description: Wajib mendokumentasikan setiap perubahan kode di folder .docs/ dan menjaga AGENTS.md tetap akurat dengan deskripsi project.
---

# Document Changes Skill

## Behavior

Setiap kali Anda melakukan perubahan pada codebase (menambah, mengedit, atau menghapus file), Anda WAJIB:

1. **Buat file changelog di `.docs/`** — simpan catatan perubahan dalam format:
   ```
   [YYYY-MM-DD] | <Added/Changed/Fixed/Removed/Refactored> | <deskripsi singkat>
   ```
   - Satu file per sesi/task, atau tambahkan ke file `.docs/changelog.md` yang sudah ada.

2. **Update Struktur Folder & Tech Stack** di `AGENTS.md` jika ada perubahan struktur atau teknologi yang digunakan.

3. **Jika membuat fitur baru**, tambahkan deskripsi singkat di bagian deskripsi project jika perlu.

## Trigger

Skill ini aktif secara **otomatis** setiap kali Anda selesai melakukan task yang memodifikasi file dalam repository ini.
