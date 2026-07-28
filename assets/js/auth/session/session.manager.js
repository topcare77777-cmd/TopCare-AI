/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/session/session.manager.js
 * Layer        : Session Manager Service
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Description  : Centralized singleton manager handling active session lifecycle,
 *                persistence, expiration checks, and promise-locked initialization.
 * -----------------------------------------------------------------
 */

import { LocalSessionRepository } from "./local-session.repository.js";
import { SessionModel } from "./session.model.js";
import Logger from "../../core/logger.js";

class SessionManager {
    constructor(sessionRepository = new LocalSessionRepository()) {
        this.sessionRepository = sessionRepository;
        this.currentSession = null;
        this._initialized = false;
        this._initPromise = null;
    }

    async init() {
        if (this._initialized) {
            return;
        }
        if (this._initPromise) {
            return this._initPromise;
        }

        this._initPromise = (async () => {
            try {
                const session = await this.sessionRepository.load();
                if (session) {
                    if (session.isExpired()) {
                        await this.end();
                    } else {
                        this.currentSession = session;
                    }
                }
            } catch (error) {
                Logger.error("[SessionManager] Initialization failed:", error);
                this.currentSession = null;
            } finally {
                this._initialized = true;
                this._initPromise = null;
            }
        })();

        return this._initPromise;
    }

    async start(user, rememberMe = false) {
        if (!user || !user.id) {
            throw new Error("[SessionManager] Cannot start session without valid user data.");
        }

        const expiryDate = new Date();
        if (!rememberMe) {
            // Default 24 hours session expiry if rememberMe is false
            expiryDate.setHours(expiryDate.getHours() + 24);
        } else {
            // Extended expiry for rememberMe (e.g., 30 days)
            expiryDate.setDate(expiryDate.getDate() + 30);
        }

        const session = new SessionModel({
            userId: user.id,
            issuedAt: new Date().toISOString(),
            expiresAt: expiryDate.toISOString(),
            rememberMe
        });

        const success = await this.sessionRepository.save(session);
        if (success) {
            this.currentSession = session;
            Logger.info(`[SessionManager] Session started for user: ${user.id}`);
            return true;
        }
        return false;
    }

    async restore() {
        await this.init();
        return this.current();
    }

    async end() {
        await this.sessionRepository.clear();
        this.currentSession = null;
        Logger.info("[SessionManager] Session ended and cleared.");
        return true;
    }

    current() {
        if (!this.currentSession) {
            return null;
        }
        // Return cloned plain object representation or cloned model to prevent direct internal mutation
        return new SessionModel(this.currentSession.toPlainObject());
    }

    async isAuthenticated() {
        await this.init();
        if (!this.currentSession) {
            return false;
        }
        if (this.currentSession.isExpired()) {
            await this.end();
            return false;
        }
        return true;
    }

    async isExpired() {
        await this.init();
        if (!this.currentSession) {
            return true;
        }
        return this.currentSession.isExpired();
    }

    async refresh() {
        await this.init();
        if (!this.currentSession || this.currentSession.isExpired()) {
            return false;
        }

        const expiryDate = new Date();
        if (!this.currentSession.rememberMe) {
            expiryDate.setHours(expiryDate.getHours() + 24);
        } else {
            expiryDate.setDate(expiryDate.getDate() + 30);
        }

        // Use immutable model extension
        const updatedSession = this.currentSession.extendExpiration(expiryDate.toISOString());

        const saved = await this.sessionRepository.update(updatedSession);
        if (!saved) {
            return false;
        }

        this.currentSession = updatedSession;
        return true;
    }
}

export const sessionManager = new SessionManager();
export default sessionManager;