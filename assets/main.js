// PCDIGA Design System — minimal interactivity
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      const expanded = sidebar.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    sidebar.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') sidebar.classList.remove('is-open');
    });
  }

  // Highlight current sidebar entry on scroll (foundations page)
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.sidebar a[href^="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) => {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach((s) => obs.observe(s));
  }
})();
