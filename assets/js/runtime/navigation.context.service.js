/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION CONTEXT SERVICE
 * Path: assets/js/runtime/navigation.context.service.js
 * Status: ACTIVE (BUILD 123.2)
 * Role: Manages temporary navigation destination state before authentication redirect.
 */

class NavigationContextService {
    constructor() {
        if (NavigationContextService._instance) {
            return NavigationContextService._instance;
        }

        this._storageKey = 'topcare_pending_navigation_intent';
        NavigationContextService._instance = this;
    }

    save(path) {
        if (!path || typeof path !== 'string') return;
        // Do not save authentication routes as pending destinations
        if (path.includes('/login') || path.includes('/register')) return;

        try {
            sessionStorage.setItem(this._storageKey, path);
        } catch (e) {
            console.warn('[NavigationContext] Failed to save navigation context:', e);
        }
    }

    restore() {
        const pending = this.peek();
        this.clear();
        return pending;
    }

    peek() {
        try {
            return sessionStorage.getItem(this._storageKey) || null;
        } catch (e) {
            return null;
        }
    }

    clear() {
        try {
            sessionStorage.removeItem(this._storageKey);
        } catch (e) {
            // Ignore storage removal errors
        }
    }

    hasPending() {
        return this.peek() !== null;
    }
}

export const NavigationContext = new NavigationContextService();
export default NavigationContext;