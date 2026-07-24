/**
 * TopCare AI Platform V2.0.0
 * SessionManager orchestrating Store, Timer, and Lifecycle
 * Path: assets/js/auth/session.manager.js
 */

class SessionManager {
    constructor(storage, config, eventBus) {
        this.config = config || (typeof AUTH_CONFIG !== 'undefined' ? AUTH_CONFIG : {});
        this.eventBus = eventBus || globalAuthEventBus;
        this.store = new SessionStore(storage);
        
        this.timer = new SessionTimer(
            this.config.SESSION_CHECK_INTERVAL_MS || 60000,
            () => this._checkExpiration()
        );

        this.lifecycle = new SessionLifecycle(
            () => this._checkExpiration()
        );

        setTimeout(() => {
            const isAuthenticated = this.isAuthenticated();
            this.eventBus.dispatch(isAuthenticated ? AUTH_EVENTS.SESSION_RESTORED : AUTH_EVENTS.AUTH_INITIALIZED, { isAuthenticated });
            this.eventBus.dispatch(AUTH_EVENTS.AUTH_READY, { isAuthenticated });
        }, 50);

        this.start();
    }

    start() {
        this.timer.start();
        this.lifecycle.init();
    }

    stop() {
        this.timer.stop();
        this.lifecycle.destroy();
    }

    destroy() {
        this.stop();
        this.store.clear();
    }

    _checkExpiration() {
        if (this.isAuthenticated()) {
            const session = this.store.get();
            if (session && Date.now() > session.expiresAt) {
                this.destroySession(AUTH_EVENTS.SESSION_EXPIRED);
            }
        }
    }

    createSession(userData, token) {
        const timeout = this.config.SESSION_TIMEOUT_MS || 1800000;
        this.store.save(userData, token, timeout);
        this.eventBus.dispatch(AUTH_EVENTS.LOGIN_SUCCESS, { user: userData });
    }

    getSession() {
        const session = this.store.get();
        if (!session) return null;

        if (Date.now() > session.expiresAt) {
            this.destroySession(AUTH_EVENTS.SESSION_EXPIRED);
            return null;
        }
        return session;
    }

    isAuthenticated() {
        return this.getSession() !== null;
    }

    getToken() {
        return this.store.getToken();
    }

    destroySession(reasonEvent = AUTH_EVENTS.LOGOUT) {
        this.store.clear();
        this.eventBus.dispatch(reasonEvent);
    }
}