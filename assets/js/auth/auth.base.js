/**
 * file: assets/js/auth/auth.base.js
 */

import { Core } from '../core/index.js';
import { Repository } from '../repository/index.js';
import { Endpoints } from '../endpoints/index.js';
import { AuthInterface } from './auth.interface.js';
import { AUTH_EVENTS } from './auth.types.js';

export class AuthBase extends AuthInterface {
    constructor() {
        super();
        this._tokenKey = Core.Constants.get('storage', 'TOKEN') || 'token';
        this._sessionKey = Core.Constants.get('storage', 'SESSION') || 'session';
        this._currentUser = null;
        this._currentToken = null;
        this._initialized = false;
        Object.seal(this);
    }

    _persistSession(token, user) {
        this._currentToken = token;
        this._currentUser = user;

        if (token !== undefined && token !== null) {
            Core.Storage.set(this._tokenKey, token);
        }
        if (user !== undefined && user !== null) {
            Core.Storage.set(this._sessionKey, user);
            Core.State.set('session', user);
        }
    }

    _clearSession() {
        this._currentToken = null;
        this._currentUser = null;

        Core.Storage.remove(this._tokenKey);
        Core.Storage.remove(this._sessionKey);
        Core.State.remove('session');
    }

    async login(credentials) {
        if (!credentials || typeof credentials !== 'object') {
            throw new TypeError("Authentication credentials must be a valid object.");
        }

        try {
            Core.Logger.info("Auth executing login request via Repository.");
            const endpoint = Endpoints.get('auth', 'LOGIN');
            const response = await Repository.mutate(endpoint, credentials);

            if (response && response.success) {
                const { token, user } = response;
                this._persistSession(token, user);
                Core.Logger.info("Authentication login successful.");
                Core.Event.emit(AUTH_EVENTS.LOGIN, { user, token });
                return { success: true, user, token };
            } else {
                throw new Error("Login failed from repository response.");
            }
        } catch (error) {
            Core.Logger.error(`Authentication login error: ${error.message}`);
            throw error;
        }
    }

    async logout() {
        try {
            const endpoint = Endpoints.get('auth', 'LOGOUT');
            await Repository.mutate(endpoint, {});
        } catch (e) {
            // Proceed with local logout cleanup even if network request fails
        }

        this._clearSession();
        Core.Logger.info("Authentication logout executed.");
        Core.Event.emit(AUTH_EVENTS.LOGOUT, {});
        return { success: true };
    }

    restore() {
        if (this._initialized) {
            return this.isAuthenticated();
        }

        try {
            const token = Core.Storage.get(this._tokenKey);
            const user = Core.Storage.get(this._sessionKey) || Core.State.get('session');

            if (token) {
                this._currentToken = token;
                this._currentUser = user;
                if (user && !Core.State.has('session')) {
                    Core.State.set('session', user);
                }
                this._initialized = true;
                Core.Logger.info("Authentication session restored successfully.");
                Core.Event.emit(AUTH_EVENTS.SESSION_RESTORED, { user, token });
                return true;
            }
        } catch (e) {
            Core.Logger.error(`Authentication session restore failed: ${e.message}`);
        }

        this._initialized = true;
        Core.Event.emit(AUTH_EVENTS.SESSION_EXPIRED, {});
        return false;
    }

    async refresh() {
        if (!this.isAuthenticated()) {
            Core.Logger.warn("Authentication refresh attempted without active session.");
            return false;
        }

        try {
            const endpoint = Endpoints.get('auth', 'REFRESH');
            const response = await Repository.mutate(endpoint, { token: this._currentToken });
            if (response && response.success && response.token) {
                this._currentToken = response.token;
                Core.Storage.set(this._tokenKey, response.token);

                Core.Logger.info("Authentication session token refreshed.");
                Core.Event.emit(AUTH_EVENTS.REFRESHED, { token: response.token });
                return true;
            }
        } catch (error) {
            Core.Logger.error(`Authentication refresh failed: ${error.message}`);
            this._clearSession();
            Core.Event.emit(AUTH_EVENTS.SESSION_EXPIRED, {});
        }

        return false;
    }

    validate() {
        return this.isAuthenticated();
    }

    isAuthenticated() {
        if (!this._initialized) {
            this.restore();
        }
        
        if (this._currentToken) {
            return true;
        }

        try {
            return Core.Storage.has(this._tokenKey) && Core.Storage.get(this._tokenKey) !== null;
        } catch (e) {
            return false;
        }
    }

    getUser() {
        if (!this._currentUser) {
            try {
                this._currentUser = Core.Storage.get(this._sessionKey) || Core.State.get('session');
            } catch (e) {
                this._currentUser = null;
            }
        }
        return this._currentUser ? Core.Utils.clone(this._currentUser) : null;
    }

    getToken() {
        if (!this._currentToken) {
            try {
                this._currentToken = Core.Storage.get(this._tokenKey);
            } catch (e) {
                this._currentToken = null;
            }
        }
        return this._currentToken;
    }
}