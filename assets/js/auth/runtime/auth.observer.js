/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/runtime/auth.observer.js
 * Layer        : Auth State Observer Layer (BUILD 095.2)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Global reactive state hub managing state subscriptions,
 *                snapshot isolation, and event-driven updates for UI & Guards.
 * -----------------------------------------------------------------
 */

import Logger from "../../core/logger.js";

const AUTH_INITIALIZED_EVENT = "topcare:auth:initialized";
const AUTH_CHANGED_EVENT = "topcare:auth:changed";

class AuthObserver {
    constructor() {
        this.state = {
            initialized: false,
            authenticated: false,
            restored: false,
            user: null
        };
        this.listeners = new Set();
        this.started = false;

        // Bind event handlers to preserve context
        this._handleAuthEvent = this._handleAuthEvent.bind(this);
    }

    /**
     * Internal handler for runtime events.
     * @private
     * @param {CustomEvent} event 
     */
    _handleAuthEvent(event) {
        if (!event || !event.detail) {
            return;
        }

        const detail = event.detail;
        this.state = {
            initialized: Boolean(detail.initialized),
            authenticated: Boolean(detail.authenticated),
            restored: Boolean(detail.restored),
            user: detail.user ? { ...detail.user } : null
        };

        this._notifySubscribers();
    }

    /**
     * Safely notifies all registered subscribers with isolated error handling.
     * @private
     */
    _notifySubscribers() {
        const snapshot = this.getState();
        for (const listener of this.listeners) {
            try {
                listener(snapshot);
            } catch (error) {
                Logger.error("[AuthObserver] Error in subscriber callback:", error);
            }
        }
    }

    /**
     * Starts listening to runtime auth events.
     */
    start() {
        if (this.started) {
            return;
        }

        if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
            window.addEventListener(AUTH_INITIALIZED_EVENT, this._handleAuthEvent);
            window.addEventListener(AUTH_CHANGED_EVENT, this._handleAuthEvent);
            this.started = true;
            Logger.info("[AuthObserver] Observer started and listening to runtime events.");
        }
    }

    /**
     * Stops listening to runtime auth events and clears listeners.
     */
    stop() {
        if (!this.started) {
            return;
        }

        if (typeof window !== "undefined" && typeof window.removeEventListener === "function") {
            window.removeEventListener(AUTH_INITIALIZED_EVENT, this._handleAuthEvent);
            window.removeEventListener(AUTH_CHANGED_EVENT, this._handleAuthEvent);
        }

        this.started = false;
        Logger.info("[AuthObserver] Observer stopped.");
    }

    /**
     * Subscribes a listener function to state changes. Immediately invokes with current state.
     * @param {Function} listener 
     * @returns {Function} Unsubscribe function
     */
    subscribe(listener) {
        if (typeof listener !== "function") {
            throw new Error("[AuthObserver] Subscriber listener must be a function.");
        }

        this.listeners.add(listener);

        // Immediately invoke with current snapshot so new subscriber doesn't wait
        try {
            listener(this.getState());
        } catch (error) {
            Logger.error("[AuthObserver] Error in immediate subscriber callback invocation:", error);
        }

        // Return a handy unsubscribe function closure
        return () => {
            this.unsubscribe(listener);
        };
    }

    /**
     * Unsubscribes a listener function from state changes.
     * @param {Function} listener 
     */
    unsubscribe(listener) {
        this.listeners.delete(listener);
    }

    /**
     * Returns a cloned snapshot of the current state.
     * @returns {Object}
     */
    getState() {
        return {
            initialized: this.state.initialized,
            authenticated: this.state.authenticated,
            restored: this.state.restored,
            user: this.state.user ? { ...this.state.user } : null
        };
    }

    /**
     * Checks if the current state is authenticated.
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.state.authenticated;
    }

    /**
     * Returns the active user snapshot or null.
     * @returns {Object|null}
     */
    getUser() {
        return this.state.user ? { ...this.state.user } : null;
    }

    /**
     * Destroys the observer instance completely, clearing all listeners and resetting state.
     */
    destroy() {
        this.stop();
        this.listeners.clear();
        this.state = {
            initialized: false,
            authenticated: false,
            restored: false,
            user: null
        };
        Logger.info("[AuthObserver] Observer destroyed.");
    }
}

export const authObserver = new AuthObserver();
export default authObserver;