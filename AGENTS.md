# AGENTS.md

## Project Overview

LinkHub adalah aplikasi desktop berbasis Tauri yang digunakan untuk menyimpan, mengelola, dan membuka website favorit pengguna dari satu dashboard.

Aplikasi bersifat:

* Local First
* Offline First
* Tanpa Backend
* Tanpa Server
* Tanpa Cloud
* Data disimpan menggunakan file JSON lokal

Target platform:

* Windows Desktop

Tech Stack:

* Tauri v2
* React
* TypeScript
* Vite
* TailwindCSS
* shadcn/ui
* Zustand
* Lucide React

---

# Mission

Bangun aplikasi yang ringan, cepat, modern, dan mudah digunakan.

Prioritas utama:

1. User Experience
2. Maintainability
3. Simplicity
4. Performance

Jangan menambahkan kompleksitas yang tidak diperlukan.

---

# Architecture Principles

## Local First

Seluruh data wajib disimpan secara lokal.

Jangan gunakan:

* Backend API
* Firebase
* Supabase
* MongoDB Atlas
* Cloud Database

Gunakan:

* JSON File Storage

Lokasi data:

Windows:

%APPDATA%/LinkHub/data.json

---

## Single Source of Truth

Semua data aplikasi berasal dari:

data.json

Jangan membuat sumber data lain kecuali diperlukan.

---

## Feature Based Structure

Gunakan struktur berikut:

src/

features/
dashboard/
websites/
categories/
settings/

components/
hooks/
stores/
services/
types/
utils/

---

# Coding Standards

## TypeScript

Wajib menggunakan:

strict: true

Jangan gunakan:

* any
* ts-ignore

Gunakan tipe yang eksplisit.

---

## React

Gunakan:

* Functional Components
* Custom Hooks
* Composition Pattern

Hindari:

* Class Components
* Prop Drilling berlebihan

---

## State Management

Gunakan Zustand.

Gunakan state global hanya jika benar-benar diperlukan.

Prioritaskan local state terlebih dahulu.

---

# UI Guidelines

## Design Language

Karakteristik UI:

* Modern
* Minimal
* Professional
* Fast
* Clean

Inspirasi:

* Linear
* Raycast
* Arc Browser
* Notion
* Vercel

---

## Default Theme

Dark Mode

Color Palette:

Primary: #4F46E5
Secondary: #06B6D4
Background: #09090B
Surface: #18181B

---

## UX Requirements

Setiap fitur wajib memiliki:

* Loading State
* Error State
* Empty State
* Success Feedback

Gunakan:

* Toast
* Dialog
* Confirmation Modal

---

# Website Management Rules

Website memiliki struktur:

{
"id": "",
"name": "",
"url": "",
"categoryId": "",
"favorite": false,
"createdAt": "",
"updatedAt": ""
}

---

# URL Validation

Wajib memvalidasi URL.

Tolak:

javascript:
data:
file:

Terima:

https://

dan

http://

---

# Open Website Rules

Saat user membuka website:

Gunakan browser default sistem.

Jangan gunakan:

* iframe
* embedded browser
* internal browser

Gunakan plugin resmi Tauri.

---

# Storage Rules

Data harus dibuat otomatis jika file belum ada.

Contoh struktur:

{
"settings": {},
"categories": [],
"websites": []
}

Aplikasi harus tetap berjalan walaupun file kosong.

---

# Category Rules

Kategori dapat:

* ditambah
* diubah
* dihapus

Jika kategori dihapus:

website tetap ada.

Pindahkan website ke kategori:

"Uncategorized"

---

# Error Handling

Jangan pernah crash aplikasi.

Jika terjadi error:

* tampilkan toast
* log error
* pertahankan state aplikasi

---

# Security Rules

Jangan pernah menjalankan URL sebagai kode.

Jangan pernah menggunakan:

dangerouslySetInnerHTML

Jangan pernah mengeksekusi input user.

Selalu sanitasi input.

---

# Performance Rules

Target:

* Startup < 2 detik
* UI responsif
* Tidak ada rerender yang tidak perlu

Gunakan:

* memo
* lazy loading
* code splitting

jika memang diperlukan.

---

# Accessibility

Gunakan:

* aria-label
* semantic html
* keyboard navigation

Minimal:

Tab navigation harus berfungsi.

---

# Build Requirements

Project harus dapat dibuild menggunakan:

npm run tauri build

Output:

LinkHub Installer

Data user tidak boleh hilang setelah update aplikasi.

---

# Development Workflow

Sebelum membuat kode:

1. Analisis kebutuhan
2. Buat rencana implementasi
3. Identifikasi risiko
4. Implementasi
5. Review kode
6. Refactor bila perlu

Jangan langsung menghasilkan kode besar sekaligus.

Kerjakan per fitur.

---

# AI Agent Behavior

Saat menemukan keputusan yang kurang optimal:

* Jelaskan masalahnya
* Berikan alternatif
* Berikan trade-off
* Rekomendasikan solusi terbaik

Jangan hanya mengikuti instruksi secara literal.

Bertindak sebagai:

* Senior Software Engineer
* Technical Lead
* Code Reviewer
* System Architect

Tujuan utama adalah menghasilkan kode yang maintainable, scalable, dan mudah dipahami.
