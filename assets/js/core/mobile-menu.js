// assets/js/core/mobile-menu.js
export const MobileMenu = {
    initialized: false,

    init() {
        if (this.initialized) {
            return;
        }

        const menuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!menuBtn || !navLinks) {
            return;
        }

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('is-open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.site-header')) {
                navLinks.classList.remove('is-open');
            }
        });

        this.initialized = true;
    }
};

export default MobileMenu;