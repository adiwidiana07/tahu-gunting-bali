/**
 * SEMUA ISI WEBSITE ADA DI FILE INI.
 *
 * Ganti teks, nomor WhatsApp, alamat, jam buka, harga, dan foto di sini;
 * komponen lain tidak perlu disentuh. Baris bertanda `TODO` masih berisi
 * data contoh dan wajib diganti dengan data asli sebelum situs dipublikasikan.
 * Cari semua yang belum diganti dengan:  grep -rn "TODO" src
 */
import type { ImageMetadata } from 'astro';

import heroImage from '../assets/hero/warung-nang-sading.jpg';
import aboutImage from '../assets/about/nang-sading.jpg';
import gallery01 from '../assets/gallery/01-tipat-tahu-meja-kayu.jpg';
import gallery02 from '../assets/gallery/02-meja-racik.jpg';
import gallery03 from '../assets/gallery/03-tipat-tahu-kerupuk.jpg';
import gallery04 from '../assets/gallery/04-spanduk-warung.jpg';
import gallery05 from '../assets/gallery/05-tipat-tahu-tauge.jpg';
import gallery06 from '../assets/gallery/06-gerobak.jpg';

/* ---------- Tipe data (tidak perlu diubah) ---------- */

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHours {
  /** Teks yang tampil di website, mis. "Senin–Sabtu" */
  label: string;
  /** Hari dalam bahasa Inggris, untuk Google (data terstruktur) */
  days: DayOfWeek[];
  /** Format 24 jam "HH:MM" */
  opens: string;
  closes: string;
}

export interface Photo {
  src: ImageMetadata;
  /** Deskripsi foto dalam Bahasa Indonesia (untuk pembaca layar dan Google) */
  alt: string;
  /** Opsional: bagian foto yang dipertahankan saat foto dipotong (CSS object-position), mis. '100% 50%' = sisi kanan */
  position?: string;
}

export interface Highlight {
  icon: 'leaf' | 'flame' | 'wallet';
  title: string;
  text: string;
}

export interface SocialLink {
  platform: 'instagram' | 'tiktok';
  handle: string;
  url: string;
}

/* ---------- Data bisnis ---------- */

export const site = {
  name: 'Tipat Tahu Nang Sading',
  // TODO: tagline asli
  tagline: 'Tipat Tahu Bumbu Kacang Khas Bali',

  seo: {
    // TODO: sesuaikan nama brand dan kota (maks. ±60 karakter)
    title: 'Tipat Tahu Nang Sading – Tipat Tahu di Mas, Ubud, Gianyar',
    // TODO: sesuaikan (140–160 karakter)
    description:
      'Tipat tahu dengan tauge segar dan bumbu kacang ulek racikan sendiri di Jl. Raya Mas, Ubud, Gianyar. Mulai Rp5.000 seporsi, pesan langsung via WhatsApp.',
  },

  whatsapp: {
    // TODO: nomor WhatsApp asli, format 62 tanpa 0 di depan, tanpa spasi/tanda +
    number: '6281234567890',
    // Pesan otomatis saat pengunjung membuka chat
    message: 'Halo, saya mau pesan tipat tahu',
  },

  address: {
    // Sesuai spanduk warung. Tambahkan nomor jika ada.
    street: 'Jl. Raya Mas, Banjar Batanancak, Desa Mas',
    city: 'Ubud',
    region: 'Gianyar, Bali',
    postalCode: '80571',
    country: 'ID',
    // TODO: link "Bagikan" dari Google Maps lokasi warung
    mapsUrl: 'https://maps.google.com/?q=Jl.+Raya+Mas,+Mas,+Ubud,+Gianyar,+Bali',
    // TODO: koordinat warung (klik kanan di Google Maps untuk menyalin). Sekarang masih titik perkiraan Desa Mas.
    geo: { latitude: -8.5406, longitude: 115.2636 },
  },

  hours: [
    { label: 'Setiap hari', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '15:00', closes: '21:00' },
  ] satisfies OpeningHours[],

  // TODO: kisaran harga untuk Google, mis. "Rp10.000–Rp25.000"
  priceRange: 'Rp5.000–Rp10.000',

  hero: {
    title: 'Tipat Tahu Bumbu Kacang, Langsung dari Warung di Mas',
    // TODO: sesuaikan isian dan harga termurah
    subtitle: 'Tipat, tahu goreng, dan tauge segar disiram bumbu kacang ulek, lengkap dengan kerupuk. Mulai Rp5.000 seporsi.',
    image: {
      src: heroImage,
      alt: 'Warung Nang Sading: gerobak kayu beratap terpal di pinggir jalan, di depan bangunan beratap genteng',
      position: '50% 65%',
    } satisfies Photo,
  },

  about: {
    title: 'Dari gerobak kecil di Mas, Ubud',
    // TODO: cerita usaha asli (2–3 paragraf pendek)
    paragraphs: [
      'Berawal dari gerobak kecil di pinggir Jl. Raya Mas, Nang Sading menjual tipat tahu untuk tetangga, pekerja, dan siapa saja yang lewat. Resepnya sederhana: tipat buatan sendiri, tahu segar, dan bumbu yang diulek setiap pagi.',
      'Tahu kami ambil dari perajin lokal setiap hari dan digoreng saat dipesan, supaya tetap hangat ketika sampai di piring Anda.',
      'Bumbu kacangnya racikan keluarga: gurih, sedikit manis, dan pedasnya bisa diatur dari tidak pedas sampai pedas mantap.',
    ],
    highlights: [
      { icon: 'leaf', title: 'Tahu segar setiap hari', text: 'Diambil pagi hari dari perajin tahu lokal.' },
      { icon: 'flame', title: 'Bumbu racikan sendiri', text: 'Bumbu kacang diulek sendiri, level pedas bisa dipilih.' },
      { icon: 'wallet', title: 'Harga ramah kantong', text: 'Seporsi mulai Rp5.000, pas untuk sarapan atau makan siang.' },
    ] satisfies Highlight[],
    image: {
      src: aboutImage,
      alt: 'Nang Sading berfoto di depan spanduk hijau warungnya yang bertuliskan "Warung Nang Sading Jual Tahu Tipat"',
      position: '100% 50%',
    } satisfies Photo,
  },

  // Harga termurah seporsi, dalam rupiah tanpa titik. Tampil sebagai "Harga mulai dari Rp5.000".
  startingPrice: 5000,

  // Foto galeri: 6 atau 12 foto (kelipatan 6 agar grid selalu penuh), rasio potret 4:5 paling pas. Urutan di sini = urutan tampil.
  gallery: [
    { src: gallery01, alt: 'Sepiring tipat tahu dengan tauge, bumbu kacang, dan kerupuk di atas meja kayu' },
    { src: gallery02, alt: 'Meja racik warung: tahu goreng di nampan, panci tipat, dan bumbu-bumbu' },
    { src: gallery03, alt: 'Tipat tahu dengan siraman bumbu kacang dan kerupuk di piring putih' },
    { src: gallery04, alt: 'Spanduk hijau bertuliskan "Warung Nang Sading Jual Tahu Tipat, Jl. Raya Mas, Banjar Batanancak"' },
    { src: gallery05, alt: 'Tipat tahu dengan tauge dan bumbu kacang dari dekat' },
    { src: gallery06, alt: 'Gerobak warung di pinggir jalan pada pagi hari' },
  ] satisfies Photo[],

  // TODO: akun media sosial asli. Hapus baris yang tidak dipakai.
  socials: [
    { platform: 'instagram', handle: '@tipattahunangsading', url: 'https://instagram.com/tipattahunangsading' },
    { platform: 'tiktok', handle: '@tipattahunangsading', url: 'https://www.tiktok.com/@tipattahunangsading' },
  ] satisfies SocialLink[],
};
