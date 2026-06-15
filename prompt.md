Anda adalah Senior Software Engineer, Senior UI/UX Designer, dan Technical Lead.

Tugas Anda adalah merancang dan membangun aplikasi desktop bernama LinkHub menggunakan Tauri v2 + React + TypeScript.

Deskripsi Project

LinkHub adalah aplikasi desktop yang berfungsi sebagai launcher dan organizer website.

Tujuan aplikasi:

Menyimpan daftar website favorit pengguna.
Membuka website dengan cepat.
Mengelompokkan website berdasarkan kategori.
Menyimpan seluruh data secara lokal.
Tidak menggunakan backend.
Tidak menggunakan server.
Tidak menggunakan cloud.
Seluruh data disimpan pada file JSON lokal.

Target platform:

Windows Desktop
Tauri v2
Tahap 1 - Project Planning

Sebelum menulis kode:

Buat analisis kebutuhan aplikasi.
Buat daftar fitur MVP.
Buat struktur folder project.
Buat arsitektur aplikasi.
Buat flow aplikasi.
Buat database schema berbasis JSON.
Buat roadmap implementasi.

Tampilkan hasil planning terlebih dahulu.

Tahap 2 - Setup Project

Gunakan stack berikut:

Frontend:

React
TypeScript
Vite

Desktop:

Tauri v2

State Management:

Zustand

Styling:

TailwindCSS

UI Components:

shadcn/ui

Icons:

Lucide React

Data Storage:

JSON File Local
Tahap 3 - UI Design

Buat desain modern dengan karakteristik:

Clean
Minimalist
Modern SaaS Style
Dark Mode Default
Responsive Desktop Layout
Smooth Animation

Inspirasi:

Arc Browser
Linear
Raycast
Notion
Vercel Dashboard

Warna utama:

Primary: #4F46E5
Secondary: #06B6D4
Background: #09090B
Surface: #18181B
Tahap 4 - Implementasi MVP

Implementasikan fitur berikut.

Dashboard

Menampilkan:

Jumlah website
Jumlah kategori
Website favorit
Website List

Menampilkan seluruh website.

Card berisi:

Icon
Nama website
URL
Kategori
Favorite Status

Aksi:

Open
Edit
Delete
Add Website

Form:

Name
URL
Category
Icon URL (optional)
Favorite

Validasi:

URL wajib valid
Tidak boleh kosong
Edit Website

User dapat mengubah seluruh data website.

Delete Website

Tampilkan dialog konfirmasi sebelum menghapus.

Favorite Website

User dapat:

Menandai favorit
Menghapus favorit
Search

Pencarian realtime berdasarkan:

Nama
URL
Kategori
Category

User dapat:

Membuat kategori
Menghapus kategori
Mengedit kategori
Tahap 5 - Local Storage

Jangan gunakan database.

Gunakan file JSON lokal.

Buat struktur:

{
  "settings": {},
  "categories": [],
  "websites": []
}

Lokasi penyimpanan:

Windows:

%APPDATA%/LinkHub/data.json

Aplikasi harus:

Membuat file otomatis jika belum ada
Membaca file saat startup
Menulis perubahan secara realtime
Tahap 6 - Website Opening

Saat tombol Open ditekan:

Gunakan plugin resmi Tauri.

Prioritas:

Buka menggunakan browser default sistem.

Jangan menggunakan iframe.

Jangan membuat browser internal.

Gunakan URL eksternal.

Tahap 7 - User Experience

Tambahkan:

Toast Notification
Loading State
Empty State
Skeleton Loading
Confirmation Dialog
Keyboard Shortcut

Shortcut:

Ctrl + N = Tambah Website
Ctrl + F = Search
Tahap 8 - Application Settings

Buat halaman Settings.

Fitur:

Dark Mode
Light Mode
Export JSON
Import JSON
Backup Data
Restore Data
Tahap 9 - Project Quality

Wajib:

TypeScript Strict Mode
Reusable Components
Custom Hooks
Error Handling
Form Validation
Clean Architecture

Gunakan:

Feature Based Folder Structure
Tahap 10 - Tauri Build

Siapkan aplikasi agar dapat dibuild menjadi:

npm run tauri build

Hasil:

LinkHub.exe

Pastikan:

Data user tidak hilang saat update aplikasi.
Data tersimpan di AppData.
Tidak membutuhkan internet untuk berjalan.
Tahap 11 - Deliverables

Berikan:

Struktur folder final.
Seluruh source code.
Penjelasan setiap module.
Langkah instalasi.
Langkah development.
Langkah build release.
Langkah membuat installer Windows.
Daftar improvement untuk versi 2.0.

Kerjakan secara bertahap.

Jangan langsung menghasilkan seluruh source code sekaligus.

Mulai dari:

Analisis kebutuhan.
Planning.
Arsitektur.
Setup project.

Tunggu persetujuan sebelum lanjut ke tahap implementasi berikutnya.