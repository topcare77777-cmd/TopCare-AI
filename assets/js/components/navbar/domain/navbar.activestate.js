/**
 * TOPCARE AI PLATFORM V2 — NAVBAR ACTIVE STATE MANAGER
 * Path: assets/js/components/navbar/domain/navbar.activestate.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Pure UI active link and dropdown visual highlighting manager.
 */

import { CLASSES } from '../navbar.constants.js';

export class NavbarActiveState {
    constructor(router) {
        this._router = router;
    }

    /**
     * Updates active class and aria-current attributes on navigation links.
     * @param {NavbarCache} cache 
     */
    update(cache) {
        if (!cache || !this._router) return;

        const currentRoute = this._router.getActiveRoute();
        const isCreatorSubmenu = this._router.isCreatorSubmenu(currentRoute);

        // Update Primary Navigation Links
        cache.navLinks.forEach(link => {
            const route = link.getAttribute('data-route') || link.getAttribute('href')?.replace(/^#\/?/, '').trim().toLowerCase();

            if (route === currentRoute || (route === 'creator' && isCreatorSubmenu)) {
                link.classList.add(CLASSES.ACTIVE);
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove(CLASSES.ACTIVE);
                link.removeAttribute('aria-current');
            }
        });

        // Update Submenu Dropdown Items
        cache.dropdownItems.forEach(item => {
            const route = item.getAttribute('data-route') || item.getAttribute('href')?.replace(/^#\/?/, '').trim().toLowerCase();
            if (route === currentRoute) {
                item.classList.add(CLASSES.ACTIVE);
            } else {
                item.classList.remove(CLASSES.ACTIVE);
            }
        });
    }
}