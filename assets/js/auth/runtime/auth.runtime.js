/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/runtime/auth.runtime.js
 * Layer        : Auth Runtime Bootstrap Orchestrator (BUILD 124.3)
 * Status       : ACTIVE
 * Version      : 1.4.0
 * Architecture : Development Constitution v1.1
 * Description  : Lightweight application startup orchestrator managing session
 *                restoration, AuthObserver auto-start, and event dispatching.
 * -----------------------------------------------------------------
 */

import sessionManagerInstance from "../session/session.manager.js";
import authObserver from "./auth.observer.js";
import Logger from "../../core/logger.js";

const AUTH_INITIALIZED_EVENT = "topcare:auth:initialized";
const AUTH_CHANGED_EVENT = "topcare:auth:changed";

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

    async start() {
        // Ensure global authObserver is active and listening
        authObserver.start();

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

    isInitialized() {
        return this.state.initialized;
    }

    getState() {
        return {
            initialized: this.state.initialized,
            authenticated: this.state.authenticated,
            user: this.state.user ? { ...this.state.user } : null,
            restored: this.state.restored
        };
    }

    getUser() {
        return this.state.user ? { ...this.state.user } : null;
    }

    syncState(userPayload) {
        if (userPayload && (userPayload.id || userPayload.userId)) {
            this.state.authenticated = true;
            this.state.user = {
                id: userPayload.id || userPayload.userId || null,
                username: userPayload.username || null,
                email: userPayload.email || null,
                issuedAt: userPayload.issuedAt || Date.now(),
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