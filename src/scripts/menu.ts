/** Tutup menu mobile (popover) setelah salah satu tautan dipilih. */
const menu = document.getElementById('mobile-menu');
menu?.querySelectorAll('[data-close-menu]').forEach((el) => el.addEventListener('click', () => menu.hidePopover()));
