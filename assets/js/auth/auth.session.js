/**
 * file: assets/js/auth/auth.session.js
 */
export class Session {
    constructor(data = {}) {
        this.sessionId = data.sessionId || '';
        this.userId = data.userId || '';
        this.issuedAt = data.issuedAt || (Date.now());
        this.expiresAt = data.expiresAt || (Date.now() + 3600 * 1000);
        this.deviceId = data.deviceId || 'browser_client';
        Object.freeze(this);
    }

    // Dynamic getter guarantees real-time expiration evaluation
    get isExpired() {
        return Date.now() >= this.expiresAt;
    }
}