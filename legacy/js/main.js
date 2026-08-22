(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dropdownTrigger = document.querySelector('.nav-trigger');
  const dropdown = document.querySelector('.dropdown');
  const backToTop = document.querySelector('.back-to-top');

  const closeDropdown = () => {
    if (!dropdownTrigger || !dropdown) return;
    dropdown.classList.remove('open');
    dropdownTrigger.setAttribute('aria-expanded', 'false');
  };

  dropdownTrigger?.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = dropdown.classList.toggle('open');
    dropdownTrigger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', closeDropdown);
  dropdown?.addEventListener('click', (event) => event.stopPropagation());

  const closeMenu = () => {
    mobileMenu?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
      closeMenu();
      menuToggle?.focus();
    }
  });

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    backToTop?.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop?.addEventListener('click', () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const currentFile = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach((link) => {
    const pages = link.dataset.page.split(',');
    if (pages.includes(currentFile)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const sectionLinks = [...document.querySelectorAll('.section-nav a[href^="#"]')];
  const trackedSections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (sectionLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    trackedSections.forEach((section) => sectionObserver.observe(section));
  }

  const searchInput = document.querySelector('[data-filter-search]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  let activeFilter = 'all';
  const filterContent = () => {
    const query = searchInput?.value.trim().toLowerCase() || '';
    filterItems.forEach((item) => {
      const category = item.dataset.category || '';
      const text = item.textContent.toLowerCase();
      const categoryMatch = activeFilter === 'all' || category.includes(activeFilter);
      const hide = !(categoryMatch && text.includes(query));
      const wasHidden = item.classList.contains('hidden');
      item.classList.toggle('hidden', hide);
      if (wasHidden && !hide) {
        item.classList.remove('filter-enter');
        void item.offsetWidth;
        item.classList.add('filter-enter');
      }
    });
  };
  searchInput?.addEventListener('input', filterContent);
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    filterContent();
  }));

  const form = document.querySelector('[data-appointment-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const group = field.closest('.field');
      const fieldValid = field.checkValidity() && field.value.trim() !== '';
      group?.classList.toggle('invalid', !fieldValid);
      field.setAttribute('aria-invalid', String(!fieldValid));
      if (!fieldValid) valid = false;
    });
    if (valid) {
      form.querySelector('.form-success')?.classList.add('show');
      form.reset();
    } else {
      form.querySelector('.invalid input, .invalid textarea')?.focus();
    }
  });
  form?.querySelectorAll('input, textarea').forEach((field) => field.addEventListener('input', () => field.closest('.field')?.classList.remove('invalid')));

  const progress = document.querySelector('.reading-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    }, { passive: true });
  }
})();
