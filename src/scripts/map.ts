/** Memuat Google Maps hanya setelah pengunjung menekan "Tampilkan peta". */
const box = document.querySelector<HTMLElement>('[data-map]');
const button = box?.querySelector<HTMLButtonElement>('[data-map-load]');

if (box && button) {
  button.classList.remove('hidden');
  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = box.dataset.embed ?? '';
    iframe.title = 'Peta lokasi warung di Google Maps';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.className = 'absolute inset-0 size-full border-0';
    iframe.allowFullscreen = true;
    box.append(iframe);
    box.querySelector('[data-map-overlay]')?.remove();
    iframe.focus();
  });
}
