/**
 * TOPCARE AI PLATFORM V2 — NAVBAR DRAWER CONTROLLER
 * Path: assets/js/components/navbar/ui/navbar.drawer.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Mobile Slide-In Drawer State, Accordion Submenu, Body Lock, and Inert Isolation Manager.
 */

import { CLASSES } from '../navbar.constants.js';

export class NavbarDrawer {
    /**
     * Opens the mobile drawer and applies body locks & inert isolation.
     * @param {NavbarCache} cache 
     * @returns {boolean} Success status
     */
    open(cache) {
        if (!cache) return false;

        const button = cache.get('button');
        const nav = cache.get('nav');
        const app = cache.get('app');

        if (button && nav) {
            button.setAttribute('aria-expanded', 'true');
            button.classList.add(CLASSES.IS_ACTIVE);

            nav.classList.add(CLASSES.IS_OPEN);
            nav.setAttribute('aria-hidden', 'false');

            if (app) {
                if ('inert' in HTMLElement.prototype) {
                    app.inert = true;
                }
                app.setAttribute('aria-hidden', 'true');
            }

            document.body.classList.add(CLASSES.DRAWER_OPEN);
            return true;
        }
        return false;
    }

    /**
     * Closes the mobile drawer and releases body locks & inert isolation.
     * @param {NavbarCache} cache 
     * @returns {boolean} Was previously open
     */
    close(cache) {
        if (!cache) return false;

        const button = cache.get('button');
        const nav = cache.get('nav');
        const creator = cache.get('creator');
        const app = cache.get('app');

        if (button && nav) {
            const wasOpen = nav.classList.contains(CLASSES.IS_OPEN);

            button.setAttribute('aria-expanded', 'false');
            button.classList.remove(CLASSES.IS_ACTIVE);

            nav.classList.remove(CLASSES.IS_OPEN);
            nav.setAttribute('aria-hidden', 'true');

            if (app) {
                if ('inert' in HTMLElement.prototype) {
                    app.inert = false;
                }
                if (cache.originalAriaHidden !== null) {
                    app.setAttribute('aria-hidden', cache.originalAriaHidden);
                } else {
                    app.removeAttribute('aria-hidden');
                }
            }

            if (creator) {
                creator.classList.remove(CLASSES.ACCORDION_OPEN);
            }

            document.body.classList.remove(CLASSES.DRAWER_OPEN);
            return wasOpen;
        }
        return false;
    }

    /**
     * Toggles mobile drawer state.
     * @param {NavbarCache} cache 
     * @returns {boolean} New isOpen state
     */
    toggle(cache) {
        const nav = cache ? cache.get('nav') : null;
        if (!nav) return false;

        const isOpen = nav.classList.contains(CLASSES.IS_OPEN);
        if (isOpen) {
            this.close(cache);
            return false;
        } else {
            this.open(cache);
            return true;
        }
    }
}