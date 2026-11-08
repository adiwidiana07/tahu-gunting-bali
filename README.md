# Tahu Gunting Bali – Landing Page

Landing page satu halaman untuk usaha tahu gunting di Bali. Situsnya statis, sangat ringan untuk HP, dan semua tombol pesan mengarah ke WhatsApp.

- **Stack:** Astro 7 (output statis), Tailwind CSS v4, TypeScript strict, pnpm
- **Section:** Hero, Tentang (About + menu), Galeri (dengan lightbox), Kontak, Footer, dan tombol WhatsApp melayang
- **Hasil Lighthouse mobile:** 100 / 100 / 100 / 100, total halaman awal sekitar 144 KB, JavaScript sekitar 2 KB

## Menjalankan di komputer

Perlu Node.js 22.22 atau lebih baru, dan pnpm.

```bash
pnpm install
pnpm dev        # buka http://localhost:4321
pnpm build      # cek TypeScript lalu build ke folder dist/
pnpm preview    # coba hasil build
pnpm todo       # daftar data contoh yang belum diganti
```

## Mengganti isi website

**Semua teks dan data ada di satu file: `src/data/site.ts`.** Komponen lain tidak perlu disentuh.

Setiap baris bertanda `TODO` masih berisi data contoh. Jalankan `pnpm todo` untuk melihat sisanya. Situs belum boleh dipublikasikan selama masih ada `TODO`.

| Yang diganti | Lokasi di `site.ts` | Catatan |
| --- | --- | --- |
| Nama brand & tagline | `name`, `tagline` | |
| Judul & deskripsi Google | `seo.title`, `seo.description` | Deskripsi 140–160 karakter |
| Nomor WhatsApp | `whatsapp.number` | Format `62812...`: tanpa 0 di depan, tanpa `+`, spasi, atau strip |
| Pesan otomatis WhatsApp | `whatsapp.message` | |
| Alamat, link & koordinat peta | `address` | Koordinat: klik kanan lokasi di Google Maps, lalu klik angka koordinatnya untuk menyalin |
| Jam buka | `hours` | `days` ditulis dalam bahasa Inggris (untuk Google) |
| Menu & harga | `menu` | Harga tanpa titik, mis. `10000`. Kosongkan (`[]`) untuk menyembunyikan menu |
| Cerita usaha | `about.paragraphs` | 2–3 paragraf pendek |
| Instagram / TikTok | `socials` | Hapus baris yang tidak dipakai |

### Mengganti foto

Semua foto sekarang masih **foto contoh** (ilustrasi berlabel "Foto contoh"). Ganti dengan foto asli:

1. Simpan foto JPG berkualitas tinggi ke folder yang sesuai:
   - `src/assets/hero/`: 1 foto landscape, lebar minimal 1920 px. Teks berada di sisi kiri, jadi letakkan makanan di tengah-kanan.
   - `src/assets/about/`: 1 foto potret (rasio 4:5), mis. proses memasak atau pemilik.
   - `src/assets/gallery/`: **6 atau 12 foto** (kelipatan 6 agar grid selalu penuh di HP dan desktop), rasio 4:5.
2. Perbarui baris `import` di bagian atas `site.ts` agar nama filenya cocok, lalu perbarui `alt` (deskripsi foto dalam Bahasa Indonesia).
3. Hapus foto contoh yang tidak dipakai lagi.

Tidak perlu mengecilkan foto sendiri: Astro otomatis membuat versi AVIF/WebP dalam beberapa ukuran.

### Gambar preview WhatsApp (`public/og-image.jpg`)

Gambar ini muncul saat link dibagikan di WhatsApp/IG/Facebook. Ukurannya harus **1200 × 630 px**, format JPG. Ganti file tersebut dengan desain sendiri, misalnya foto produk dengan nama brand.

> `scripts/placeholders/` hanya alat untuk membuat foto contoh di awal proyek. **Jangan dijalankan lagi setelah foto asli dimasukkan**, karena akan menimpanya.

### Logo

Saat ini navbar memakai `public/favicon.svg` (ikon tahu sederhana) sebagai logo. Jika punya logo sendiri, ganti file itu (SVG persegi), atau beri tahu developer untuk memasang logo PNG.

### Domain

Jika memakai domain sendiri, ganti `SITE_URL` di `astro.config.mjs` dan baris `Sitemap:` di `public/robots.txt`. Ini penting untuk canonical URL, sitemap, dan gambar preview WhatsApp.

## Deploy ke Vercel

Output-nya statis, jadi tidak perlu adapter. Vercel mendeteksi Astro secara otomatis.

1. Push repo ini ke GitHub (branch `main`).
2. Di [vercel.com](https://vercel.com), pilih **Add New → Project**, lalu impor repo tersebut.
3. Framework preset: **Astro** (terdeteksi otomatis). Build command `pnpm build`, output directory `dist`.
4. Klik **Deploy**. Situs aktif di `nama-proyek.vercel.app`.
5. Opsional: tambahkan domain sendiri di **Settings → Domains**, ikuti petunjuk DNS, lalu perbarui `SITE_URL` (lihat bagian Domain di atas).
6. Opsional: aktifkan **Web Analytics** di dashboard proyek Vercel.

Setiap push ke `main` akan deploy otomatis, dan setiap pull request mendapat preview URL.

Setelah live, cek tampilan preview link dengan mengirim URL situs ke chat WhatsApp sendiri. Jika gambar lama masih muncul, tunggu beberapa saat (WhatsApp menyimpan cache preview).

## Struktur folder

```
src/
├── assets/          # foto (hero, about, gallery), dioptimasi otomatis
├── components/      # Navbar, Hero, About, Gallery, Contact, Footer, WhatsAppButton, Icon, Ornament
├── data/site.ts     # ← SEMUA ISI WEBSITE
├── layouts/         # BaseLayout: <head>, SEO, Open Graph, JSON-LD
├── lib/links.ts     # pembuat link WhatsApp, format rupiah/jam
├── pages/           # index.astro, 404.astro
├── scripts/         # JS kecil: menu mobile, lightbox, peta
└── styles/global.css  # Tailwind + token warna (@theme) + font
public/              # favicon, og-image.jpg, robots.txt
scripts/placeholders/  # generator foto contoh (bukan bagian situs)
```

## Catatan teknis

- **Versi paket** dipatok ke rilis yang sudah berumur minimal dua minggu saat proyek dibuat (4 Nov 2026). Astro 7.4.1 dipilih karena 7.4.2+ butuh Node 22.23.4; TypeScript 6.0.3 dipilih karena `@astrojs/check` belum mendukung TypeScript 7.
- **Font** (Fraunces untuk judul, Plus Jakarta Sans untuk teks) di-self-host, hanya subset latin, dan di-preload.
- **Peta Google** baru dimuat setelah tombol "Tampilkan peta" ditekan, supaya halaman tetap ringan dan tanpa cookie pihak ketiga. Tanpa JavaScript, kartu peta tetap berupa link ke Google Maps.
- **Animasi** muncul-saat-scroll memakai CSS scroll-driven animation (tanpa JS) dan otomatis mati jika pengguna memilih *reduce motion*.
- **Menu mobile** memakai Popover API dan **lightbox** memakai `<dialog>`: bisa dipakai dengan mouse, sentuhan (swipe), dan keyboard (Tab, panah kiri/kanan, Esc).
- **Mode gelap** tidak dibuat (opsional di rencana awal).
- Ikon garis dari [Lucide](https://lucide.dev) (ISC), ikon merek dari [Simple Icons](https://simpleicons.org) (CC0).
