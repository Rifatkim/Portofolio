# 37. Technology Stack

## 37.1 Ringkasan Teknologi

Website portofolio akan dikembangkan menggunakan TypeScript sebagai bahasa pemrograman utama.

Stack utama:

```text
Frontend Framework : Next.js
Language           : TypeScript
Styling            : Tailwind CSS
UI Components      : shadcn/ui
Database           : Supabase PostgreSQL
Authentication     : Supabase Auth
File Storage       : Supabase Storage
Database Client    : Supabase JavaScript Client
Form Validation    : React Hook Form dan Zod
Deployment         : Vercel
Package Manager    : pnpm
Setuju. Untuk proyek ini sebaiknya gunakan TypeScript, bukan JavaScript biasa, karena admin dashboard, struktur data, form, dan tabel database akan cukup kompleks. Kombinasi yang paling sesuai adalah Next.js + TypeScript + Supabase, karena Supabase menyediakan PostgreSQL, authentication, storage, dan Row Level Security dalam satu layanan.

Tambahkan atau ganti bagian arsitektur teknis pada design.md dengan isi berikut:

# 37. Technology Stack

## 37.1 Ringkasan Teknologi

Website portofolio akan dikembangkan menggunakan TypeScript sebagai bahasa pemrograman utama.

Stack utama:

```text
Frontend Framework : Next.js
Language           : TypeScript
Styling            : Tailwind CSS
UI Components      : shadcn/ui
Database           : Supabase PostgreSQL
Authentication     : Supabase Auth
File Storage       : Supabase Storage
Database Client    : Supabase JavaScript Client
Form Validation    : React Hook Form dan Zod
Deployment         : Vercel
Package Manager    : pnpm


TypeScript dipilih dibandingkan JavaScript biasa karena website memiliki:

Banyak struktur data.
Admin dashboard.
Form pengelolaan konten.
Relasi antar-data.
Sistem autentikasi.
Pengunggahan media.
Status publikasi.
Integrasi database.

TypeScript digunakan untuk meningkatkan:

Konsistensi tipe data.
Keamanan pengembangan.
Kemudahan maintenance.
Kemudahan refactoring.
Deteksi error sebelum aplikasi dijalankan.
Sinkronisasi tipe data antara database dan aplikasi.
38. Frontend Architecture
38.1 Next.js

Frontend dan backend application layer menggunakan Next.js dengan App Router.

Next.js digunakan untuk:

Website portofolio publik.
Admin dashboard.
Server-side rendering.
Static page generation.
Dynamic project pages.
Route protection.
Server Actions atau Route Handlers.
Metadata dan SEO.
Image optimization.

Struktur route utama:

/
├── /
├── /projects
├── /projects/[slug]
├── /admin
├── /admin/login
├── /admin/dashboard
├── /admin/profile
├── /admin/skills
├── /admin/projects
├── /admin/projects/new
├── /admin/projects/[id]/edit
├── /admin/experiences
├── /admin/certificates
├── /admin/contacts
├── /admin/media
├── /admin/settings
└── /admin/audit-logs

38.2 TypeScript

Semua source code utama menggunakan TypeScript.

File yang digunakan:

.ts
.tsx


JavaScript biasa hanya diperbolehkan jika:

Library tertentu membutuhkan konfigurasi JavaScript.
File konfigurasi tidak mendukung TypeScript.
Tidak ada alternatif TypeScript yang stabil.

Gunakan TypeScript strict mode.

{
  "compilerOptions": {
    "strict": true
  }
}


Hindari penggunaan tipe any.

Jika tipe data belum diketahui, gunakan:

unknown
Generic type
Union type
Interface
Type alias
Tipe hasil generate dari Supabase
39. Styling dan Component System
39.1 Tailwind CSS

Tailwind CSS digunakan untuk:

Layout.
Grid.
Responsive design.
Spacing.
Typography.
Color token.
Border.
Interaction state.
Admin dashboard.

Gunakan design token yang telah ditentukan pada dokumen ini.

Contoh token warna:

:root {
  --background: #ffffff;
  --foreground: #000000;

  --surface-primary: #ffffff;
  --surface-secondary: #f7f7f5;
  --surface-inverse: #000000;
  --surface-inverse-secondary: #111111;

  --text-primary: #000000;
  --text-secondary: #737373;
  --text-inverse: #ffffff;
  --text-inverse-secondary: #d4d4d4;

  --border-primary: #000000;
  --border-secondary: #e5e5e5;
  --border-inverse: #333333;
}

39.2 shadcn/ui

shadcn/ui dapat digunakan sebagai fondasi komponen, terutama untuk admin dashboard.

Komponen yang dapat digunakan:

Button.
Input.
Textarea.
Select.
Checkbox.
Switch.
Dialog.
Alert Dialog.
Dropdown Menu.
Sheet.
Table.
Tabs.
Toast.
Form.
Card.
Skeleton.
Breadcrumb.
Pagination.

Seluruh komponen harus disesuaikan dengan tema Monochrome Infrastructure.

Hindari menggunakan tampilan default tanpa penyesuaian.

40. Supabase Architecture
40.1 Fungsi Supabase

Supabase digunakan sebagai Backend as a Service.

Layanan Supabase yang digunakan:

Supabase Database : Menyimpan data portofolio
Supabase Auth     : Autentikasi administrator
Supabase Storage  : Menyimpan foto dan dokumen
Supabase RLS      : Mengatur hak akses data
Supabase API      : Mengakses data dari aplikasi

40.2 Supabase PostgreSQL

Database utama menggunakan PostgreSQL yang disediakan oleh Supabase.

Database menyimpan:

Profil.
Skills.
Kategori skill.
Projects.
Teknologi proyek.
Galeri proyek.
Experiences.
Detail pengalaman.
Galeri pengalaman.
Certificates.
Kompetensi sertifikat.
Contacts.
Site settings.
Metadata media.
Contact messages.
Audit logs.
40.3 Supabase Auth

Supabase Auth digunakan untuk autentikasi administrator.

Metode autentikasi versi pertama:

Email dan password


Tidak ada fitur registrasi publik.

Akun administrator dibuat melalui:

Supabase Dashboard.
Script setup awal.
Undangan admin jika fitur multi-admin ditambahkan.

Alur autentikasi:

Administrator membuka /admin
        ↓
Sistem memeriksa session
        ↓
Jika tidak ada session
        ↓
Redirect ke /admin/login
        ↓
Administrator login
        ↓
Supabase Auth memvalidasi akun
        ↓
Session dibuat
        ↓
Administrator masuk ke /admin/dashboard

40.4 Supabase Storage

Supabase Storage digunakan untuk menyimpan:

Foto Hero.
Foto About Me.
Thumbnail proyek.
Galeri proyek.
Logo organisasi.
Foto pengalaman.
Foto sertifikat.
File PDF sertifikat.
File CV.
Ikon skill custom.

File tidak disimpan langsung sebagai binary di dalam tabel database.

Database hanya menyimpan:

ID media.
Nama file.
Storage path.
Public URL atau signed URL.
MIME type.
Ukuran file.
Alt text.
Caption.
Relasi konten.
41. Supabase Storage Buckets
41.1 Public Portfolio Bucket

Nama bucket:

portfolio-public


Digunakan untuk media yang boleh dilihat pengunjung:

Foto profil.
Thumbnail proyek.
Galeri proyek.
Logo organisasi.
Foto pengalaman.
Thumbnail sertifikat.
Ikon skill.

Struktur folder:

portfolio-public/
├── profile/
├── projects/
│   └── [project-id]/
├── experiences/
│   └── [experience-id]/
├── certificates/
│   └── [certificate-id]/
└── skills/

41.2 Private Documents Bucket

Nama bucket:

portfolio-private


Digunakan untuk:

CV yang tidak dibuka secara permanen.
Sertifikat PDF.
Dokumen internal.
Media yang masih berstatus draft.

Struktur folder:

portfolio-private/
├── cv/
├── certificates/
│   └── [certificate-id]/
└── drafts/


File private diakses menggunakan signed URL dengan masa berlaku terbatas.

41.3 Aturan Nama File

Gunakan nama file yang aman dan unik.

Format:

[timestamp]-[random-id]-[sanitized-filename].[extension]


Contoh:

1788019200-a81f-profile-photo.webp


Jangan gunakan nama file asli sebagai satu-satunya identifier.

42. Row Level Security
42.1 Tujuan

Row Level Security digunakan untuk membatasi tindakan berdasarkan jenis pengguna.

Jenis akses:

Public Visitor : Hanya membaca konten published
Administrator  : Mengelola seluruh konten


RLS harus diaktifkan pada semua tabel yang dapat diakses melalui Supabase API.

42.2 Kebijakan Pengunjung

Pengunjung publik hanya dapat membaca data dengan status:

published


Pengunjung tidak dapat:

Menambahkan data.
Mengubah data.
Menghapus data.
Membaca draft.
Membaca hidden content.
Membaca archived content.
Membaca audit log.
Membaca private settings.
42.3 Kebijakan Administrator

Administrator yang terautentikasi dapat:

Membaca seluruh konten.
Menambahkan data.
Mengubah data.
Menghapus data.
Mengelola status publikasi.
Mengelola media.
Mengelola site settings.
42.4 Aturan Penting

Service role key tidak boleh digunakan pada browser.

Service role key hanya diperbolehkan pada:

Server-side environment.
Secure Route Handler.
Server Action yang terlindungi.
Proses maintenance.
Migration script.

Service role key tidak boleh menggunakan prefix:

NEXT_PUBLIC_

43. Environment Variables

Gunakan environment variables untuk menghubungkan aplikasi dengan Supabase.

Contoh:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=

43.1 Public Variables

Variabel berikut dapat digunakan oleh browser:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL

43.2 Private Variables

Variabel berikut hanya boleh digunakan di server:

SUPABASE_SERVICE_ROLE_KEY

43.3 Aturan Keamanan

File berikut tidak boleh dimasukkan ke repository:

.env
.env.local
.env.production


Sediakan file contoh:

.env.example


File .env.example tidak boleh berisi credential asli.

44. Database Type Safety
44.1 Generated Database Types

TypeScript type harus dibuat berdasarkan schema Supabase.

File hasil generate dapat disimpan pada:

src/types/database.types.ts


Tipe tersebut digunakan untuk:

Query database.
Insert data.
Update data.
Relasi tabel.
Return data.
Form initial values.
44.2 Application Types

Tipe aplikasi tambahan disimpan pada:

src/types/
├── database.types.ts
├── profile.ts
├── project.ts
├── experience.ts
├── certificate.ts
├── contact.ts
├── media.ts
└── admin.ts

44.3 Aturan Tipe

Jangan menulis ulang tipe database secara manual jika tipe tersebut dapat diperoleh dari generated database types.

Tipe khusus presentasi dapat dibuat terpisah.

Contoh:

export type PublicationStatus =
  | "draft"
  | "published"
  | "hidden"
  | "archived";

45. Data Access Strategy
45.1 Public Data

Konten publik sebaiknya diambil melalui server.

Konten tersebut meliputi:

Profile.
Skills.
Published projects.
Published experiences.
Published certificates.
Active contacts.
Public site settings.

Keuntungan:

Credential database tidak terekspos.
SEO lebih baik.
Loading state lebih sedikit.
Data dapat di-cache.
Konten tersedia saat halaman dirender.
45.2 Admin Data

Data admin dapat diambil menggunakan:

Server Components.
Server Actions.
Secure Route Handlers.

Client Component hanya digunakan jika diperlukan untuk:

Form interaction.
Drag and drop.
Upload progress.
Modal.
Table filtering.
Rich text editor.
Live preview.
45.3 Mutasi Data

Operasi berikut harus dilakukan melalui server-side handler yang aman:

Create.
Update.
Delete.
Publish.
Archive.
Media deletion.
Site settings update.
Audit log creation.

Setiap operasi harus:

Memeriksa session.
Memeriksa hak akses.
Memvalidasi input.
Menjalankan database operation.
Mencatat audit log.
Mengembalikan success atau error.
Memperbarui cache.
46. Form Management
46.1 React Hook Form

React Hook Form digunakan untuk mengelola:

Profile form.
Project form.
Experience form.
Certificate form.
Contact settings.
Login form.
Site settings.
46.2 Zod

Zod digunakan untuk:

Validasi client-side.
Validasi server-side.
Penyusunan schema.
Type inference.
Validasi URL.
Validasi file metadata.
Validasi publication status.

Schema yang sama sebaiknya digunakan pada client dan server jika memungkinkan.

46.3 Aturan Validasi

Validasi client-side digunakan untuk memberikan feedback cepat.

Validasi server-side tetap wajib dan menjadi sumber validasi utama.

Jangan mempercayai data dari browser tanpa validasi server.

47. Struktur Direktori

Struktur direktori yang direkomendasikan:

src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── experiences/
│   │   ├── certificates/
│   │   ├── contacts/
│   │   ├── media/
│   │   ├── settings/
│   │   └── audit-logs/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── public/
│   ├── admin/
│   ├── forms/
│   └── ui/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── actions/
│   ├── queries/
│   ├── validations/
│   ├── permissions/
│   └── utilities/
├── types/
├── hooks/
└── styles/

supabase/
├── migrations/
├── seed.sql
└── config.toml

48. Package Recommendation

Dependencies utama:

next
react
react-dom
typescript
@supabase/supabase-js
@supabase/ssr
tailwindcss
zod
react-hook-form
@hookform/resolvers
lucide-react


Dependencies opsional:

@dnd-kit/core
@dnd-kit/sortable
date-fns
sharp
sonner


Fungsi dependencies opsional:

@dnd-kit: drag and drop pengurutan konten.
date-fns: format tanggal.
sharp: optimasi gambar pada server yang mendukung.
sonner: toast notification.

Hindari menambahkan dependency jika fitur dapat dibuat dengan API bawaan secara sederhana.

49. Deployment
49.1 Frontend Deployment

Website direkomendasikan untuk di-deploy menggunakan Vercel.

Vercel menjalankan:

Next.js website.
Server Components.
Route Handlers.
Server Actions.
Image optimization.
Environment variables.
49.2 Backend Services

Supabase menjalankan:

PostgreSQL database.
Authentication.
Storage.
Row Level Security.
Database API.
49.3 Deployment Flow
Developer melakukan push ke Git repository
        ↓
Vercel menjalankan build
        ↓
TypeScript diperiksa
        ↓
Production deployment dibuat
        ↓
Next.js terhubung ke Supabase
        ↓
Website dapat diakses melalui domain

50. Development Workflow
50.1 Local Development

Pengembangan lokal menggunakan:

Node.js
pnpm
Next.js development server
Supabase CLI
Git

50.2 Environment

Pisahkan environment:

Development
Staging
Production


Jangan menggunakan database production untuk pengujian lokal.

50.3 Database Migration

Semua perubahan struktur database harus menggunakan migration.

Migration digunakan untuk:

Membuat tabel.
Menambahkan kolom.
Mengubah constraint.
Membuat index.
Membuat RLS policy.
Membuat database function.

Jangan mengubah schema production tanpa migration yang terdokumentasi.

51. Technical Testing
51.1 Type Checking

Project harus lulus:

pnpm typecheck

51.2 Linting

Project harus lulus:

pnpm lint

51.3 Build

Project harus berhasil menjalankan:

pnpm build

51.4 Pengujian Utama

Pengujian mencakup:

Login admin.
Logout admin.
Protected routes.
Public content queries.
Draft content protection.
CRUD proyek.
CRUD pengalaman.
CRUD sertifikat.
Media upload.
RLS policies.
Form validation.
Responsive layout.
Error handling.
52. Technical Acceptance Criteria

Implementasi teknologi dianggap memenuhi kebutuhan apabila:

Aplikasi menggunakan Next.js.
Source code utama menggunakan TypeScript.
TypeScript strict mode aktif.
Database menggunakan Supabase PostgreSQL.
Login admin menggunakan Supabase Auth.
Foto dan dokumen menggunakan Supabase Storage.
RLS aktif pada tabel yang dapat diakses melalui API.
Pengunjung hanya dapat membaca konten published.
Administrator dapat mengelola seluruh konten setelah login.
Service role key tidak tersedia di browser.
Database types dihasilkan untuk TypeScript.
Semua input divalidasi di sisi server.
Admin route terlindungi.
Media private menggunakan signed URL.
Perubahan database menggunakan migration.
Website berhasil melewati type checking.
Website berhasil melewati proses production build.

## Keputusan Stack Akhir

Saya menyarankan stack ini sebagai versi final:

```text
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui
Supabase PostgreSQL
Supabase Auth
Supabase Storage
Supabase Row Level Security
React Hook Form
Zod
Vercel
pnpm


Template resmi Supabase untuk Next.js juga telah dikonfigurasi dengan cookie-based authentication, TypeScript, dan Tailwind CSS, sehingga stack ini sesuai untuk website publik sekaligus admin dashboard Anda.

Hal terpenting dalam implementasinya adalah mengaktifkan Row Level Security. Pengunjung publik hanya boleh membaca konten berstatus published, sedangkan operasi tambah, ubah, dan hapus hanya dapat dilakukan administrator yang sudah login. Supabase mendukung PostgreSQL, Auth, Storage, dan RLS untuk kebutuhan tersebut.