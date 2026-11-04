/**
 * SEMUA ISI WEBSITE ADA DI FILE INI.
 *
 * Ganti teks, nomor WhatsApp, alamat, jam buka, menu, dan foto di sini;
 * komponen lain tidak perlu disentuh. Baris bertanda `TODO` masih berisi
 * data contoh dan wajib diganti dengan data asli sebelum situs dipublikasikan.
 * Cari semua yang belum diganti dengan:  grep -rn "TODO" src
 */
import type { ImageMetadata } from 'astro';

import heroImage from '../assets/hero/hero.jpg';
import aboutImage from '../assets/about/dapur.jpg';
import gallery01 from '../assets/gallery/01-tahu-gunting-original.jpg';
import gallery02 from '../assets/gallery/02-tahu-renyah-close-up.jpg';
import gallery03 from '../assets/gallery/03-bumbu-kacang.jpg';
import gallery04 from '../assets/gallery/04-proses-menggoreng.jpg';
import gallery05 from '../assets/gallery/05-tahu-gunting-bungkus.jpg';
import gallery06 from '../assets/gallery/06-porsi-jumbo.jpg';
import gallery07 from '../assets/gallery/07-tahu-pedas.jpg';
import gallery08 from '../assets/gallery/08-siap-diantar.jpg';

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

export interface MenuItem {
  name: string;
  description?: string;
  /** Harga dalam rupiah, tanpa titik. Contoh: 10000 */
  price: number;
}

export interface Photo {
  src: ImageMetadata;
  /** Deskripsi foto dalam Bahasa Indonesia (untuk pembaca layar dan Google) */
  alt: string;
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

export interface DeliveryLink {
  name: 'GoFood' | 'GrabFood' | 'ShopeeFood';
  url: string;
}

/* ---------- Data bisnis ---------- */

export const site = {
  // TODO: nama brand asli
  name: 'Tahu Gunting Pak Made',
  // TODO: tagline asli
  tagline: 'Renyah Sampai Gigitan Terakhir',

  seo: {
    // TODO: sesuaikan nama brand dan kota (maks. ±60 karakter)
    title: 'Tahu Gunting Pak Made – Jajanan Renyah di Denpasar, Bali',
    // TODO: sesuaikan (140–160 karakter)
    description:
      'Tahu gunting renyah dengan bumbu kacang racikan sendiri, digoreng segar setiap hari di Denpasar, Bali. Mulai Rp10.000, pesan langsung via WhatsApp.',
  },

  whatsapp: {
    // TODO: nomor WhatsApp asli, format 62 tanpa 0 di depan, tanpa spasi/tanda +
    number: '6281234567890',
    // Pesan otomatis saat pengunjung membuka chat
    message: 'Halo, saya mau pesan tahu gunting',
  },

  address: {
    // TODO: alamat lengkap
    street: 'Jl. Contoh Raya No. 12, Sumerta Kelod',
    city: 'Denpasar',
    region: 'Bali',
    postalCode: '80239',
    country: 'ID',
    // TODO: link "Bagikan" dari Google Maps lokasi warung
    mapsUrl: 'https://maps.google.com/?q=Denpasar,+Bali',
    // TODO: koordinat warung (klik kanan di Google Maps untuk menyalin)
    geo: { latitude: -8.6705, longitude: 115.2126 },
  },

  // TODO: jam buka asli
  hours: [
    { label: 'Senin–Sabtu', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '15:00', closes: '21:00' },
    { label: 'Minggu', days: ['Sunday'], opens: '16:00', closes: '21:00' },
  ] satisfies OpeningHours[],

  // TODO: kisaran harga untuk Google, mis. "Rp10.000–Rp25.000"
  priceRange: 'Rp10.000–Rp25.000',

  hero: {
    title: 'Tahu Gunting Renyah, Langsung dari Dapur Bali',
    // TODO: sesuaikan bumbu dan harga termurah
    subtitle: 'Digunting segar, digoreng sampai keemasan, disiram bumbu kacang gurih. Mulai Rp10.000 seporsi.',
    image: {
      src: heroImage,
      alt: 'Sepiring tahu gunting goreng keemasan dengan siraman bumbu kacang dan irisan cabai di atas meja kayu',
    } satisfies Photo,
  },

  about: {
    title: 'Dari wajan kecil di Denpasar',
    // TODO: cerita usaha asli (2–3 paragraf pendek)
    paragraphs: [
      'Berawal dari gerobak kecil di depan rumah, kami menjual tahu gunting untuk tetangga dan anak sekolah sekitar. Resepnya sederhana: tahu segar, minyak bersih, dan bumbu yang diulek setiap pagi.',
      'Tahu kami ambil dari perajin lokal setiap hari, lalu digunting sesuai pesanan supaya tetap hangat dan renyah saat sampai di tangan Anda.',
      'Bumbu kacangnya racikan keluarga: gurih, sedikit manis, dan pedasnya bisa diatur dari tidak pedas sampai pedas mantap.',
    ],
    highlights: [
      { icon: 'leaf', title: 'Tahu segar setiap hari', text: 'Diambil pagi hari dari perajin tahu lokal.' },
      { icon: 'flame', title: 'Bumbu racikan sendiri', text: 'Bumbu kacang diulek sendiri, level pedas bisa dipilih.' },
      { icon: 'wallet', title: 'Harga ramah kantong', text: 'Seporsi mulai Rp10.000, cocok untuk camilan sore.' },
    ] satisfies Highlight[],
    image: {
      src: aboutImage,
      alt: 'Tahu putih segar siap digunting di atas talenan, di samping sepiring tahu gunting yang sudah digoreng',
    } satisfies Photo,
  },

  // TODO: menu dan harga asli. Kosongkan array ([]) untuk menyembunyikan daftar menu.
  menu: [
    { name: 'Tahu Gunting Original', description: 'Bumbu kacang, kecap, dan bawang goreng', price: 10000 },
    { name: 'Tahu Gunting Pedas', description: 'Ekstra cabai rawit, level 1–5', price: 12000 },
    { name: 'Tahu Gunting Komplit', description: 'Dengan lontong dan kerupuk', price: 15000 },
    { name: 'Porsi Jumbo', description: 'Untuk 3–4 orang', price: 25000 },
  ] satisfies MenuItem[],

  // Foto galeri: 6–12 foto, rasio potret 4:5 paling pas. Urutan di sini = urutan tampil.
  // TODO: ganti dengan foto asli (simpan di src/assets/gallery/) dan perbarui alt-nya
  gallery: [
    { src: gallery01, alt: 'Tahu gunting original dengan siraman bumbu kacang di piring putih' },
    { src: gallery02, alt: 'Potongan tahu goreng renyah berwarna keemasan dari dekat' },
    { src: gallery03, alt: 'Semangkuk bumbu kacang dengan irisan cabai merah' },
    { src: gallery04, alt: 'Potongan tahu sedang digoreng di wajan berisi minyak panas' },
    { src: gallery05, alt: 'Tahu gunting dibungkus kertas nasi, siap dibawa pulang' },
    { src: gallery06, alt: 'Tahu gunting porsi jumbo untuk dimakan bersama' },
    { src: gallery07, alt: 'Tahu gunting pedas dengan taburan cabai' },
    { src: gallery08, alt: 'Pesanan tahu gunting yang sudah dibungkus dan siap diantar' },
  ] satisfies Photo[],

  // TODO: akun media sosial asli. Hapus baris yang tidak dipakai.
  socials: [
    { platform: 'instagram', handle: '@tahuguntingpakmade', url: 'https://instagram.com/tahuguntingpakmade' },
    { platform: 'tiktok', handle: '@tahuguntingpakmade', url: 'https://www.tiktok.com/@tahuguntingpakmade' },
  ] satisfies SocialLink[],

  // TODO: link toko di aplikasi ojek online. Hapus baris yang tidak ada.
  delivery: [
    { name: 'GoFood', url: 'https://gofood.co.id/' },
    { name: 'GrabFood', url: 'https://food.grab.com/id/id/' },
    { name: 'ShopeeFood', url: 'https://shopee.co.id/m/shopeefood' },
  ] satisfies DeliveryLink[],
};
