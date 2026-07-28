/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/repository/user.repository.js
 * Layer        : Infrastructure Repository Layer (HOTFIX)
 * Status       : ACTIVE
 * Version      : 2.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Enterprise user repository handling authentication,
 *                registration, profile fetching, and token management
 *                via HTTP client with token engine integration.
 * -----------------------------------------------------------------
 */

import { tokenEngine } from '../engine/token.engine.js';
import Logger from '../core/logger.js';

export class UserRepository {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.defaultTimeout = 10000;
    }

    _createTimeoutSignal(timeoutMs = this.defaultTimeout) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), timeoutMs);
        return controller.signal;
    }

    async _request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };

        if (options.auth !== false) {
            const token = tokenEngine.getAccessToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const config = {
            ...options,
            headers,
            signal: this._createTimeoutSignal(options.timeout || this.defaultTimeout)
        };

        try {
            const response = await fetch(url, config);
            let data = null;
            try {
                data = await response.json();
            } catch (err) {
                data = null;
            }

            if (!response.ok) {
                return {
                    success: false,
                    data: null,
                    error: (data && data.error) || 'HTTP_ERROR',
                    status: response.status
                };
            }

            return {
                success: true,
                data: data !== null ? data : {},
                error: null,
                status: response.status
            };
        } catch (error) {
            if (error.name === 'AbortError') {
                Logger.error(`[UserRepository] Request timeout for ${endpoint}`);
                return {
                    success: false,
                    data: null,
                    error: 'REQUEST_TIMEOUT',
                    status: 408
                };
            }
            Logger.error(`[UserRepository] Network error for ${endpoint}:`, error);
            return {
                success: false,
                data: null,
                error: 'NETWORK_ERROR',
                status: 0
            };
        }
    }

    async loginApi(credentials) {
        return this._request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            auth: false
        });
    }

    async registerApi(payload) {
        return this._request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload),
            auth: false
        });
    }

    async fetchProfileApi() {
        return this._request('/api/auth/profile', {
            method: 'GET',
            auth: true
        });
    }

    async refreshTokenApi(refreshToken) {
        return this._request('/api/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
            auth: false
        });
    }

    async logoutApi() {
        return this._request('/api/auth/logout', {
            method: 'POST',
            auth: true
        });
    }

    async forgotPasswordApi(email) {
        return this._request('/api/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
            auth: false
        });
    }

    async resetPasswordApi(payload) {
        return this._request('/api/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify(payload),
            auth: false
        });
    }
}

export const userRepository = new UserRepository();