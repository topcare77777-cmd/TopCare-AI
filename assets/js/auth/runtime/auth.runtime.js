/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/runtime/auth.runtime.js
 * Layer        : Auth Runtime Bootstrap Orchestrator (BUILD 095.1 Final Locked)
 * Status       : ACTIVE
 * Version      : 1.2.0
 * Architecture : Development Constitution v1.1
 * Description  : Lightweight application startup orchestrator managing session
 *                restoration, consistent state snapshots, and deep-frozen events.
 * -----------------------------------------------------------------
 */

import sessionManagerInstance from "../session/session.manager.js";
import Logger from "../../core/logger.js";

const AUTH_INITIALIZED_EVENT = "topcare:auth:initialized";
const AUTH_CHANGED_EVENT = "topcare:auth:changed";

/**
 * Recursively freezes an object and its nested properties for strict immutability.
 * @private
 * @template T
 * @param {T} obj 
 * @returns {T}
 */
function deepFreeze(obj) {
    if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            deepFreeze(obj[prop]);
        });
    }
    return obj;
}

class AuthRuntime {
    constructor(sessionManager = sessionManagerInstance) {
        this.sessionManager = sessionManager;
        this.state = {
            initialized: false,
            authenticated: false,
            user: null,
            restored: false
        };
        this._initPromise = null;
    }

    /**
     * Publishes a runtime event safely with SSR guard and deep-frozen snapshot.
     * @private
     * @param {string} eventName 
     * @param {Object} detail 
     */
    _publishEvent(eventName, detail) {
        if (typeof window === "undefined" || typeof CustomEvent !== "function") {
            return;
        }
        window.dispatchEvent(
            new CustomEvent(eventName, { 
                detail: deepFreeze({ ...detail }) 
            })
        );
    }

    /**
     * Starts the auth runtime bootstrap, restoring session exactly once.
     * @returns {Promise<Object>} The runtime snapshot state.
     */
    async start() {
        if (this.state.initialized) {
            return this.getState();
        }

        if (this._initPromise) {
            return this._initPromise;
        }

        this._initPromise = (async () => {
            try {
                Logger.info("[AuthRuntime] Starting authentication bootstrap...");
                const session = await this.sessionManager.restore();
                
                this.state.restored = true;

                if (session) {
                    this.state.authenticated = true;
                    // Consistent safe user payload snapshot schema
                    this.state.user = {
                        id: session.userId || null,
                        username: session.username || null,
                        email: session.email || null,
                        issuedAt: session.issuedAt || null,
                        expiresAt: session.expiresAt || null
                    };
                } else {
                    this.state.authenticated = false;
                    this.state.user = null;
                }
            } catch (error) {
                Logger.error("[AuthRuntime] Failed to restore session during startup:", error);
                this.state.authenticated = false;
                this.state.user = null;
                this.state.restored = true;
            } finally {
                this.state.initialized = true;
                this._initPromise = null;

                const snapshot = this.getState();
                this._publishEvent(AUTH_INITIALIZED_EVENT, snapshot);
                this._publishEvent(AUTH_CHANGED_EVENT, snapshot);

                Logger.info("[AuthRuntime] Authentication bootstrap completed. Authenticated:", this.state.authenticated);
            }

            return this.getState();
        })();

        return this._initPromise;
    }

    /**
     * Checks if the runtime has completed its initial bootstrap.
     * @returns {boolean}
     */
    isInitialized() {
        return this.state.initialized;
    }

    /**
     * Returns a cloned snapshot of the current runtime state with consistent schema.
     * @returns {Object}
     */
    getState() {
        return {
            initialized: this.state.initialized,
            authenticated: this.state.authenticated,
            user: this.state.user ? { ...this.state.user } : null,
            restored: this.state.restored
        };
    }

    /**
     * Returns the active user snapshot or null.
     * @returns {Object|null}
     */
    getUser() {
        return this.state.user ? { ...this.state.user } : null;
    }

    /**
     * Refreshes runtime state snapshot, maintaining consistent schema without side effects.
     * @param {Object|null} userPayload 
     */
    syncState(userPayload) {
        if (userPayload && userPayload.id) {
            this.state.authenticated = true;
            this.state.user = {
                id: userPayload.id || null,
                username: userPayload.username || null,
                email: userPayload.email || null,
                issuedAt: userPayload.issuedAt || null,
                expiresAt: userPayload.expiresAt || null
            };
        } else {
            this.state.authenticated = false;
            this.state.user = null;
        }

        const snapshot = this.getState();
        this._publishEvent(AUTH_CHANGED_EVENT, snapshot);
        return snapshot;
    }

    /**
     * Resets internal runtime state while preserving dependency references for reuse.
     */
    destroy() {
        this.state = {
            initialized: false,
            authenticated: false,
            user: null,
            restored: false
        };
        this._initPromise = null;
    }
}

export const authRuntime = new AuthRuntime();
export default authRuntime;