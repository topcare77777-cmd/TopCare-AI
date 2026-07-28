/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/session/session.model.js
 * Layer        : Session Domain Model
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Description  : Immutable standardized schema definition for active user sessions
 *                with clone and extension capabilities for state safety.
 * -----------------------------------------------------------------
 */

export class SessionModel {
    constructor({ userId, issuedAt, expiresAt, rememberMe = false, version = "1.0.0", token = null, refreshToken = null }) {
        // TODO(BUILD-096): Expand with token / refreshToken fields when switching to JWT backend auth.
        this.userId = userId;
        this.issuedAt = issuedAt || new Date().toISOString();
        this.expiresAt = expiresAt || null;
        this.rememberMe = rememberMe;
        // reserved for session schema migration
        this.version = version;
        this.token = token;
        this.refreshToken = refreshToken;

        // Ensure immutability of the model instance
        Object.freeze(this);
    }

    isExpired() {
        if (!this.expiresAt) {
            return false;
        }
        return new Date().getTime() > new Date(this.expiresAt).getTime();
    }

    clone(overrides = {}) {
        return new SessionModel({
            userId: this.userId,
            issuedAt: this.issuedAt,
            expiresAt: this.expiresAt,
            rememberMe: this.rememberMe,
            version: this.version,
            token: this.token,
            refreshToken: this.refreshToken,
            ...overrides
        });
    }

    extendExpiration(newExpiresAt) {
        return this.clone({ expiresAt: newExpiresAt });
    }

    toPlainObject() {
        return {
            userId: this.userId,
            issuedAt: this.issuedAt,
            expiresAt: this.expiresAt,
            rememberMe: this.rememberMe,
            version: this.version,
            token: this.token,
            refreshToken: this.refreshToken
        };
    }

    static fromPlainObject(data) {
        if (!data || !data.userId) {
            return null;
        }
        return new SessionModel(data);
    }
}

export default SessionModel;