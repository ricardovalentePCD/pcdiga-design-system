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

  // Copiar código dos blocos .cb__code
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.cb__copy');
    if (!btn) return;
    var codeEl = btn.parentElement.querySelector('pre code') || btn.parentElement.querySelector('pre');
    if (!codeEl) return;
    var text = codeEl.textContent || '';
    var done = function () {
      var original = btn.dataset.originalText || btn.textContent;
      btn.dataset.originalText = original;
      btn.textContent = 'Copiado';
      btn.classList.add('is-copied');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('is-copied');
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
  });
})();
