/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE STATE MANAGER
 * Path: assets/js/features/marketplace/state/marketplace.state.js
 * Version: 133.0.0 (BUILD 133.0 — MARKETPLACE FOUNDATION)
 * Status: APPROVED & LOCKED
 * SRP: Reactive State Store for Marketplace UI and query state.
 */

import { DEFAULT_MARKETPLACE_STATE } from '../marketplace.constants.js';

export class MarketplaceState {
    constructor() {
        this._state = { ...DEFAULT_MARKETPLACE_STATE };
        this._listeners = new Set();
    }

    get state() {
        return Object.freeze({ ...this._state });
    }

    setState(newState) {
        this._state = { ...this._state, ...newState };
        this._notify();
    }

    reset() {
        this._state = { ...DEFAULT_MARKETPLACE_STATE };
        this._notify();
    }

    subscribe(listener) {
        if (typeof listener === "function") {
            this._listeners.add(listener);
        }
        return () => this._listeners.delete(listener);
    }

    _notify() {
        this._listeners.forEach(listener => listener(this.state));
    }
}