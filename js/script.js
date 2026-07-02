const THEME_KEY          = 'site-theme';
const MENU_TRANSITION_MS = 300;
const htmlEl             = document.documentElement;

window.addEventListener('DOMContentLoaded', () => {
  const menuBtn        = document.getElementById('menu-btn');
  const sideMenu       = document.getElementById('side-menu');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const dropdown       = document.querySelector('.dropdown');

  if (themeToggleBtn) {
    const isLight = htmlEl.classList.contains('light');
    themeToggleBtn.innerHTML = isLight
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    themeToggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      const nowLight = htmlEl.classList.toggle('light');
      localStorage.setItem(THEME_KEY, nowLight ? 'light' : 'dark');
      themeToggleBtn.innerHTML = nowLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  }

  if (menuBtn && sideMenu) {
    menuBtn.addEventListener('click', e => {
      e.stopPropagation();
      sideMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', e => {
      if (
        sideMenu.classList.contains('open') &&
        !sideMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  if (dropdown) {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
    }
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
});

function openMenu() {
  const sideMenu = document.getElementById('side-menu');
  sideMenu.classList.add('active');
  requestAnimationFrame(() => sideMenu.classList.add('open'));
}

function closeMenu() {
  const sideMenu = document.getElementById('side-menu');
  sideMenu.classList.remove('open');
  setTimeout(() => sideMenu.classList.remove('active'), MENU_TRANSITION_MS);
}