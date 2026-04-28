/* PCDIGA Design System — Theme toggle (light/dark) */
(function () {
  var STORAGE_KEY = 'pcdiga-ds-theme';
  var root = document.documentElement;

  // Aplicar tema guardado o mais cedo possível (evita flash)
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      root.setAttribute('data-theme', saved);
    }
  } catch (e) {}

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });
})();
