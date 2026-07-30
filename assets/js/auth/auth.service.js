/**
 * file: assets/js/auth/auth.service.js
 */

import { AuthBase } from './auth.base.js';
import { AuthManager } from './auth.manager.js';

const engine = AuthManager.initialize(new AuthBase());

export const Auth = Object.freeze({
    login(credentials) {
        return engine.login(credentials);
    },
    logout() {
        return engine.logout();
    },
    restore() {
        return engine.restore();
    },
    refresh() {
        return engine.refresh();
    },
    validate() {
        return engine.validate();
    },
    isAuthenticated() {
        return engine.isAuthenticated();
    },
    getUser() {
        return engine.getUser();
    },
    getToken() {
        return engine.getToken();
    }
});