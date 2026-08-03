/**
 * file: assets/js/core/mobile-menu.js
 * Version: 137.1.0 (BUILD 124.3.1 — DOM CONTRACT ALIGNMENT)
 * Status: APPROVED & LOCKED
 * SRP: Mobile Drawer toggle controller aligned strictly with existing index.html DOM structure.
 */

export const MobileMenu = {
    init() {
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.getElementById('main-nav');
        const links = document.querySelectorAll('.header-nav-link');

        if (!toggleBtn || !mainNav) {
            return;
        }

        // Guard against duplicate event listeners
        if (toggleBtn.dataset.bound === 'true') {
            return;
        }
        toggleBtn.dataset.bound = 'true';

        toggleBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.contains('is-open');
            if (isOpen) {
                mainNav.classList.remove('is-open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            } else {
                mainNav.classList.add('is-open');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        });

        links.forEach(link => {
            if (link.dataset.bound === 'true') {
                return;
            }
            link.dataset.bound = 'true';

            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    mainNav.classList.remove('is-open');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
};

export default MobileMenu;