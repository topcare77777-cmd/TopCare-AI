/**
 * TOPCARE AI PLATFORM V2 — SIDEBAR NAVIGATION SHELL
 * Path: assets/js/core/ui/sidebar-navigation.js
 * Version: 136.0.0 (BUILD 136.0 — RUNTIME INTEGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Renders and manages primary application sidebar navigation and active state highlighting.
 */

export class SidebarNavigationShell {
    constructor() {
        this._container = null;
        this._onRouteChanged = this._onRouteChanged.bind(this);
    }

    mount(container) {
        if (!container) return;
        this._container = container;
        this._render();
        window.addEventListener('tc:route:changed', this._onRouteChanged);
    }

    _render() {
        this._container.innerHTML = `
            <nav class="tc-sidebar-nav" aria-label="Main Navigation">
                <div class="tc-sidebar-brand">
                    <img src="assets/images/icons/topcare-logo.svg" alt="TopCare AI Logo" width="32" height="32" />
                    <span class="tc-brand-title">TopCare AI <small>v2</small></span>
                </div>
                <ul class="tc-nav-list">
                    <li class="tc-nav-item">
                        <a href="#/marketplace" class="tc-nav-link" data-route="#/marketplace">
                            <span class="tc-nav-icon">🛒</span>
                            <span class="tc-nav-label">Marketplace</span>
                        </a>
                    </li>
                    <li class="tc-nav-item">
                        <a href="#/download-center" class="tc-nav-link" data-route="#/download-center">
                            <span class="tc-nav-icon">📦</span>
                            <span class="tc-nav-label">My Deliveries</span>
                            <span class="tc-nav-badge" id="tc-deliveries-badge">PRO</span>
                        </a>
                    </li>
                    <li class="tc-nav-item">
                        <a href="#/license-manager" class="tc-nav-link" data-route="#/license-manager">
                            <span class="tc-nav-icon">🔑</span>
                            <span class="tc-nav-label">Licenses</span>
                        </a>
                    </li>
                </ul>
            </nav>
        `;
        this.updateActiveRoute(window.location.hash || '#/marketplace');
    }

    updateActiveRoute(activeHash) {
        if (!this._container) return;
        const links = this._container.querySelectorAll('.tc-nav-link');
        links.forEach(link => {
            const targetRoute = link.getAttribute('data-route');
            if (targetRoute === activeHash || (activeHash === '#/downloads' && targetRoute === '#/download-center')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    _onRouteChanged(e) {
        if (e && e.detail && e.detail.hash) {
            this.updateActiveRoute(e.detail.hash);
        }
    }

    destroy() {
        window.removeEventListener('tc:route:changed', this._onRouteChanged);
        if (this._container) {
            this._container.innerHTML = '';
            this._container = null;
        }
    }
}

export const sidebarNavigation = new SidebarNavigationShell();
export default sidebarNavigation;