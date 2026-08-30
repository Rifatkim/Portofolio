# Product Requirements Document

## Website Portofolio Muhammad Rifat Hakim

**Versi:** 1.0  
**Status:** Draft  
**Tanggal:** 29 Agustus 2026  
**Pemilik Produk:** Muhammad Rifat Hakim  
**Jenis Produk:** Website portofolio pribadi dengan Content Management System  
**Platform:** Website responsif  
**Bahasa Utama:** Bahasa Indonesia  

---

# 1. Ringkasan Produk

Website ini merupakan portofolio pribadi Muhammad Rifat Hakim, mahasiswa Informatika Universitas Gunadarma yang memiliki fokus pada bidang jaringan komputer, pengembangan web, pengembangan perangkat lunak, dan arsitektur backend.

Website akan digunakan untuk menampilkan:

- Profil singkat.
- Informasi pendidikan dan IPK.
- Keahlian teknis.
- Proyek yang pernah dikerjakan.
- Pengalaman kerja dan organisasi.
- Sertifikat.
- Informasi kontak.
- Foto pendukung untuk profil, proyek, pengalaman, dan sertifikat.

Website terdiri dari dua bagian utama:

1. **Website publik**, yang dapat diakses oleh seluruh pengunjung.
2. **Admin dashboard**, yang hanya dapat diakses melalui `/admin` oleh administrator yang memiliki akun.

Seluruh konten utama harus disimpan di database agar pemilik website dapat menambah, mengubah, menghapus, mengurutkan, dan menyembunyikan konten tanpa perlu mengubah kode sumber.

---

# 2. Latar Belakang

Portofolio pribadi perlu diperbarui secara berkala ketika pemilik memiliki proyek, pengalaman, keahlian, atau sertifikat baru.

Jika seluruh informasi ditulis langsung di dalam kode, setiap perubahan akan membutuhkan proses berikut:

1. Membuka kode sumber.
2. Mengubah isi komponen website.
3. Menguji perubahan.
4. Melakukan build ulang.
5. Melakukan deployment ulang.

Untuk menghindari proses tersebut, website membutuhkan Content Management System sederhana yang dapat diakses melalui `/admin`.

Melalui halaman tersebut, administrator dapat memperbarui konten website dari antarmuka yang tersedia. Data yang diperbarui akan disimpan di database dan ditampilkan secara otomatis pada website publik.

---

# 3. Tujuan Produk

## 3.1 Tujuan Utama

Website portofolio ini dibuat untuk:

1. Memperkenalkan Muhammad Rifat Hakim secara profesional.
2. Menampilkan status sebagai mahasiswa Informatika Universitas Gunadarma.
3. Menunjukkan fokus keahlian pada bidang networking dan web development.
4. Menampilkan nilai IPK sebagai bagian dari informasi pendidikan.
5. Menampilkan pengalaman profesional dan akademik.
6. Menampilkan proyek dan hasil pekerjaan.
7. Menampilkan sertifikat dan pencapaian.
8. Memudahkan recruiter, perusahaan, atau pengunjung menghubungi pemilik.
9. Memungkinkan seluruh konten dikelola melalui halaman `/admin`.
10. Mengurangi kebutuhan untuk mengubah kode saat memperbarui isi portofolio.

## 3.2 Indikator Keberhasilan

Website dianggap berhasil apabila:

- Pengunjung dapat memahami profil dan bidang keahlian pemilik dari halaman utama.
- Pengunjung dapat melihat daftar keahlian, proyek, pengalaman, dan sertifikat.
- Website dapat digunakan dengan baik melalui desktop, tablet, dan perangkat mobile.
- Administrator dapat masuk ke `/admin` menggunakan akun yang sah.
- Administrator dapat mengubah informasi profil dan IPK.
- Administrator dapat mengganti foto profil.
- Administrator dapat menambahkan proyek tanpa mengubah kode.
- Administrator dapat menambahkan pengalaman kerja dan sertifikat.
- Administrator dapat mengunggah foto untuk proyek, pengalaman, dan sertifikat.
- Administrator dapat menyembunyikan konten tanpa menghapusnya.
- Perubahan yang dipublikasikan melalui admin dashboard muncul pada website publik.
- Pengguna yang belum login tidak dapat mengakses admin dashboard.

---

# 4. Ruang Lingkup Produk

## 4.1 Termasuk dalam Pengembangan

Ruang lingkup versi awal website meliputi:

- Halaman portofolio publik.
- Hero section.
- About Me section.
- Skills section.
- Projects section.
- Experience section.
- Certificates section.
- Contact section.
- Admin login.
- Admin dashboard.
- Pengelolaan profil.
- Pengelolaan skill.
- Pengelolaan proyek.
- Pengelolaan pengalaman.
- Pengelolaan sertifikat.
- Pengelolaan kontak.
- Pengunggahan dan pengelolaan media.
- Penyimpanan data dalam database.
- Status draft dan published.
- Pengaturan urutan konten.
- Tampilan responsif.

## 4.2 Tidak Termasuk dalam Versi Awal

Fitur berikut belum menjadi prioritas pengembangan versi pertama:

- Sistem pendaftaran akun administrator.
- Akun admin dengan banyak role.
- Komentar pengunjung.
- Blog atau artikel.
- Newsletter.
- Sistem pembayaran.
- Marketplace.
- Live chat.
- Multi-language.
- Analitik dashboard tingkat lanjut.
- Pengaturan desain visual dari admin.
- Page builder.
- Integrasi kecerdasan buatan.
- Aplikasi mobile khusus.
- Penentuan warna, tipografi, dan animasi final.

---

# 5. Target Pengguna

## 5.1 Pengunjung Umum

Pengunjung umum dapat terdiri dari:

- Recruiter atau HR.
- Perusahaan dan calon pemberi kerja.
- Dosen.
- Pihak kampus.
- Rekan mahasiswa.
- Rekan profesional.
- Calon klien.
- Pengunjung umum.

Pengunjung hanya dapat melihat konten yang memiliki status aktif atau published.

## 5.2 Administrator

Administrator utama adalah Muhammad Rifat Hakim.

Administrator memiliki kewenangan untuk:

- Login ke halaman `/admin`.
- Mengubah data profil.
- Mengelola nilai IPK.
- Mengunggah foto.
- Mengelola daftar skill.
- Mengelola proyek.
- Mengelola pengalaman.
- Mengelola sertifikat.
- Mengelola informasi kontak.
- Mengubah urutan konten.
- Menyimpan konten sebagai draft.
- Memublikasikan konten.
- Menyembunyikan konten.
- Menghapus konten.

---

# 6. Struktur Website Publik

Website publik menggunakan format satu halaman utama atau single-page portfolio. Setiap bagian dapat diakses melalui menu navigasi.

Struktur utama:

1. Navigation
2. Hero
3. About Me
4. Skills
5. Projects
6. Experience
7. Certificates
8. Contact
9. Footer

---

# 7. Navigation

## 7.1 Tujuan

Navigation digunakan untuk memudahkan pengunjung berpindah ke setiap bagian website.

## 7.2 Menu Navigasi

Menu yang tersedia:

- Beranda
- Tentang Saya
- Keahlian
- Proyek
- Pengalaman
- Sertifikat
- Kontak

## 7.3 Kebutuhan Fungsional

- Setiap menu mengarah ke section terkait.
- Navigasi dapat digunakan di desktop dan mobile.
- Navigation tidak menampilkan link menuju `/admin`.
- Alamat `/admin` hanya diketahui dan digunakan oleh administrator.
- Jika section dinonaktifkan dari admin, menu untuk section tersebut dapat disembunyikan secara otomatis.

---

# 8. Hero Section

## 8.1 Tujuan

Hero section menjadi bagian pertama yang dilihat pengunjung. Bagian ini harus menjelaskan identitas, status pendidikan, dan bidang utama pemilik website secara singkat.

## 8.2 Konten Awal

**Nama:**

Muhammad Rifat Hakim

**Status:**

Mahasiswa Informatika Universitas Gunadarma

**Bidang Utama:**

- Networking
- Web Development

**Call to Action:**

- Lihat Proyek
- Hubungi Saya
- Unduh CV, jika fitur CV diaktifkan

## 8.3 Data yang Ditampilkan

- Nama lengkap.
- Headline atau jabatan singkat.
- Nama universitas.
- Program studi.
- Bidang utama.
- Deskripsi singkat.
- Nilai IPK.
- Foto hero atau foto profil.
- Tombol menuju proyek.
- Tombol menuju kontak.
- Tombol unduh CV, opsional.

## 8.4 Format Informasi IPK

IPK dapat ditampilkan dalam format:

`IPK: [nilai] / 4.00`

Contoh:

`IPK: 3.75 / 4.00`

Nilai IPK tidak ditulis permanen di dalam kode. Nilai tersebut harus dapat diubah melalui admin dashboard.

## 8.5 Foto Hero

Hero menyediakan satu tempat khusus untuk:

- Foto profil.
- Foto formal.
- Foto profesional.
- Foto dengan latar transparan, jika tersedia.

Admin dapat:

- Mengunggah foto.
- Mengganti foto.
- Menghapus foto.
- Mengisi alt text.
- Melihat preview foto sebelum menyimpan.

## 8.6 Kebutuhan Admin

Administrator dapat mengubah:

- Nama lengkap.
- Headline.
- Status pendidikan.
- Nama universitas.
- Program studi.
- Bidang utama.
- Deskripsi singkat.
- Nilai IPK.
- Skala IPK.
- Visibilitas IPK.
- Foto hero.
- Alt text foto.
- Teks tombol.
- Tujuan tombol.
- File CV.
- Status section.

---

# 9. About Me Section

## 9.1 Tujuan

About Me menjelaskan latar belakang, fokus keahlian, pengalaman, dan kemampuan kerja pemilik website.

## 9.2 Konten Awal

Mahasiswa Informatika di Universitas Gunadarma yang berfokus pada pengelolaan jaringan komputer, pengembangan perangkat lunak, dan arsitektur backend.

Memiliki pemahaman kuat dalam bidang jaringan komputer serta pengembangan website. Memiliki pengalaman Praktik Kerja Lapangan di PUSHANSIBER KEMHAN, serta menjadi asisten laboratorium dan instruktur atau tutor di VM LePKom Universitas Gunadarma.

Terbiasa bekerja secara terstruktur, mampu berkolaborasi dalam kelompok, dan dapat memecahkan masalah secara individu maupun bersama tim.

## 9.3 Data yang Ditampilkan

- Judul section.
- Deskripsi profil.
- Foto profil.
- Nama universitas.
- Program studi.
- Fokus bidang.
- Status pendidikan.
- Informasi tambahan opsional.

## 9.4 Foto About Me

Bagian ini menyediakan tempat untuk foto profil tambahan.

Foto pada About Me dapat:

- Menggunakan foto yang sama dengan Hero.
- Menggunakan foto yang berbeda.
- Dikosongkan jika tidak dibutuhkan.

## 9.5 Kebutuhan Admin

Administrator dapat:

- Mengubah judul section.
- Mengubah deskripsi.
- Menggunakan teks biasa atau rich text sederhana.
- Mengunggah foto.
- Mengganti foto.
- Mengisi alt text.
- Mengaktifkan atau menonaktifkan section.
- Menentukan urutan section.

---

# 10. Skills Section

## 10.1 Tujuan

Skills section menampilkan kemampuan teknis yang dimiliki berdasarkan kategori.

## 10.2 Kategori Skill

### Networking

- Cisco
- MikroTik
- Juniper
- Ubiquiti UniFi

### Frontend Development

- HTML
- CSS
- JavaScript

### Backend Development

- Node.js
- Go

### Programming Language

- Python
- JavaScript
- Go

> Satu skill dapat dimasukkan ke lebih dari satu kategori apabila diperlukan. Sebagai contoh, JavaScript dapat berada pada kategori Frontend Development dan Programming Language.

## 10.3 Data Setiap Skill

Setiap skill minimal memiliki:

- Nama skill.
- Kategori.
- Ikon atau logo.
- Tingkat kemampuan, opsional.
- Deskripsi singkat, opsional.
- Urutan tampil.
- Status aktif.
- Tanggal dibuat.
- Tanggal diperbarui.

## 10.4 Tingkat Kemampuan

Tingkat kemampuan bersifat opsional dan dapat berupa:

- Beginner
- Intermediate
- Advanced

Alternatif lain:

- Dasar
- Menengah
- Mahir

Persentase skill sebaiknya tidak menjadi data wajib karena dapat menghasilkan penilaian yang terlalu subjektif.

## 10.5 Kebutuhan Admin

Administrator dapat:

- Menambahkan kategori skill.
- Mengubah nama kategori.
- Menghapus kategori yang tidak digunakan.
- Menambahkan skill.
- Mengubah informasi skill.
- Mengunggah ikon skill.
- Memilih kategori skill.
- Mengubah urutan skill.
- Mengaktifkan atau menonaktifkan skill.
- Menghapus skill.

---

# 11. Projects Section

## 11.1 Tujuan

Projects section menampilkan proyek yang pernah dibuat atau sedang dikembangkan.

Pada versi awal, data proyek dapat dikosongkan dan diisi kemudian melalui admin dashboard.

## 11.2 Kerangka Data Proyek

Setiap proyek memiliki data berikut:

- Nama proyek.
- Slug.
- Ringkasan singkat.
- Deskripsi lengkap.
- Permasalahan yang diselesaikan.
- Tujuan proyek.
- Peran dalam proyek.
- Teknologi yang digunakan.
- Fitur utama.
- Tantangan.
- Solusi.
- Hasil proyek.
- Status proyek.
- Jenis proyek.
- Tahun pengerjaan.
- Tanggal mulai.
- Tanggal selesai.
- URL demo.
- URL repository.
- Foto thumbnail.
- Galeri foto proyek.
- Alt text setiap foto.
- Status featured.
- Status publikasi.
- Urutan tampil.

## 11.3 Template Konten Proyek

### Nama Proyek

`[Masukkan nama proyek]`

### Ringkasan

`[Jelaskan proyek dalam satu sampai dua kalimat]`

### Latar Belakang

`[Jelaskan alasan proyek dibuat]`

### Permasalahan

`[Jelaskan masalah yang ingin diselesaikan]`

### Solusi

`[Jelaskan solusi yang dibuat]`

### Peran

`[Jelaskan peran dalam proyek]`

### Teknologi

- `[Teknologi pertama]`
- `[Teknologi kedua]`
- `[Teknologi ketiga]`

### Fitur Utama

- `[Fitur pertama]`
- `[Fitur kedua]`
- `[Fitur ketiga]`

### Tantangan

`[Jelaskan tantangan selama pengerjaan]`

### Hasil

`[Jelaskan hasil atau dampak proyek]`

### Tautan

- Demo: `[URL demo]`
- Repository: `[URL GitHub atau repository lain]`

## 11.4 Jenis Proyek

Pilihan jenis proyek:

- Personal Project
- Academic Project
- Freelance Project
- Internship Project
- Team Project
- Open Source Project
- Research Project
- Networking Project

## 11.5 Status Proyek

Pilihan status:

- Planning
- In Progress
- Completed
- Maintenance
- Archived

## 11.6 Foto Proyek

Setiap proyek dapat memiliki:

- Satu foto thumbnail.
- Beberapa foto galeri.
- Screenshot aplikasi.
- Foto topologi jaringan.
- Foto dokumentasi.
- Diagram proyek.

Admin dapat:

- Mengunggah lebih dari satu foto.
- Memilih foto utama.
- Mengubah urutan foto.
- Menghapus foto.
- Menambahkan caption.
- Menambahkan alt text.

## 11.7 Kebutuhan Admin

Administrator dapat:

- Menambahkan proyek.
- Menyimpan proyek sebagai draft.
- Mengedit proyek.
- Menghapus proyek.
- Memublikasikan proyek.
- Menyembunyikan proyek.
- Menandai proyek sebagai featured.
- Mengatur urutan proyek.
- Mengunggah thumbnail.
- Mengunggah galeri foto.
- Mengelola tautan proyek.
- Mengelola teknologi proyek.

---

# 12. Experience Section

## 12.1 Tujuan

Experience section menampilkan pengalaman kerja, kegiatan akademik, praktik kerja lapangan, dan pengalaman profesional lainnya.

## 12.2 Pengalaman Awal

### Asisten, Lembaga Pengembangan Komputerisasi Universitas Gunadarma

**Periode:** September 2025 sampai sekarang

**Deskripsi:**

- Membimbing dan mengarahkan praktikan secara intensif dalam menyelesaikan seluruh rangkaian tugas praktikum pemrograman dan teknologi komputer.
- Melakukan troubleshooting dan analisis kode untuk membantu praktikan mengidentifikasi serta menyelesaikan error atau kesalahan logika pada program.
- Mengevaluasi dan menilai hasil pengerjaan tugas serta ujian praktikan secara objektif berdasarkan standar dan parameter yang telah ditentukan.

---

### Tutor, Lembaga Pengembangan Komputerisasi Universitas Gunadarma

**Periode:** Mei 2026 sampai sekarang

**Deskripsi:**

- Menyampaikan dan memaparkan materi dasar jaringan komputer, mulai dari subnetting, switching, hingga routing.
- Menjadi instruktur utama dalam memandu sesi praktikum hands-on untuk memastikan praktikan memahami implementasi langsung dari teori yang diajarkan.

---

### Asisten Pembekalan, Lembaga Sertifikasi Profesi Universitas Gunadarma

**Periode:** Juni 2026

**Deskripsi:**

- Menyiapkan perangkat keras dan perangkat lunak untuk keperluan pembekalan.
- Memastikan kebutuhan jaringan Wi-Fi dan perangkat pendukung lainnya berjalan dengan baik.
- Memastikan ruangan tetap kondusif selama acara pembekalan berlangsung.

---

### Praktik Kerja Lapangan, PUSHANSIBER KEMHAN

**Periode:** Juni 2023 sampai Agustus 2023

**Deskripsi:**

- Berhasil mengonfigurasi DHCP Server pada router Cisco dan mengimplementasikan VLAN pada perangkat Juniper untuk segmentasi jaringan yang efisien.
- Menerapkan solusi High Availability, termasuk sistem failover dan IP tunneling pada router MikroTik, untuk meminimalkan waktu henti atau downtime jaringan.
- Mengatasi masalah konektivitas dan mengoptimalkan performa routing pada MikroTik RB450G, serta melakukan pemantauan jaringan secara rutin.
- Memasang dan mengelola wireless access point menggunakan Ubiquiti UniFi AP AC Lite dan Linksys Access Point untuk memaksimalkan cakupan Wi-Fi.

## 12.3 Struktur Data Pengalaman

Setiap pengalaman memiliki:

- Nama posisi.
- Nama organisasi atau perusahaan.
- Jenis pengalaman.
- Lokasi, opsional.
- Tanggal mulai.
- Tanggal selesai.
- Status masih aktif.
- Deskripsi singkat.
- Daftar tanggung jawab.
- Daftar pencapaian.
- Teknologi atau perangkat yang digunakan.
- Logo organisasi.
- Foto utama.
- Galeri dokumentasi.
- Alt text foto.
- Tautan organisasi, opsional.
- Urutan tampil.
- Status publikasi.

## 12.4 Jenis Pengalaman

Pilihan jenis pengalaman:

- Pekerjaan
- Magang
- Praktik Kerja Lapangan
- Asisten Laboratorium
- Tutor
- Organisasi
- Volunteer
- Freelance
- Kegiatan Profesional

## 12.5 Foto Pengalaman

Setiap pengalaman dapat memiliki:

- Logo perusahaan atau organisasi.
- Satu foto utama.
- Beberapa foto dokumentasi.
- Caption foto.
- Alt text setiap foto.

Foto tidak wajib. Jika suatu pengalaman tidak memiliki foto, website tetap harus dapat menampilkannya dengan baik.

## 12.6 Kebutuhan Admin

Administrator dapat:

- Menambah pengalaman.
- Mengubah pengalaman.
- Menghapus pengalaman.
- Menandai pengalaman sebagai sedang aktif.
- Menentukan tanggal mulai dan selesai.
- Menambahkan daftar tanggung jawab.
- Menambahkan daftar pencapaian.
- Mengunggah logo.
- Mengunggah foto dokumentasi.
- Mengubah urutan pengalaman.
- Menyimpan pengalaman sebagai draft.
- Memublikasikan pengalaman.
- Menyembunyikan pengalaman.

---

# 13. Certificates Section

## 13.1 Tujuan

Certificates section menampilkan sertifikat pelatihan, kompetensi, seminar, lomba, atau kegiatan profesional yang pernah diperoleh.

Data sertifikat dapat dikosongkan pada awal pengembangan dan diisi kemudian melalui `/admin`.

## 13.2 Kerangka Data Sertifikat

Setiap sertifikat memiliki:

- Nama sertifikat.
- Nama penerbit.
- Nomor kredensial, opsional.
- Tanggal diterbitkan.
- Tanggal kedaluwarsa, opsional.
- Keterangan tidak memiliki masa berlaku.
- Deskripsi singkat.
- Daftar kompetensi.
- URL kredensial.
- File sertifikat.
- Foto atau thumbnail sertifikat.
- Alt text.
- Urutan tampil.
- Status publikasi.

## 13.3 Template Sertifikat

### Nama Sertifikat

`[Masukkan nama sertifikat]`

### Penerbit

`[Masukkan nama lembaga penerbit]`

### Tanggal Diterbitkan

`[Masukkan bulan dan tahun]`

### Nomor Kredensial

`[Masukkan nomor kredensial jika tersedia]`

### Kompetensi

- `[Kompetensi pertama]`
- `[Kompetensi kedua]`
- `[Kompetensi ketiga]`

### URL Kredensial

`[Masukkan tautan verifikasi]`

## 13.4 Foto dan File Sertifikat

Administrator dapat mengunggah:

- Thumbnail sertifikat.
- Foto sertifikat.
- File PDF sertifikat.

Untuk alasan keamanan dan privasi, administrator harus dapat memilih:

- Menampilkan gambar sertifikat.
- Hanya menampilkan informasi sertifikat.
- Menampilkan link verifikasi.
- Mengizinkan file sertifikat diunduh.
- Menyembunyikan nomor kredensial.

## 13.5 Kebutuhan Admin

Administrator dapat:

- Menambahkan sertifikat.
- Mengubah sertifikat.
- Menghapus sertifikat.
- Mengunggah foto sertifikat.
- Mengunggah file sertifikat.
- Mengatur visibilitas nomor kredensial.
- Mengatur link verifikasi.
- Mengubah urutan.
- Menyimpan sebagai draft.
- Memublikasikan sertifikat.
- Menyembunyikan sertifikat.

---

# 14. Contact Section

## 14.1 Tujuan

Contact section membantu pengunjung menghubungi pemilik portofolio melalui kanal yang tersedia.

Data kontak akan diisi kemudian melalui admin dashboard.

## 14.2 Kerangka Informasi Kontak

Informasi kontak yang dapat ditampilkan:

- Email.
- Nomor WhatsApp.
- LinkedIn.
- GitHub.
- Instagram, opsional.
- Lokasi, opsional.
- Situs lain, opsional.
- Status ketersediaan kerja, opsional.

## 14.3 Template Kontak

### Email

`[alamat email]`

### WhatsApp

`[nomor WhatsApp]`

### LinkedIn

`[URL profil LinkedIn]`

### GitHub

`[URL profil GitHub]`

### Instagram

`[URL profil Instagram]`

### Lokasi

`[kota atau wilayah]`

## 14.4 Formulir Kontak

Formulir kontak bersifat opsional.

Jika diaktifkan, formulir memiliki:

- Nama pengirim.
- Email pengirim.
- Subjek.
- Pesan.
- Tombol kirim.
- Persetujuan pengiriman data.
- Proteksi spam.

## 14.5 Kebutuhan Admin

Administrator dapat:

- Menambah kanal kontak.
- Mengubah informasi kontak.
- Menghapus kanal kontak.
- Mengaktifkan atau menonaktifkan kanal.
- Mengatur urutan kanal.
- Mengubah status ketersediaan kerja.
- Mengaktifkan atau menonaktifkan formulir kontak.
- Melihat pesan masuk jika formulir kontak menggunakan database.

## 14.6 Privasi Kontak

- Nomor WhatsApp tidak boleh ditampilkan jika administrator menonaktifkannya.
- Email sebaiknya dilindungi dari bot sederhana.
- Lokasi yang ditampilkan cukup berupa kota atau wilayah.
- Alamat rumah lengkap tidak boleh ditampilkan.
- Pesan dari formulir kontak harus divalidasi dan disanitasi.

---

# 15. Footer

## 15.1 Konten Footer

Footer dapat menampilkan:

- Nama pemilik.
- Tahun berjalan.
- Copyright.
- Tautan media sosial.
- Navigation singkat.
- Tombol kembali ke atas.

## 15.2 Konten Awal

`© [tahun berjalan] Muhammad Rifat Hakim. All rights reserved.`

Tahun harus diperbarui secara otomatis berdasarkan tahun sistem.

---

# 16. Admin Dashboard

## 16.1 URL Admin

Admin dashboard dapat diakses melalui:

`/admin`

Halaman login dapat menggunakan:

`/admin/login`

Setelah berhasil login, administrator diarahkan ke:

`/admin/dashboard`

## 16.2 Tujuan

Admin dashboard digunakan untuk mengelola isi website tanpa mengubah kode program.

## 16.3 Struktur Menu Admin

Menu admin terdiri dari:

1. Dashboard
2. Profil
3. Hero
4. Tentang Saya
5. Skills
6. Projects
7. Experiences
8. Certificates
9. Contact
10. Media Library
11. Pengaturan Website
12. Akun
13. Logout

## 16.4 Dashboard Overview

Dashboard menampilkan ringkasan:

- Jumlah skill.
- Jumlah proyek.
- Jumlah proyek published.
- Jumlah proyek draft.
- Jumlah pengalaman.
- Jumlah sertifikat.
- Jumlah pesan masuk, jika formulir kontak digunakan.
- Tanggal pembaruan terakhir.
- Tombol cepat untuk menambah proyek.
- Tombol cepat untuk menambah pengalaman.
- Tombol cepat untuk menambah sertifikat.
- Tautan untuk melihat website publik.

---

# 17. Autentikasi Admin

## 17.1 Fitur Login

Halaman login memiliki:

- Email atau username.
- Password.
- Tombol login.
- Pesan error jika login gagal.
- Opsi tampilkan atau sembunyikan password.

## 17.2 Ketentuan Keamanan

- Password harus disimpan dalam bentuk hash.
- Password tidak boleh disimpan sebagai teks biasa.
- Session login harus memiliki masa berlaku.
- Admin yang belum login harus diarahkan ke `/admin/login`.
- Seluruh route admin harus dilindungi oleh authentication middleware.
- Login harus memiliki rate limiting.
- Sistem harus mencegah SQL Injection.
- Sistem harus mencegah Cross-Site Scripting.
- Sistem harus menggunakan validasi input.
- Sistem harus menggunakan proteksi CSRF jika memakai autentikasi berbasis session.
- Cookie autentikasi harus menggunakan `HttpOnly`.
- Cookie harus menggunakan `Secure` pada lingkungan production.
- Admin harus dapat logout.
- Session harus dihapus setelah logout.

## 17.3 Akun Administrator

Pada versi awal hanya dibutuhkan satu role:

`Super Admin`

Super Admin dapat mengelola seluruh konten dan pengaturan website.

Fitur registrasi publik tidak diperlukan.

---

# 18. Sistem Pengelolaan Konten

## 18.1 Operasi Dasar

Setiap modul konten mendukung operasi:

- Create.
- Read.
- Update.
- Delete.

## 18.2 Status Konten

Konten dapat menggunakan status:

- Draft.
- Published.
- Hidden.
- Archived.

## 18.3 Aturan Status

### Draft

Konten tersimpan di database, tetapi belum tampil di website publik.

### Published

Konten tampil di website publik.

### Hidden

Konten tidak tampil di website, tetapi masih tersimpan dan dapat diaktifkan kembali.

### Archived

Konten lama disimpan sebagai arsip dan tidak tampil di website publik.

## 18.4 Pengurutan Konten

Skill, proyek, pengalaman, sertifikat, dan kanal kontak memiliki nilai `sort_order`.

Admin dapat mengubah urutan melalui:

- Tombol naik dan turun, atau
- Drag and drop.

## 18.5 Konfirmasi Tindakan

Sistem harus menampilkan konfirmasi sebelum:

- Menghapus konten.
- Menghapus foto.
- Menghapus sertifikat.
- Menghapus proyek.
- Menghapus pengalaman.
- Mengganti status published menjadi hidden.

---

# 19. Media Library

## 19.1 Tujuan

Media Library menyimpan dan mengelola semua foto serta dokumen yang digunakan pada website.

## 19.2 Jenis Media

Media yang didukung:

- Foto profil.
- Foto hero.
- Foto proyek.
- Screenshot proyek.
- Foto pengalaman.
- Logo organisasi.
- Foto sertifikat.
- Ikon skill.
- File CV.
- File PDF sertifikat.

## 19.3 Format File

Format gambar yang disarankan:

- JPG.
- JPEG.
- PNG.
- WebP.

Format dokumen:

- PDF.

## 19.4 Validasi File

Sistem harus melakukan validasi:

- Tipe file.
- Ukuran file.
- Ekstensi file.
- MIME type.
- Nama file.
- Dimensi gambar, jika diperlukan.

## 19.5 Batas Ukuran Awal

Rekomendasi batas:

- Foto profil: maksimal 5 MB.
- Foto proyek: maksimal 5 MB per foto.
- Foto pengalaman: maksimal 5 MB per foto.
- Foto sertifikat: maksimal 5 MB.
- File PDF: maksimal 10 MB.
- File CV: maksimal 10 MB.

Batas tersebut dapat dikonfigurasi pada tahap implementasi.

## 19.6 Data Media

Setiap media menyimpan:

- Nama file asli.
- Nama file sistem.
- URL file.
- Path file.
- Tipe file.
- MIME type.
- Ukuran file.
- Alt text.
- Caption.
- Tanggal unggah.
- Tanggal pembaruan.
- Pemilik media.
- Relasi ke konten.

## 19.7 Optimasi Media

- Gambar website dapat dikonversi ke WebP.
- Sistem dapat membuat thumbnail otomatis.
- Gambar harus dikompresi sebelum ditampilkan.
- Gambar asli dapat tetap disimpan jika dibutuhkan.
- Alt text harus tersedia untuk aksesibilitas.

---

# 20. Struktur Database Konseptual

## 20.1 Tabel `admins`

Menyimpan akun administrator.

Field:

- `id`
- `name`
- `email`
- `username`
- `password_hash`
- `role`
- `last_login_at`
- `created_at`
- `updated_at`

## 20.2 Tabel `profiles`

Menyimpan profil utama.

Field:

- `id`
- `full_name`
- `headline`
- `short_description`
- `about_description`
- `university`
- `major`
- `student_status`
- `gpa`
- `gpa_scale`
- `show_gpa`
- `hero_photo_id`
- `about_photo_id`
- `cv_file_id`
- `created_at`
- `updated_at`

## 20.3 Tabel `skill_categories`

Menyimpan kategori skill.

Field:

- `id`
- `name`
- `slug`
- `description`
- `sort_order`
- `is_active`
- `created_at`
- `updated_at`

## 20.4 Tabel `skills`

Menyimpan daftar skill.

Field:

- `id`
- `name`
- `slug`
- `description`
- `level`
- `icon_media_id`
- `sort_order`
- `is_active`
- `created_at`
- `updated_at`

## 20.5 Tabel `skill_category_relations`

Menghubungkan skill dengan satu atau lebih kategori.

Field:

- `id`
- `skill_id`
- `category_id`
- `created_at`

## 20.6 Tabel `projects`

Menyimpan data proyek.

Field:

- `id`
- `title`
- `slug`
- `summary`
- `description`
- `background`
- `problem`
- `solution`
- `role`
- `project_type`
- `project_status`
- `start_date`
- `end_date`
- `demo_url`
- `repository_url`
- `thumbnail_media_id`
- `is_featured`
- `publication_status`
- `sort_order`
- `published_at`
- `created_at`
- `updated_at`

## 20.7 Tabel `project_features`

Menyimpan fitur proyek.

Field:

- `id`
- `project_id`
- `feature`
- `sort_order`
- `created_at`
- `updated_at`

## 20.8 Tabel `project_technologies`

Menyimpan teknologi yang digunakan pada proyek.

Field:

- `id`
- `project_id`
- `skill_id`
- `technology_name`
- `created_at`

## 20.9 Tabel `project_media`

Menyimpan galeri proyek.

Field:

- `id`
- `project_id`
- `media_id`
- `is_primary`
- `sort_order`
- `created_at`

## 20.10 Tabel `experiences`

Menyimpan pengalaman profesional.

Field:

- `id`
- `position`
- `organization`
- `experience_type`
- `location`
- `start_date`
- `end_date`
- `is_current`
- `summary`
- `organization_url`
- `logo_media_id`
- `main_photo_id`
- `publication_status`
- `sort_order`
- `created_at`
- `updated_at`

## 20.11 Tabel `experience_details`

Menyimpan daftar tanggung jawab atau pencapaian.

Field:

- `id`
- `experience_id`
- `detail_type`
- `description`
- `sort_order`
- `created_at`
- `updated_at`

Nilai `detail_type` dapat berupa:

- `responsibility`
- `achievement`

## 20.12 Tabel `experience_media`

Menyimpan galeri pengalaman.

Field:

- `id`
- `experience_id`
- `media_id`
- `sort_order`
- `created_at`

## 20.13 Tabel `certificates`

Menyimpan data sertifikat.

Field:

- `id`
- `name`
- `issuer`
- `credential_id`
- `show_credential_id`
- `issue_date`
- `expiration_date`
- `does_not_expire`
- `description`
- `credential_url`
- `image_media_id`
- `document_media_id`
- `allow_download`
- `publication_status`
- `sort_order`
- `created_at`
- `updated_at`

## 20.14 Tabel `certificate_skills`

Menyimpan kompetensi terkait sertifikat.

Field:

- `id`
- `certificate_id`
- `skill_name`
- `sort_order`
- `created_at`

## 20.15 Tabel `contacts`

Menyimpan kanal kontak.

Field:

- `id`
- `platform`
- `label`
- `value`
- `url`
- `icon_media_id`
- `sort_order`
- `is_active`
- `created_at`
- `updated_at`

## 20.16 Tabel `contact_messages`

Digunakan jika formulir kontak diaktifkan.

Field:

- `id`
- `sender_name`
- `sender_email`
- `subject`
- `message`
- `status`
- `submitted_at`
- `read_at`
- `created_at`
- `updated_at`

Status pesan:

- `unread`
- `read`
- `replied`
- `archived`

## 20.17 Tabel `media`

Menyimpan data file dan gambar.

Field:

- `id`
- `original_name`
- `stored_name`
- `file_path`
- `file_url`
- `file_type`
- `mime_type`
- `file_size`
- `alt_text`
- `caption`
- `uploaded_by`
- `created_at`
- `updated_at`

## 20.18 Tabel `site_settings`

Menyimpan pengaturan umum website.

Field:

- `id`
- `setting_key`
- `setting_value`
- `setting_type`
- `created_at`
- `updated_at`

Contoh pengaturan:

- Judul website.
- Deskripsi meta.
- Favicon.
- Status formulir kontak.
- Status tombol CV.
- Email penerima.
- Teks footer.
- Mode maintenance.

## 20.19 Tabel `audit_logs`

Menyimpan riwayat perubahan penting di admin dashboard.

Field:

- `id`
- `admin_id`
- `action`
- `entity_type`
- `entity_id`
- `old_value`
- `new_value`
- `ip_address`
- `created_at`

---

# 21. Relasi Data Utama

Relasi data yang diperlukan:

- Satu profil memiliki satu foto hero.
- Satu profil dapat memiliki satu foto About Me.
- Satu profil dapat memiliki satu file CV.
- Satu kategori memiliki banyak skill.
- Satu skill dapat masuk ke beberapa kategori.
- Satu proyek memiliki banyak fitur.
- Satu proyek memiliki banyak teknologi.
- Satu proyek memiliki banyak foto.
- Satu pengalaman memiliki banyak detail.
- Satu pengalaman memiliki banyak foto.
- Satu sertifikat memiliki satu foto utama.
- Satu sertifikat dapat memiliki satu file PDF.
- Satu sertifikat memiliki banyak kompetensi.
- Satu administrator dapat mengunggah banyak media.
- Satu administrator dapat melakukan banyak perubahan konten.

---

# 22. Alur Pengguna

## 22.1 Alur Pengunjung

1. Pengunjung membuka halaman utama.
2. Pengunjung melihat Hero.
3. Pengunjung membaca About Me.
4. Pengunjung melihat kategori skill.
5. Pengunjung membuka daftar proyek.
6. Pengunjung memilih proyek untuk melihat detail.
7. Pengunjung melihat pengalaman.
8. Pengunjung melihat sertifikat.
9. Pengunjung membuka informasi kontak.
10. Pengunjung menghubungi pemilik melalui kanal yang tersedia.

## 22.2 Alur Login Administrator

1. Administrator membuka `/admin`.
2. Jika belum login, sistem mengarahkan ke `/admin/login`.
3. Administrator memasukkan email atau username dan password.
4. Sistem memvalidasi kredensial.
5. Jika valid, administrator diarahkan ke dashboard.
6. Jika tidak valid, sistem menampilkan pesan error.
7. Sistem mencatat waktu login terakhir.

## 22.3 Alur Menambahkan Proyek

1. Administrator login.
2. Administrator membuka menu Projects.
3. Administrator memilih Add New Project.
4. Administrator mengisi informasi proyek.
5. Administrator mengunggah thumbnail.
6. Administrator mengunggah galeri foto.
7. Administrator memilih teknologi.
8. Administrator menyimpan proyek sebagai draft.
9. Administrator melihat preview.
10. Administrator mengubah status menjadi published.
11. Proyek tampil pada website publik.

## 22.4 Alur Menambahkan Pengalaman

1. Administrator membuka menu Experiences.
2. Administrator memilih Add Experience.
3. Administrator mengisi posisi dan organisasi.
4. Administrator menentukan periode.
5. Administrator menambahkan tanggung jawab dan pencapaian.
6. Administrator mengunggah logo atau foto.
7. Administrator menyimpan data.
8. Administrator memublikasikan pengalaman.

## 22.5 Alur Menambahkan Sertifikat

1. Administrator membuka menu Certificates.
2. Administrator memilih Add Certificate.
3. Administrator mengisi informasi sertifikat.
4. Administrator mengunggah foto atau file.
5. Administrator mengisi link verifikasi.
6. Administrator menentukan visibilitas nomor kredensial.
7. Administrator menyimpan sebagai draft atau published.

---

# 23. Halaman Detail Proyek

## 23.1 URL

Setiap proyek dapat memiliki halaman detail dengan struktur:

`/projects/[slug]`

Contoh:

`/projects/network-monitoring-system`

## 23.2 Konten Detail

Halaman detail dapat menampilkan:

- Nama proyek.
- Thumbnail.
- Galeri foto.
- Ringkasan.
- Latar belakang.
- Permasalahan.
- Solusi.
- Peran.
- Fitur utama.
- Teknologi.
- Tantangan.
- Hasil.
- Tautan demo.
- Tautan repository.
- Status proyek.
- Periode pengerjaan.

## 23.3 Kondisi Akses

- Proyek published dapat diakses publik.
- Proyek draft tidak dapat diakses publik.
- Proyek hidden tidak dapat diakses publik.
- Slug harus unik.
- Halaman yang tidak ditemukan menampilkan halaman 404.

---

# 24. Kebutuhan Fungsional

## 24.1 Website Publik

- Sistem menampilkan profil dari database.
- Sistem menampilkan IPK jika pengaturan visibilitas aktif.
- Sistem menampilkan skill berdasarkan kategori.
- Sistem hanya menampilkan proyek published.
- Sistem hanya menampilkan pengalaman published.
- Sistem hanya menampilkan sertifikat published.
- Sistem menampilkan media yang terkait dengan konten.
- Sistem menampilkan kanal kontak yang aktif.
- Sistem menyediakan navigasi antar-section.
- Sistem menyediakan halaman detail proyek.
- Sistem menampilkan halaman 404 jika konten tidak ditemukan.

## 24.2 Admin Dashboard

- Sistem menyediakan autentikasi admin.
- Sistem melindungi seluruh route `/admin`.
- Sistem menyediakan CRUD untuk profil.
- Sistem menyediakan CRUD untuk skill dan kategori.
- Sistem menyediakan CRUD untuk proyek.
- Sistem menyediakan CRUD untuk pengalaman.
- Sistem menyediakan CRUD untuk sertifikat.
- Sistem menyediakan CRUD untuk kontak.
- Sistem menyediakan pengelolaan media.
- Sistem menyediakan preview konten.
- Sistem menyediakan status draft dan published.
- Sistem menyediakan pengaturan urutan.
- Sistem menyediakan konfirmasi sebelum penghapusan.
- Sistem mencatat perubahan penting.

---

# 25. Kebutuhan Nonfungsional

## 25.1 Responsivitas

Website harus dapat digunakan melalui:

- Desktop.
- Laptop.
- Tablet.
- Smartphone.

Tidak boleh terjadi:

- Konten terpotong.
- Teks keluar dari container.
- Foto mengalami distorsi.
- Menu tidak dapat digunakan.
- Tombol terlalu kecil untuk disentuh.

## 25.2 Performa

Target awal:

- Halaman utama dapat dimuat dengan cepat pada koneksi standar.
- Gambar menggunakan format teroptimasi.
- Gambar menggunakan lazy loading jika sesuai.
- Database query harus dioptimalkan.
- Konten statis dapat menggunakan cache.
- Ukuran gambar tidak boleh terlalu besar.

## 25.3 Aksesibilitas

- Setiap foto memiliki alt text.
- Navigasi dapat digunakan menggunakan keyboard.
- Form memiliki label.
- Tombol memiliki nama yang jelas.
- Struktur heading harus berurutan.
- Konten tetap dapat dipahami tanpa bergantung pada warna.
- Pesan error dapat dibaca dengan jelas.

## 25.4 SEO

Website memiliki:

- Page title.
- Meta description.
- Open Graph title.
- Open Graph description.
- Open Graph image.
- Canonical URL.
- Sitemap.
- Robots.txt.
- Slug proyek yang mudah dibaca.
- Structured data jika diperlukan.

## 25.5 Keamanan

- Password menggunakan hashing.
- Input divalidasi.
- Output disanitasi.
- Upload file dibatasi.
- Route admin dilindungi.
- Login memiliki rate limiting.
- Aplikasi menggunakan HTTPS pada production.
- Informasi rahasia disimpan pada environment variable.
- Pesan error tidak membocorkan informasi sistem.
- Backup database dilakukan secara berkala.

---

# 26. Validasi Form

## 26.1 Profil

- Nama wajib diisi.
- Headline wajib diisi.
- IPK harus berupa angka.
- IPK tidak boleh lebih besar dari skala IPK.
- Foto harus menggunakan format yang didukung.

## 26.2 Proyek

- Nama proyek wajib diisi.
- Slug wajib unik.
- Ringkasan wajib diisi.
- URL harus menggunakan format URL yang valid.
- Thumbnail wajib jika proyek dipublikasikan.
- Status publikasi wajib dipilih.

## 26.3 Pengalaman

- Posisi wajib diisi.
- Organisasi wajib diisi.
- Tanggal mulai wajib diisi.
- Tanggal selesai tidak wajib jika masih aktif.
- Tanggal selesai tidak boleh lebih awal dari tanggal mulai.

## 26.4 Sertifikat

- Nama sertifikat wajib diisi.
- Penerbit wajib diisi.
- Tanggal diterbitkan wajib diisi.
- Tanggal kedaluwarsa tidak boleh lebih awal dari tanggal diterbitkan.
- Credential URL harus menggunakan format URL yang valid.

## 26.5 Kontak

- Platform wajib diisi.
- Nilai kontak wajib diisi.
- Email harus menggunakan format email yang valid.
- URL media sosial harus menggunakan format URL yang valid.

---

# 27. Penanganan Error

Sistem harus menampilkan pesan yang mudah dipahami jika:

- Login gagal.
- Session berakhir.
- Data tidak ditemukan.
- Data gagal disimpan.
- File gagal diunggah.
- Ukuran file terlalu besar.
- Format file tidak didukung.
- Koneksi database gagal.
- Slug telah digunakan.
- URL tidak valid.
- Validasi form gagal.

Sistem tidak boleh menampilkan:

- Database credential.
- Stack trace di production.
- Path server internal.
- Token autentikasi.
- Informasi sensitif lainnya.

---

# 28. Backup dan Pemulihan

Sistem disarankan memiliki:

- Backup database berkala.
- Backup file media.
- Prosedur pemulihan database.
- Prosedur pemulihan media.
- Soft delete untuk konten penting.
- Audit log untuk perubahan admin.

Konten yang dihapus dapat masuk ke Trash sebelum dihapus permanen.

---

# 29. Kriteria Penerimaan

## 29.1 Website Publik

- Hero menampilkan nama Muhammad Rifat Hakim.
- Hero menampilkan status sebagai mahasiswa Informatika Universitas Gunadarma.
- Hero menampilkan bidang networking dan web development.
- Hero memiliki tempat untuk nilai IPK.
- Hero memiliki tempat untuk foto.
- About Me menampilkan deskripsi profil.
- Skills ditampilkan berdasarkan kategori.
- Projects memiliki kerangka data yang dapat diisi melalui admin.
- Experience menampilkan seluruh pengalaman awal.
- Experience mendukung foto dan dokumentasi.
- Certificates memiliki kerangka yang dapat diisi melalui admin.
- Contact memiliki kerangka yang dapat diisi melalui admin.
- Website dapat dibuka melalui perangkat mobile.

## 29.2 Admin Dashboard

- `/admin` tidak dapat diakses tanpa login.
- Administrator dapat login.
- Administrator dapat logout.
- Administrator dapat mengubah profil.
- Administrator dapat mengubah IPK.
- Administrator dapat mengganti foto hero.
- Administrator dapat mengelola skill.
- Administrator dapat mengelola proyek.
- Administrator dapat mengelola pengalaman.
- Administrator dapat mengelola sertifikat.
- Administrator dapat mengelola kontak.
- Administrator dapat mengunggah foto.
- Administrator dapat menentukan status draft atau published.
- Administrator dapat mengatur urutan konten.
- Perubahan data tersimpan ke database.
- Konten published tampil di website publik.
- Konten draft dan hidden tidak tampil di website publik.

---

# 30. Prioritas Pengembangan

## 30.1 Prioritas 1: Fondasi

- Menentukan teknologi.
- Menyiapkan struktur proyek.
- Menyiapkan database.
- Membuat skema database.
- Membuat autentikasi admin.
- Membuat proteksi route admin.
- Membuat pengelolaan media.

## 30.2 Prioritas 2: Konten Utama

- Hero.
- About Me.
- Skills.
- Projects.
- Experiences.
- Certificates.
- Contact.
- Footer.

## 30.3 Prioritas 3: Admin Dashboard

- Dashboard overview.
- Pengelolaan profil.
- Pengelolaan skill.
- Pengelolaan proyek.
- Pengelolaan pengalaman.
- Pengelolaan sertifikat.
- Pengelolaan kontak.
- Media Library.
- Pengaturan website.

## 30.4 Prioritas 4: Penyempurnaan

- Responsivitas.
- Optimasi foto.
- SEO.
- Aksesibilitas.
- Keamanan.
- Audit log.
- Backup.
- Pengujian.
- Deployment.

---

# 31. Tahapan Pengembangan

## Fase 1: Requirement dan Perencanaan

Hasil yang diharapkan:

- PRD disetujui.
- Struktur konten disetujui.
- Teknologi dipilih.
- Struktur database ditentukan.

## Fase 2: Backend dan Database

Hasil yang diharapkan:

- Database tersedia.
- API atau server action tersedia.
- Authentication tersedia.
- CRUD setiap modul tersedia.
- Upload media tersedia.

## Fase 3: Admin Dashboard

Hasil yang diharapkan:

- Admin dapat login.
- Admin dapat mengelola seluruh konten.
- Admin dapat mengatur status publikasi.
- Admin dapat mengelola foto.

## Fase 4: Website Publik

Hasil yang diharapkan:

- Seluruh section tersedia.
- Data ditampilkan dari database.
- Detail proyek tersedia.
- Tampilan responsif.

## Fase 5: Pengujian

Pengujian mencakup:

- Pengujian login.
- Pengujian keamanan route.
- Pengujian CRUD.
- Pengujian upload.
- Pengujian database.
- Pengujian mobile.
- Pengujian performa.
- Pengujian link.
- Pengujian validasi form.

## Fase 6: Deployment

Hasil yang diharapkan:

- Website dapat diakses melalui domain.
- HTTPS aktif.
- Database production tersedia.
- Media storage tersedia.
- Environment variable dikonfigurasi.
- Backup awal dibuat.

---

# 32. Rekomendasi Arsitektur Teknis

Teknologi belum bersifat final, tetapi struktur sistem sebaiknya terdiri dari:

## Frontend

Digunakan untuk:

- Website publik.
- Admin dashboard.
- Form pengelolaan konten.
- Preview media.
- Navigasi.

## Backend

Digunakan untuk:

- Autentikasi.
- Otorisasi.
- Validasi data.
- CRUD.
- Upload media.
- Pengelolaan session.
- Pencatatan audit log.

## Database

Digunakan untuk menyimpan:

- Profil.
- Skills.
- Projects.
- Experiences.
- Certificates.
- Contacts.
- Site settings.
- Metadata media.
- Akun administrator.
- Audit log.

## Object Storage

Digunakan untuk menyimpan:

- Foto profil.
- Foto proyek.
- Foto pengalaman.
- Foto sertifikat.
- CV.
- File sertifikat.

File sebaiknya tidak disimpan langsung sebagai binary di dalam database. Database hanya menyimpan metadata dan lokasi file.

---

# 33. Risiko Produk

## 33.1 Risiko Keamanan Admin

**Risiko:** Halaman `/admin` menjadi sasaran percobaan login.

**Mitigasi:**

- Gunakan password kuat.
- Gunakan rate limiting.
- Gunakan session yang aman.
- Tambahkan autentikasi dua faktor pada versi selanjutnya.
- Catat login gagal.

## 33.2 Risiko Upload File

**Risiko:** File berbahaya diunggah melalui admin dashboard.

**Mitigasi:**

- Validasi MIME type.
- Batasi ekstensi.
- Batasi ukuran.
- Ganti nama file.
- Jangan menjalankan file yang diunggah.
- Gunakan penyimpanan terpisah.

## 33.3 Risiko Kehilangan Data

**Risiko:** Konten portofolio atau foto terhapus.

**Mitigasi:**

- Backup berkala.
- Soft delete.
- Trash.
- Audit log.

## 33.4 Risiko Performa

**Risiko:** Foto berukuran besar memperlambat website.

**Mitigasi:**

- Kompresi otomatis.
- Konversi WebP.
- Thumbnail.
- Lazy loading.
- Pembatasan ukuran upload.

---

# 34. Pengembangan Berikutnya

Fitur yang dapat ditambahkan setelah versi pertama:

- Blog atau artikel.
- Multi-language.
- Dark mode.
- Dashboard analytics.
- Integrasi GitHub.
- Statistik repository.
- Integrasi LinkedIn.
- Email notification.
- Two-factor authentication.
- Version history.
- Preview sebelum publish.
- Scheduled publishing.
- Export dan import data.
- Download portofolio dalam PDF.
- Testimoni.
- Riwayat pendidikan.
- Halaman layanan.
- Integrasi monitoring website.

---

# 35. Kesimpulan

Website portofolio Muhammad Rifat Hakim akan menjadi pusat informasi profesional yang menampilkan profil, kemampuan networking dan web development, proyek, pengalaman, sertifikat, serta informasi kontak.

Seluruh konten utama dikelola melalui admin dashboard di `/admin` dan disimpan dalam database. Dengan arsitektur tersebut, pemilik website dapat memperbarui portofolio tanpa harus mengubah kode sumber setiap kali terdapat proyek, pengalaman, keterampilan, foto, atau sertifikat baru.

Fokus versi pertama adalah:

1. Kerangka website publik yang lengkap.
2. Struktur data yang fleksibel.
3. Admin dashboard yang aman.
4. Pengelolaan konten berbasis database.
5. Dukungan foto pada Hero, Projects, Experiences, dan Certificates.
6. Kemudahan pengembangan desain visual pada tahap berikutnya.