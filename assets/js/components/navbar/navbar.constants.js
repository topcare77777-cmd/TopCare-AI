/**
 * TOPCARE AI PLATFORM V2 — NAVBAR CONSTANTS
 * Path: assets/js/components/navbar/navbar.constants.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Single Source of Truth for selectors, breakpoints, WCAG queries, and class names.
 */

export const MOBILE_BREAKPOINT = 992;
export const MEDIA_QUERY_DESKTOP = `(min-width: ${MOBILE_BREAKPOINT + 1}px)`;

export const SELECTORS = Object.freeze({
    HEADER: "#site-header",
    NAV: "#main-nav",
    BUTTON: "#mobile-menu-btn",
    CREATOR: "#creator-dropdown",
    APP: "#app"
});

export const CLASSES = Object.freeze({
    ACTIVE: "active",
    IS_ACTIVE: "is-active",
    IS_OPEN: "is-open",
    DRAWER_OPEN: "tc-drawer-open",
    ACCORDION_OPEN: "accordion-open"
});

export const WCAG_FOCUSABLE_SELECTOR = Object.freeze([
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'details',
    'summary',
    'iframe',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]'
].join(','));