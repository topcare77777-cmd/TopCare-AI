/**
 * TOPCARE AI PLATFORM V2 — NAVBAR CACHE ENGINE
 * Path: assets/js/components/navbar/core/navbar.cache.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Centralized DOM query lookup with performant shallow-cloned immutable array getters.
 */

import { SELECTORS } from '../navbar.constants.js';

export class NavbarCache {
    constructor() {
        this._elements = new Map();
        this._navLinks = [];
        this._dropdownItems = [];
        this._originalAriaHidden = null;
    }

    /**
     * Queries and registers essential DOM references into internal Map.
     * @param {HTMLElement|string} container 
     */
    init(container) {
        const containerEl = (typeof container === 'string')
            ? document.querySelector(container)
            : (container || document.querySelector(SELECTORS.HEADER));

        this._elements.set('header', containerEl);
        this._elements.set('nav', document.querySelector(SELECTORS.NAV));
        this._elements.set('button', document.querySelector(SELECTORS.BUTTON));
        this._elements.set('creator', document.querySelector(SELECTORS.CREATOR));
        this._elements.set('app', document.querySelector(SELECTORS.APP));

        this._navLinks = Array.from(document.querySelectorAll('.header-nav-link, .tc-navbar-link'));
        this._dropdownItems = Array.from(document.querySelectorAll('.tc-dropdown-item'));

        const appEl = this.get('app');
        if (appEl) {
            this._originalAriaHidden = appEl.getAttribute('aria-hidden');
        }
    }

    /**
     * Immutable getter for cached DOM element by key.
     * @param {string} key 
     * @returns {HTMLElement|null}
     */
    get(key) {
        return this._elements.get(key) || null;
    }

    /**
     * Returns performant shallow copy of nav links array.
     */
    get navLinks() {
        return [...this._navLinks];
    }

    /**
     * Returns performant shallow copy of dropdown items array.
     */
    get dropdownItems() {
        return [...this._dropdownItems];
    }

    get originalAriaHidden() {
        return this._originalAriaHidden;
    }

    /**
     * Selective Cache Invalidation API.
     * @param {Object} options 
     */
    refresh(options = { navLinks: true, dropdownItems: true, elements: true }) {
        if (options.elements) {
            this.init(this.get('header'));
        } else {
            if (options.navLinks) {
                this._navLinks = Array.from(document.querySelectorAll('.header-nav-link, .tc-navbar-link'));
            }
            if (options.dropdownItems) {
                this._dropdownItems = Array.from(document.querySelectorAll('.tc-dropdown-item'));
            }
        }
    }

    clear() {
        this._elements.clear();
        this._navLinks = [];
        this._dropdownItems = [];
        this._originalAriaHidden = null;
    }
}