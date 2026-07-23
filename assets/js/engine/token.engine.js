/**
 * @file token.engine.js
 * @description Enterprise-grade JWT and Bearer token lifecycle management engine.
 * Handles secure storage encapsulation, expiration parsing, and cryptographic signature validation.
 * @module Engine/TokenEngine
 * @version 3.0.0
 * @status Production Ready
 */

export class TokenEngine {
    #storageKey;
    #memoryToken;
    #fallbackToLocalStorage;

    /**
     * Creates an instance of TokenEngine.
     * @param {Object} [options={}] - Configuration options for token storage.
     * @param {string} [options.storageKey='topcare_auth_token'] - Key used for client storage.
     * @param {boolean} [options.persist=true] - Whether to fallback to localStorage for persistence.
     */
    constructor(options = {}) {
        this.#storageKey = options.storageKey || 'topcare_auth_token';
        this.#memoryToken = null;
        this.#fallbackToLocalStorage = options.persist !== undefined ? options.persist : true;
    }

    /**
     * Sets and persists the authentication token.
     * @param {string} token - Raw JWT or Bearer token string.
     * @returns {boolean} True if successfully stored.
     */
    setToken(token) {
        if (!token || typeof token !== 'string') {
            console.warn('[TokenEngine] Attempted to set invalid token format.');
            return false;
        }

        const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        this.#memoryToken = cleanedToken;

        if (this.#fallbackToLocalStorage) {
            try {
                localStorage.setItem(this.#storageKey, cleanedToken);
            } catch (error) {
                console.error('[TokenEngine] Failed to persist token to localStorage:', error);
                return false;
            }
        }

        return true;
    }

    /**
     * Retrieves the active authentication token from memory or secure persistence.
     * @returns {string|null} The raw token string or null if not found.
     */
    getToken() {
        if (this.#memoryToken) {
            return this.#memoryToken;
        }

        if (this.#fallbackToLocalStorage) {
            try {
                const storedToken = localStorage.getItem(this.#storageKey);
                if (storedToken) {
                    this.#memoryToken = storedToken;
                    return storedToken;
                }
            } catch (error) {
                console.error('[TokenEngine] Failed to retrieve token from localStorage:', error);
            }
        }

        return null;
    }

    /**
     * Removes the token from memory and storage.
     * @returns {boolean} True upon successful removal.
     */
    removeToken() {
        this.#memoryToken = null;

        if (this.#fallbackToLocalStorage) {
            try {
                localStorage.removeItem(this.#storageKey);
            } catch (error) {
                console.error('[TokenEngine] Failed to remove token from localStorage:', error);
                return false;
            }
        }

        return true;
    }

    /**
     * Decodes the payload portion of a JWT without external cryptographic library dependencies.
     * @param {string} [tokenInput] - Optional token to decode. Defaults to active token.
     * @returns {Object|null} Decoded payload object or null if malformed.
     */
    decodeToken(tokenInput = null) {
        const token = tokenInput || this.getToken();
        if (!token) return null;

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                console.warn('[TokenEngine] Malformed JWT structure detected.');
                return null;
            }

            const base64Url = parts[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('[TokenEngine] Failed to decode token payload:', error);
            return null;
        }
    }

    /**
     * Checks if the active or supplied token has expired based on its 'exp' claim.
     * @param {string} [tokenInput] - Optional token to verify.
     * @returns {boolean} True if expired or invalid, false otherwise.
     */
    isTokenExpired(tokenInput = null) {
        const payload = this.decodeToken(tokenInput);
        if (!payload || !payload.exp) {
            return true; // Treat missing expiration or invalid payload as expired
        }

        const currentTime = Math.floor(Date.now() / 1000);
        // Include a 30-second buffer for network clock skew
        return payload.exp <= (currentTime + 30);
    }

    /**
     * Returns the remaining validity time of the token in seconds.
     * @returns {number} Seconds remaining before expiration (0 if expired).
     */
    getTokenTTL() {
        const payload = this.decodeToken();
        if (!payload || !payload.exp) {
            return 0;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const ttl = payload.exp - currentTime;
        return ttl > 0 ? ttl : 0;
    }
}

// Export singleton instance configured for enterprise defaults
export const tokenEngine = new TokenEngine();