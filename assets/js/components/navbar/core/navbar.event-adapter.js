/**
 * TOPCARE AI PLATFORM V2 — NAVBAR EVENT ADAPTER
 * Path: assets/js/components/navbar/core/navbar.event-adapter.js
 * Version: 132.0.0 (BUILD 132.0 — CANONICAL BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Pure DOM Event Adapter & Dispatcher with frozen callback interface protection.
 */

const BOUND_NAVBAR_ELEMENTS = new WeakSet();

export class NavbarEventAdapter {
    constructor(callbacks = {}) {
        // Freeze callbacks object to prevent runtime modification
        this.callbacks = Object.freeze({ ...callbacks });

        this._onDocumentClick = this._onDocumentClick.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onHamburgerClick = this._onHamburgerClick.bind(this);
        this._onAccordionClick = this._onAccordionClick.bind(this);
        this._onHashChange = this._onHashChange.bind(this);
    }

    bindPrimary(cache) {
        if (!cache) return;

        const button = cache.get('button');
        const nav = cache.get('nav');
        const creator = cache.get('creator');

        window.removeEventListener('hashchange', this._onHashChange);
        window.addEventListener('hashchange', this._onHashChange);

        if (!button || !nav) return;

        if (BOUND_NAVBAR_ELEMENTS.has(nav)) return;

        button.removeEventListener('click', this._onHamburgerClick);
        button.addEventListener('click', this._onHamburgerClick);

        if (creator) {
            const trigger = creator.querySelector('.tc-dropdown-trigger');
            if (trigger) {
                trigger.removeEventListener('click', this._onAccordionClick);
                trigger.addEventListener('click', this._onAccordionClick);
            }
        }

        BOUND_NAVBAR_ELEMENTS.add(nav);
    }

    bindDynamicDocument() {
        document.removeEventListener('click', this._onDocumentClick);
        document.removeEventListener('keydown', this._onKeyDown);

        document.addEventListener('click', this._onDocumentClick);
        document.addEventListener('keydown', this._onKeyDown);
    }

    unbindDynamicDocument() {
        document.removeEventListener('click', this._onDocumentClick);
        document.removeEventListener('keydown', this._onKeyDown);
    }

    unbindAll(cache) {
        window.removeEventListener('hashchange', this._onHashChange);
        this.unbindDynamicDocument();

        const button = cache ? cache.get('button') : null;
        const nav = cache ? cache.get('nav') : null;
        const creator = cache ? cache.get('creator') : null;

        if (button) {
            button.removeEventListener('click', this._onHamburgerClick);
        }

        if (creator) {
            const trigger = creator.querySelector('.tc-dropdown-trigger');
            if (trigger) {
                trigger.removeEventListener('click', this._onAccordionClick);
            }
        }

        if (nav) {
            BOUND_NAVBAR_ELEMENTS.delete(nav);
        }
    }

    _onHamburgerClick(e) {
        e.stopPropagation();
        if (typeof this.callbacks.onHamburger === 'function') {
            this.callbacks.onHamburger(e);
        }
    }

    _onAccordionClick(e) {
        if (typeof this.callbacks.onAccordion === 'function') {
            this.callbacks.onAccordion(e);
        }
    }

    _onHashChange(e) {
        if (typeof this.callbacks.onHashChange === 'function') {
            this.callbacks.onHashChange(e);
        }
    }

    _onDocumentClick(e) {
        if (typeof this.callbacks.onDocumentClick === 'function') {
            this.callbacks.onDocumentClick(e);
        }
    }

    _onKeyDown(e) {
        if (typeof this.callbacks.onKeyDown === 'function') {
            this.callbacks.onKeyDown(e);
        }
    }
}