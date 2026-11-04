import { site } from '../data/site';

/** Link wa.me dengan pesan otomatis. */
export function whatsappUrl(message: string = site.whatsapp.message): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** "6281234567890" -> "+62 812-3456-7890" */
export function formatPhone(number: string = site.whatsapp.number): string {
  const local = number.replace(/^62/, '');
  const parts = [local.slice(0, 3), local.slice(3, 7), local.slice(7)].filter(Boolean);
  return `+62 ${parts.join('-')}`;
}

/** 10000 -> "Rp10.000" */
export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString('id-ID')}`;
}

/** "15:00" -> "15.00" (penulisan jam dalam Bahasa Indonesia) */
export function formatTime(time: string): string {
  return time.replace(':', '.');
}

/** URL embed Google Maps tanpa API key, dari koordinat. */
export function mapsEmbedUrl(): string {
  const { latitude, longitude } = site.address.geo;
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
}

export function fullAddress(): string {
  const a = site.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
}
