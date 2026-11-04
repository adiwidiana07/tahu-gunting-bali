/**
 * Lightbox galeri memakai <dialog> bawaan browser.
 * - showModal() mengunci fokus di dalam dialog; Esc menutup (bawaan browser)
 * - Panah kiri/kanan di keyboard, tombol di layar, dan geser (swipe) di HP
 * - Klik area gelap di luar foto untuk menutup
 */
const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-gallery] a[data-index]')];

if (dialog && links.length) {
  const img = dialog.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-lb-caption]')!;
  const counter = dialog.querySelector<HTMLElement>('[data-lb-count]')!;
  let current = 0;
  let opener: HTMLElement | null = null;

  const show = (index: number) => {
    current = (index + links.length) % links.length;
    const { src = '', srcset = '', alt = '' } = links[current]!.dataset;
    img.removeAttribute('src');
    img.srcset = srcset;
    img.src = src;
    img.alt = alt;
    caption.textContent = alt;
    counter.textContent = `${current + 1} / ${links.length}`;
  };

  links.forEach((link, i) =>
    link.addEventListener('click', (e) => {
      e.preventDefault();
      opener = link;
      show(i);
      dialog.showModal();
    }),
  );

  dialog.addEventListener('close', () => opener?.focus());

  dialog.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const action = target.closest<HTMLElement>('[data-lb]')?.dataset.lb;
    if (action === 'prev') show(current - 1);
    else if (action === 'next') show(current + 1);
    else if (action === 'close' || target === dialog || target.hasAttribute('data-lb-stage')) dialog.close();
  });

  // Kunci fokus: Tab berputar di antara tombol-tombol lightbox saja.
  const focusables = [...dialog.querySelectorAll<HTMLButtonElement>('button')];
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') {
      e.preventDefault();
      const i = focusables.indexOf(document.activeElement as HTMLButtonElement);
      const next = i === -1 ? 0 : (i + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
      focusables[next]!.focus();
    }
  });

  let startX = 0;
  let startY = 0;
  dialog.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  dialog.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'mouse') return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - startY)) show(current + (dx < 0 ? 1 : -1));
  });
}
