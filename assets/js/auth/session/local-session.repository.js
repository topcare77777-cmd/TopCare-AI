/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/session/local-session.repository.js
 * Layer        : Session Repository Local Implementation
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Description  : Concrete implementation extending SessionRepositoryInterface
 *                backed purely by localStorage using centralized storage keys.
 * -----------------------------------------------------------------
 */

import { SessionRepositoryInterface } from "./session.repository.interface.js";
import { SessionModel } from "./session.model.js";
import Logger from "../../core/logger.js";

const SESSION_STORAGE_KEYS = {
    SESSION: "topcare_session_v2"
};

export class LocalSessionRepository extends SessionRepositoryInterface {
    constructor() {
        super();
    }

    async save(session) {
        if (typeof localStorage === "undefined") {
            return false;
        }
        try {
            const plainData = session instanceof SessionModel ? session.toPlainObject() : session;
            localStorage.setItem(SESSION_STORAGE_KEYS.SESSION, JSON.stringify(plainData));
            return true;
        } catch (error) {
            Logger.error("[LocalSessionRepository] Failed to save session to localStorage:", error);
            return false;
        }
    }

    async update(session) {
        return await this.save(session);
    }

    async load() {
        if (typeof localStorage === "undefined") {
            return null;
        }
        try {
            const data = localStorage.getItem(SESSION_STORAGE_KEYS.SESSION);
            if (!data) return null;
            const parsed = JSON.parse(data);
            return SessionModel.fromPlainObject(parsed);
        } catch (error) {
            Logger.error("[LocalSessionRepository] Failed to load session from localStorage:", error);
            return null;
        }
    }

    async clear() {
        if (typeof localStorage === "undefined") {
            return false;
        }
        try {
            localStorage.removeItem(SESSION_STORAGE_KEYS.SESSION);
            return true;
        } catch (error) {
            Logger.error("[LocalSessionRepository] Failed to clear session from localStorage:", error);
            return false;
        }
    }

    async exists() {
        if (typeof localStorage === "undefined") {
            return false;
        }
        return Boolean(localStorage.getItem(SESSION_STORAGE_KEYS.SESSION));
    }

    async isExpired() {
        const session = await this.load();
        if (!session) {
            return true;
        }
        return session.isExpired();
    }
}

export default LocalSessionRepository;