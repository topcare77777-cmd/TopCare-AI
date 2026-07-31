/**
 * file: assets/js/core/mobile-menu.js
 * Version: 137.0.0
 * Status: APPROVED & LOCKED
 * SRP: Mobile Drawer toggle controller delegating all navigation strictly to Router via hash changes.
 */

export const MobileMenu = {
    init() {
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const drawer = document.getElementById('mobile-menu');
        const links = document.querySelectorAll('.mobile-nav-link');

        if (toggleBtn && drawer) {
            toggleBtn.addEventListener('click', () => {
                const isOpen = drawer.classList.contains('active');
                if (isOpen) {
                    drawer.classList.remove('active');
                    drawer.setAttribute('aria-hidden', 'true');
                } else {
                    drawer.classList.add('active');
                    drawer.setAttribute('aria-hidden', 'false');
                }
            });
        }

        // Tapping links only modifies window.location.hash; Router handles view changes
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetHash = link.getAttribute('href');
                if (drawer && drawer.classList.contains('active')) {
                    drawer.classList.remove('active');
                    drawer.setAttribute('aria-hidden', 'true');
                }
                if (targetHash && targetHash.startsWith('#')) {
                    window.location.hash = targetHash;
                }
            });
        });
    }
};