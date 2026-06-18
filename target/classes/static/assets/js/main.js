/* main.js — Medical Site */

(function () {
    'use strict';

    /* ─── Navbar scroll state ─── */
    const navbar = document.querySelector('.custom-navbar');
    const SCROLL_THRESHOLD = 30;

    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);

    /* ─── Smooth scroll for anchor links ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                setTimeout(updateNavbar, 400);
            }
        });
    });

    /* ─── Scroll reveal ─── */
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ─── Hero cards staggered entrance on load ─── */
    window.addEventListener('load', () => {
        const heroCards = document.querySelectorAll('.hero-card-big, .hero-card-small');
        heroCards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            card.style.transitionDelay = `${0.15 + i * 0.1}s`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.opacity = '';
                    card.style.transform = '';
                });
            });
        });

        /* Hero text entrance */
        const heroTextEls = document.querySelectorAll('.hero-eyebrow, .hero-heading, .hero-sub, .hero-actions, .hero-stats');
        heroTextEls.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${0.2 + i * 0.12}s`;
            requestAnimationFrame(() => requestAnimationFrame(() => {
                el.style.opacity = '';
                el.style.transform = '';
            }));
        });
    });

    /* ─── Navbar mobile close on link click ─── */
    const navCollapse = document.querySelector('#navbarNav');
    if (navCollapse) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    if (toggler) toggler.click();
                }
            });
        });
    }

})();
