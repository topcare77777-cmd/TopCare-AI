/**
 * file: assets/js/api/interceptor/token.interceptor.base.js
 */

import { Core } from '../../core/index.js';
import { Container } from '../../container/index.js';
import { InterceptorService } from './interceptor.service.js';
import { TokenInterceptorInterface } from './token.interceptor.interface.js';

export class TokenInterceptorBase extends TokenInterceptorInterface {
    constructor() {
        super();
        this._attached = false;
        this._refreshing = false;
        this._queue = [];
        Object.seal(this);
    }

    attach() {
        if (this._attached) {
            return this;
        }

        InterceptorService.addRequestInterceptor(this._handleRequest.bind(this));
        InterceptorService.addResponseInterceptor(
            this._handleResponse.bind(this),
            this._handleResponseError.bind(this)
        );

        Core.Logger.info("Token interceptor attached to pipeline.");
        this._attached = true;

        return this;
    }

    detach() {
        this._attached = false;
        this._queue = [];

        Core.Logger.info("Token interceptor detached from pipeline.");
        return this;
    }

    async _handleRequest(config) {
        try {
            // Hardening 3: Skip Authorization header if explicitly requested (e.g., during refresh endpoint calls)
            if (config && config.options && config.options.skipAuth) {
                return config;
            }

            const tokenKey = Core.Constants.get('storage', 'TOKEN') || 'token';
            const token = Core.Storage.get(tokenKey);

            if (token && config && config.headers && !config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (e) {
            // Fallback
        }
        return config;
    }

    async _handleResponse(response) {
        return response;
    }

    async _handleResponseError(error) {
        if (error && error.status === 401) {
            const options = error.options || {};

            // Hardening 1: Ensure options object exists and inspect retry flag safely to prevent infinite loops
            if (options._retry) {
                throw error;
            }

            Core.Logger.warn("TokenInterceptor detected 401 Unauthorized. Initiating token refresh.");

            try {
                const newToken = await this.refreshToken();

                options._retry = true;

                if (error.config && typeof error.retryRequest === 'function') {
                    error.config.options = options;
                    return await error.retryRequest(error.config);
                }

                return newToken;
            } catch (refreshError) {
                this._clearSessionAndNotify();
                throw refreshError;
            }
        }

        throw error;
    }

    async refreshToken() {
        if (this._refreshing) {
            return new Promise((resolve, reject) => {
                this._queue.push({ resolve, reject });
            });
        }

        this._refreshing = true;

        try {
            const Repository = Container.resolve('Repository');
            const Endpoints = Container.has('Endpoints') ? Container.resolve('Endpoints') : null;

            const endpoint = Endpoints
                ? Endpoints.get('auth', 'REFRESH')
                : '/auth/refresh';

            const tokenKey = Core.Constants.get('storage', 'TOKEN') || 'token';
            const token = Core.Storage.get(tokenKey);

            // Hardening 3: Pass skipAuth option so the refresh request does not attach the expired token
            const response = await Repository.mutate(endpoint, { token }, { skipAuth: true });

            if (response && response.success && response.token) {
                const newToken = response.token;

                Core.Storage.set(tokenKey, newToken);
                Core.State.set('auth_token', newToken);

                this._resolveQueue(newToken);
                return newToken;
            }

            throw new Error("Token refresh response invalid.");
        } catch (error) {
            Core.Logger.error(`Token refresh error: ${error.message}`);
            this._rejectQueue(error);
            this._clearSessionAndNotify();
            throw error;
        } finally {
            this._refreshing = false;
        }
    }

    _resolveQueue(token) {
        this._queue.forEach(item => {
            if (item && typeof item.resolve === 'function') {
                item.resolve(token);
            }
        });
        this._queue = [];
    }

    _rejectQueue(error) {
        this._queue.forEach(item => {
            if (item && typeof item.reject === 'function') {
                item.reject(error);
            }
        });
        this._queue = [];
    }

    _clearSessionAndNotify() {
        try {
            const tokenKey = Core.Constants.get('storage', 'TOKEN') || 'token';
            const sessionKey = Core.Constants.get('storage', 'SESSION') || 'session';

            Core.Storage.remove(tokenKey);
            Core.Storage.remove(sessionKey);
            Core.State.remove('session');
            Core.State.remove('auth_token');

            Core.Logger.warn("Session cleared due to token refresh failure.");
            Core.Event.emit('auth.expired', {});
        } catch (e) {
            // Fallback cleanup
        }
    }
}