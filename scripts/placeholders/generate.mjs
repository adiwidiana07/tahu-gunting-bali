// Membuat foto contoh (placeholder) dari scene.html memakai Chrome headless + sharp.
// Pemakaian: node scripts/placeholders/generate.mjs
// Hanya untuk awal proyek. Setelah foto asli tersedia, jangan jalankan lagi
// (script ini akan menimpa file di src/assets dan public/og-image.jpg).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const chrome = process.env.CHROME_BIN ?? 'google-chrome';
const tmp = mkdtempSync(join(tmpdir(), 'tgb-'));

const jobs = [
  { out: 'src/assets/hero/hero.jpg', scene: 'hero', w: 2400, h: 1350, seed: 11 },
  { out: 'src/assets/about/dapur.jpg', scene: 'about', w: 1200, h: 1500, seed: 5 },
  { out: 'src/assets/gallery/01-tahu-gunting-original.jpg', scene: 'plate', w: 1200, h: 1500, seed: 3 },
  { out: 'src/assets/gallery/02-tahu-renyah-close-up.jpg', scene: 'closeup', w: 1200, h: 1500, seed: 8 },
  { out: 'src/assets/gallery/03-bumbu-kacang.jpg', scene: 'sauce', w: 1200, h: 1500, seed: 21 },
  { out: 'src/assets/gallery/04-proses-menggoreng.jpg', scene: 'wok', w: 1200, h: 1500, seed: 4 },
  { out: 'src/assets/gallery/05-tahu-gunting-bungkus.jpg', scene: 'paper', w: 1200, h: 1500, seed: 13 },
  { out: 'src/assets/gallery/06-porsi-jumbo.jpg', scene: 'plate', w: 1200, h: 1500, seed: 42 },
  { out: 'src/assets/gallery/07-tahu-pedas.jpg', scene: 'closeup', w: 1200, h: 1500, seed: 77 },
  { out: 'src/assets/gallery/08-siap-diantar.jpg', scene: 'paper', w: 1200, h: 1500, seed: 99 },
  {
    out: 'public/og-image.jpg', scene: 'og', w: 1200, h: 630, seed: 6,
    extra: { title: process.env.OG_TITLE ?? 'Tahu Gunting Pak Made', sub: process.env.OG_SUB ?? 'Renyah di luar, lembut di dalam. Bumbu kacang racikan sendiri.' },
  },
];

for (const job of jobs) {
  const params = new URLSearchParams({ scene: job.scene, w: String(job.w), h: String(job.h), seed: String(job.seed), ...job.extra });
  const url = `${pathToFileURL(join(here, 'scene.html')).href}?${params}`;
  const png = join(tmp, 'shot.png');
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--force-device-scale-factor=1', `--window-size=${job.w},${job.h}`, '--virtual-time-budget=4000',
    `--screenshot=${png}`, url,
  ], { stdio: 'ignore' });
  await sharp(png).resize(job.w, job.h, { fit: 'cover' }).jpeg({ quality: 86, mozjpeg: true }).toFile(join(root, job.out));
  console.log('✓', job.out);
}
rmSync(tmp, { recursive: true, force: true });
