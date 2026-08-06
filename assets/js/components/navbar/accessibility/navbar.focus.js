/**
 * TOPCARE AI PLATFORM V2 — NAVBAR ACCESSIBILITY & FOCUS ENGINE
 * Path: assets/js/components/navbar/accessibility/navbar.focus.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: WCAG 2.1 AA Focus Trap, Focus Placement, and Visibility Filter Engine.
 */

import { WCAG_FOCUSABLE_SELECTOR, CLASSES } from '../navbar.constants.js';

export class NavbarFocus {
    /**
     * Helper filtering truly visible focusable elements.
     * @param {HTMLElement} el 
     * @returns {boolean}
     */
    isVisibleFocusable(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    }

    /**
     * Places initial focus on first visible focusable element inside drawer.
     * @param {HTMLElement} navElement 
     */
    placeInitialFocus(navElement) {
        if (!navElement) return;
        const focusables = Array.from(navElement.querySelectorAll(WCAG_FOCUSABLE_SELECTOR))
            .filter(this.isVisibleFocusable);

        if (focusables.length > 0) {
            focusables[0].focus();
        }
    }

    /**
     * Restores focus to the trigger button when drawer is closed.
     * @param {HTMLElement} buttonElement 
     */
    restoreFocus(buttonElement) {
        if (buttonElement && typeof buttonElement.focus === 'function') {
            buttonElement.focus();
        }
    }

    /**
     * Cycles tab focus within open drawer (WCAG Focus Trap).
     * @param {KeyboardEvent} e 
     * @param {HTMLElement} navElement 
     * @param {HTMLElement} buttonElement 
     */
    trapFocus(e, navElement, buttonElement) {
        if (!navElement || !navElement.classList.contains(CLASSES.IS_OPEN)) return;

        if (e.key === 'Tab') {
            const rawFocusables = Array.from(navElement.querySelectorAll(WCAG_FOCUSABLE_SELECTOR));
            if (buttonElement) rawFocusables.unshift(buttonElement);

            const focusables = rawFocusables.filter(this.isVisibleFocusable);
            if (focusables.length === 0) return;

            const firstEl = focusables[0];
            const lastEl = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    }
}