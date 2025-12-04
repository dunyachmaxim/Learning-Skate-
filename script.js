document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const focusableSelector = 'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let prevFocus = null;

  if (!navToggle || !siteNav) return;

  navToggle.setAttribute('aria-expanded', 'false');

  function openNav() {
    siteNav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    prevFocus = document.activeElement;
    const first = siteNav.querySelector(focusableSelector);
    if (first) first.focus();
  }

  function closeNav() {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    if (prevFocus && typeof prevFocus.focus === 'function') prevFocus.focus();
  }

  navToggle.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) closeNav();
    else openNav();
  });

  // Fermer au clavier (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      closeNav();
    }
  });

  // Fermer si on clique en dehors du menu (mobile)
  document.addEventListener('click', (e) => {
    if (!siteNav.classList.contains('open')) return;
    const target = e.target;
    if (!siteNav.contains(target) && target !== navToggle) closeNav();
  });

  // Fermer quand on clique sur un lien du menu (pratique pour ancres)
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (siteNav.classList.contains('open')) closeNav();
    });
  });
});