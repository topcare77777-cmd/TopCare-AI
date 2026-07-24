/**
 * TopCare AI Platform V2.0.0
 * SessionStore responsible purely for session data persistence
 * Path: assets/js/auth/session/session.store.js
 */

class SessionStore {
    constructor(storage) {
        this.storage = storage;
        this.sessionKey = "session_data";
        this.tokenKey = "auth_token";
    }

    save(userData, token, timeoutMs) {
        const sessionData = {
            user: userData,
            createdAt: Date.now(),
            expiresAt: Date.now() + timeoutMs
        };
        this.storage.setItem(this.sessionKey, sessionData);
        this.storage.setItem(this.tokenKey, token);
    }

    get() {
        return this.storage.getItem(this.sessionKey);
    }

    getToken() {
        return this.storage.getItem(this.tokenKey);
    }

    clear() {
        this.storage.removeItem(this.sessionKey);
        this.storage.removeItem(this.tokenKey);
    }
}