document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = [...document.querySelectorAll('.nav-link')];
    const backToTop = document.getElementById('back-to-top');
    const year = document.getElementById('current-year');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (year) year.textContent = new Date().getFullYear();

    const closeMenu = () => {
        navMenu?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        navToggle?.setAttribute('aria-label', 'Open navigation');
        document.body.classList.remove('menu-open');
    };

    navToggle?.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
        navMenu?.classList.toggle('active', !isOpen);
        document.body.classList.toggle('menu-open', !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    const updateNavigation = () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 24);
        backToTop?.classList.toggle('visible', window.scrollY > 650);
    };

    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });

    const sections = [...document.querySelectorAll('main section[id]')];
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: '-35% 0px -55% 0px' });
        sections.forEach((section) => sectionObserver.observe(section));

        if (!reduceMotion) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -35px' });
            document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
        } else {
            document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
        }
    } else {
        document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
    }

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
});
