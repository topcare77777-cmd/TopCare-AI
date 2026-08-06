/**
 * TOPCARE AI PLATFORM V2 — NAVBAR COMPONENT (ACTIVE STATE SYNC)
 * Path: assets/js/components/navbar/navbar.component.js
 * Status: APPROVED & LOCKED
 * SRP: Navbar view manager with accurate route active cascade state.
 */

export class NavbarComponent {
    constructor(containerSelector = "#site-header") {
        this.containerSelector = containerSelector;
        this.containerElement = null;
    }

    mount() {
        if (typeof document === "undefined") return;

        if (typeof this.containerSelector === "string") {
            this.containerElement = document.querySelector(this.containerSelector);
        } else if (this.containerSelector instanceof HTMLElement) {
            this.containerElement = this.containerSelector;
        }

        if (!this.containerElement) return;

        this._bindRouteEvents();
        this._bindMobileMenuEvents();
        this.updateActiveState();
    }

    getActiveRoute() {
        const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
        if (!hash || hash === '' || hash === 'home') return 'home';
        return hash.split('/')[0];
    }

    updateActiveState() {
        const currentRoute = this.getActiveRoute();
        const isCreatorSubmenu = ['creator', 'prompt', 'ebook', 'artikel'].includes(currentRoute);

        // Update Top Nav Links
        const navLinks = document.querySelectorAll('.header-nav-link, .tc-navbar-link');
        navLinks.forEach(link => {
            const route = link.getAttribute('data-route') || link.getAttribute('href')?.replace(/^#\/?/, '').trim().toLowerCase();

            if (route === currentRoute || (route === 'creator' && isCreatorSubmenu)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Dropdown Items
        const dropdownItems = document.querySelectorAll('.tc-dropdown-item');
        dropdownItems.forEach(item => {
            const route = item.getAttribute('data-route') || item.getAttribute('href')?.replace(/^#\/?/, '').trim().toLowerCase();
            if (route === currentRoute) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    _bindRouteEvents() {
        window.removeEventListener('hashchange', () => this.updateActiveState());
        window.addEventListener('hashchange', () => this.updateActiveState());
    }

    _bindMobileMenuEvents() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mainNav = document.getElementById('main-nav');
        const creatorDropdown = document.getElementById('creator-dropdown');

        if (mobileBtn && mainNav) {
            mobileBtn.onclick = () => {
                const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
                mobileBtn.setAttribute('aria-expanded', !expanded);
                mainNav.classList.toggle('mobile-open');
            };
        }

        if (creatorDropdown) {
            const trigger = creatorDropdown.querySelector('.tc-dropdown-trigger');
            if (trigger) {
                trigger.onclick = (e) => {
                    if (window.innerWidth <= 868) {
                        e.preventDefault();
                        creatorDropdown.classList.toggle('accordion-open');
                    }
                };
            }
        }
    }
}

export default NavbarComponent;