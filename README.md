# Muhammad Rifat Hakim — Personal Portfolio & Admin CMS

Website portofolio personal yang production-ready dan dynamic berbasis **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Supabase (PostgreSQL, Auth, Storage, RLS)**.

Hampir seluruh konten portofolio (Profil, Hero, About, Skills, Projects, Experiences, Certificates, Contact, Media Library, Site Settings) dikelola secara dinamis melalui Admin Dashboard di `/admin` tanpa hardcoding pada komponen frontend.

---

## 1. Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Monochrome Technical Editorial Theme)
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (Email & Password with Secure Sessions)
- **File & Media Storage**: Supabase Storage (`portfolio-public` & `portfolio-private` buckets)
- **Form Management**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast system)
- **Package Manager**: npm

---

## 2. Project Structure

```text
portfolio/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                      # Public Homepage (Monochrome Editorial Portfolio)
│   │   └── projects/[slug]/page.tsx      # Dynamic Project Detail Page
│   ├── admin/
│   │   ├── layout.tsx                    # Protected Admin Shell Layout
│   │   ├── login/page.tsx                # Admin Login Form
│   │   ├── dashboard/page.tsx            # CMS Dashboard Overview & Quick Actions
│   │   ├── profile/page.tsx              # Profile & Bio CMS
│   │   ├── hero/page.tsx                 # Hero Section CMS
│   │   ├── about/page.tsx                # About Section CMS
│   │   ├── skills/page.tsx               # Skills & Category Management
│   │   ├── projects/                     # Projects CRUD (List, New, [id]/edit)
│   │   ├── experiences/                  # Experiences CRUD (List, New, [id]/edit)
│   │   ├── certificates/                 # Certificates CRUD (List, New, [id]/edit)
│   │   ├── contacts/page.tsx             # Contact & Social Links Management
│   │   ├── media/page.tsx                # Media Library (Upload, Filter, Copy URL, Delete)
│   │   ├── settings/page.tsx             # Site Settings & SEO
│   │   └── account/page.tsx              # Admin Account Info
│   ├── layout.tsx                        # Root Layout with Font & Sonner Toaster
│   └── globals.css                       # Monochrome Design Tokens & Typography
├── components/
│   ├── admin/                            # Admin Shell, Sidebar, MediaUploader, DynamicList, Lists
│   ├── forms/                            # Reusable Zod-backed Form Components
│   ├── public/                           # SiteNav, Hero, Profile, Skills, Projects, Experience, Certs, Contact, Footer
│   └── ui/                               # Button, Input, Textarea, Select, Switch, Dialog, Shared Cards
├── lib/
│   ├── actions/                          # Server Actions for CRUD & Auth
│   ├── supabase/                         # Client, Server (SSR), and Admin (Service Role) Supabase Clients
│   ├── validations/                      # Zod Validation Schemas
│   └── utils.ts                          # Formatting, Slugify, & Styling Helpers
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql        # Database Schema, Tables, & Row Level Security (RLS)
│       └── 002_storage_buckets.sql       # Storage Buckets & Policies
├── docs/                                 # PRD, Tech Stack, & Design System Documentation
├── types/                                # TypeScript Interfaces & Types
├── .env.example                          # Environment Variables Template
├── .env                                  # Environment Variables (with Supabase pooler strings)
└── package.json
```

---

## 3. Database Setup (Supabase)

1. Buka project Anda di [Supabase Dashboard](https://app.supabase.com).
2. Masuk ke menu **SQL Editor** di sidebar kiri.
3. Buka file `supabase/migrations/001_initial_schema.sql` di project ini, salin seluruh kodenya dan jalankan di SQL Editor Supabase.
   - Script ini membuat seluruh tabel (`profile`, `skill_categories`, `skills`, `projects`, `project_technologies`, `project_images`, `experiences`, `experience_responsibilities`, `experience_images`, `certificates`, `contacts`, `media`, `site_settings`).
   - Script ini mengaktifkan **Row Level Security (RLS)** sehingga pengunjung publik hanya dapat membaca data berstatus `published` / `is_visible: true`.
4. Buka file `supabase/migrations/002_storage_buckets.sql`, salin kodenya dan jalankan di SQL Editor Supabase.
   - Script ini membuat bucket `portfolio-public` (untuk foto profil, thumbnail, gambar proyek, sertifikat) dan `portfolio-private` (untuk dokumen internal/CV privat).

---

## 4. Initial Admin Account Setup

Supabase Auth digunakan untuk login administrator:

1. Buka Supabase Dashboard project Anda.
2. Masuk ke menu **Authentication** → **Users**.
3. Klik tombol **Add user** → **Create user**.
4. Masukkan:
   - **User Email**: Email admin Anda (contoh: `rifathakim@example.com` atau email Anda)
   - **Password**: Password aman pilihan Anda
   - Centang **Auto Confirm User?** (agar akun langsung aktif tanpa perlu konfirmasi email).
5. Klik **Create user**.

Akun ini yang nantinya akan digunakan untuk login di `/admin/login`.

---

## 5. Environment Configuration

File `.env` dan `.env.local` sudah disiapkan. Pastikan nilai berikut terisi:

```env
# Supabase URL & Anon Key (dapat ditemukan di Supabase Dashboard -> Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://jtrxhmvkxnaozbgjiihq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Service Role Key (server-side only, jangan gunakan prefix NEXT_PUBLIC_)
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Connection Strings
DATABASE_URL="postgresql://postgres.jtrxhmvkxnaozbgjiihq:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.jtrxhmvkxnaozbgjiihq:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Catatan:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` dan `SUPABASE_SERVICE_ROLE_KEY` dapat Anda ambil langsung dari **Supabase Dashboard → Project Settings → API**.

---

## 6. How to Run Development

Jalankan perintah berikut di terminal:

```bash
# Masuk ke direktori portfolio
cd portfolio

# Install dependencies (jika belum)
npm install

# Jalankan development server
npm run dev
```

Website akan berjalan di:
- **Public Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin) (otomatis dialihkan ke `/admin/login` jika belum login)

---

## 7. How to Build & Run Production

```bash
# Build production bundle & typecheck
npm run build

# Jalankan production server
npm run start
```

---

## 8. How to Manage Content via Admin CMS

Setelah login di `/admin`:

1. **Profile (`/admin/profile`)**:
   - Masukkan Nama Lengkap, Headline, Universitas, Jurusan, Status Mahasiswa, Lokasi.
   - Atur IPK dan toggle visibilitas IPK.
   - Masukkan Bio singkat & Bio detail.
   - Upload Foto Profil dan Hero Photo.
   - Upload file CV (PDF).

2. **Hero (`/admin/hero`)**:
   - Atur teks heading utama, tagline, dan introduction yang tampil di section atas website publik.
   - Ganti Hero Photo dan toggle tombol Download CV.

3. **About (`/admin/about`)**:
   - Tulis deskripsi lengkap latar belakang dan minat Anda.

4. **Skills (`/admin/skills`)**:
   - Tambah Kategori Skill (Networking, Web Development, Backend, Tools, dll).
   - Tambah Skill, pilih kategori, tingkat keahlian (level), ikon/emoji, serta status publikasi.

5. **Projects (`/admin/projects`)**:
   - Klik **Add Project**.
   - Masukkan nama project, slug URL, ringkasan, deskripsi lengkap, latar belakang, problem, solution, peran Anda.
   - Tambah daftar teknologi secara dinamis dan key features.
   - Masukkan Demo URL dan Repository URL.
   - Upload thumbnail project.
   - Pilih status: `draft` atau `published`. Data draft tidak akan terlihat di halaman publik.
   - Halaman detail publik otomatis tersedia di `/projects/[slug]`.

6. **Experiences (`/admin/experiences`)**:
   - Tambah posisi kerja, magang, atau organisasi.
   - Tambah tanggung jawab (`+ Add Responsibility`) dan pencapaian (`+ Add Achievement`).
   - Masukkan logo organisasi dan foto.

7. **Certificates (`/admin/certificates`)**:
   - Masukkan nama sertifikat, penerbit, nomor ID kredensial, URL verifikasi.
   - Atur tanggal penerbitan dan masa berlaku.
   - Upload thumbnail sertifikat dan PDF.

8. **Contact (`/admin/contacts`)**:
   - Tambahkan entri kontak fleksibel (Email, WhatsApp, GitHub, LinkedIn, Instagram, dll) beserta label, URL, dan status visibilitas.

9. **Media Library (`/admin/media`)**:
   - Upload foto (JPG, PNG, WebP) dan dokumen PDF.
   - Filter file berdasarkan tipe (Image / PDF) dan lakukan pencarian.
   - Fitur Copy URL langsung ke clipboard dan hapus media.

10. **Site Settings (`/admin/settings`)**:
    - Atur Site Title, Site Description, Meta SEO Description, Copyright text di footer.
    - Toggle maintenance mode.

---

## 9. Design System: Monochrome Editorial Technical

- **Tema Visual**: Monochrome Black & White dengan pendekatan editorial teknik dan Swiss grid.
- **70–80% Halaman**: Background putih (`#FFFFFF`) dengan typography hitam (`#000000`) dan border abu-abu netral (`#E5E5E5`).
- **Accent Contrast Containers**: Background hitam pekat (`#000000`) pada section *Selected Works*, *Contact CTA*, dan *Footer*.
- **Identitas Berbasis Teks**: Tidak menggunakan image logo/monogram artifisial, melainkan nama teks `MUHAMMAD RIFAT HAKIM` yang tegas.
- **Grayscale Imagery**: Gambar publik memiliki filter grayscale halus yang bertransisi ke warna asli saat hover.
- **Empty States**: Jika kategori data belum memiliki item yang berstatus `published`, section tersebut ditangani secara rapi tanpa broken layout atau fake mockup data.

---

## 10. Deployment Notes (Vercel)

1. Hubungkan repository GitHub Anda ke [Vercel](https://vercel.com).
2. Set Root Directory ke `portfolio` jika repository berada di root.
3. Masukkan Environment Variables yang sama dari file `.env`.
4. Deploy — Next.js App Router akan otomatis di-build dan siap digunakan.
