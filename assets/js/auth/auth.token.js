/**
 * file: assets/js/auth/auth.token.js
 */
export class AuthToken {
    constructor(data = {}) {
        this.accessToken = data.accessToken || '';
        this.refreshToken = data.refreshToken || '';
        this.tokenType = data.tokenType || 'Bearer';
        this.expiresIn = data.expiresIn || 3600;
        this.issuedAt = data.issuedAt || Date.now();
        Object.freeze(this);
    }

    get isAccessTokenExpired() {
        return Date.now() >= (this.issuedAt + (this.expiresIn * 1000));
    }
}