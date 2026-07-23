/**
 * @file session.engine.js
 * @description Enterprise-grade session management engine overseeing active session persistence,
 * secure storage separation based on "Remember Me", idle timeout monitoring, and leak-free destruction.
 * @module Engine/SessionEngine
 * @version 3.0.0
 * @status Production Ready
 */

import { tokenEngine } from './token.engine.js';

export class SessionEngine {
    #storageKey;
    #idleTimeoutMs;
    #currentStorage;
    #sessionData;
    #idleTimer;
    #activityHandler;
    #isInitialized;

    /**
     * Creates an instance of SessionEngine.
     * @param {Object} [options={}] - Configuration options for session management.
     * @param {string} [options.storageKey='topcare_session_data'] - Storage key for session data.
     * @param {number} [options.idleTimeoutMinutes=30] - Idle timeout duration in minutes.
     */
    constructor(options = {}) {
        this.#storageKey = options.storageKey || 'topcare_session_data';
        this.#idleTimeoutMs = (options.idleTimeoutMinutes || 30) * 60 * 1000;
        this.#currentStorage = null;
        this.#sessionData = null;
        this.#idleTimer = null;
        this.#activityHandler = null;
        this.#isInitialized = false;

        this.#initSessionState();
    }

    /**
     * Selects the storage medium based on the rememberMe flag.
     * @private
     * @param {boolean} rememberMe - Flag indicating persistence preference.
     * @returns {Storage} localStorage if true, sessionStorage otherwise.
     */
    #selectStorageMedium(rememberMe) {
        return rememberMe ? window.localStorage : window.sessionStorage;
    }

    /**
     * Initializes session state from active storage upon instantiation.
     * @private
     */
    #initSessionState() {
        const data = this.#loadSessionFromAnyStorage();
        if (data) {
            this.#sessionData = data;
            this.#startIdleTimer();
            this.#bindActivityListeners();
        }
    }

    /**
     * Attempts to load session data from either localStorage or sessionStorage.
     * @private
     * @returns {Object|null} Parsed session object or null.
     */
    #loadSessionFromAnyStorage() {
        try {
            let rawData = window.localStorage.getItem(this.#storageKey);
            if (rawData) {
                this.#currentStorage = window.localStorage;
                return JSON.parse(rawData);
            }

            rawData = window.sessionStorage.getItem(this.#storageKey);
            if (rawData) {
                this.#currentStorage = window.sessionStorage;
                return JSON.parse(rawData);
            }
        } catch (error) {
            this.#clearAllStorageMediums();
        }
        return null;
    }

    /**
     * Clears session data from all storage mediums to prevent orphan states.
     * @private
     */
    #clearAllStorageMediums() {
        try {
            window.localStorage.removeItem(this.#storageKey);
            window.sessionStorage.removeItem(this.#storageKey);
        } catch (error) {
            // Suppress storage clearing errors
        }
    }

    /**
     * Saves the current session data to the designated storage medium.
     * @private
     * @returns {boolean} True if successful.
     */
    #saveSession() {
        if (!this.#currentStorage || !this.#sessionData) {
            return false;
        }

        try {
            this.#currentStorage.setItem(this.#storageKey, JSON.stringify(this.#sessionData));
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Loads session data from current storage.
     * @private
     * @returns {Object|null} Session data object.
     */
    #loadSession() {
        if (!this.#currentStorage) {
            return null;
        }

        try {
            const rawData = this.#currentStorage.getItem(this.#storageKey);
            if (!rawData) return null;
            return JSON.parse(rawData);
        } catch (error) {
            return null;
        }
    }

    /**
     * Initializes the idle timeout timer.
     * @private
     */
    #initIdleTimer() {
        this.#clearIdleTimer();
        this.#idleTimer = setTimeout(() => {
            this.destroySession();
        }, this.#idleTimeoutMs);
    }

    /**
     * Clears the active idle timeout timer.
     * @private
     */
    #clearIdleTimer() {
        if (this.#idleTimer) {
            clearTimeout(this.#idleTimer);
            this.#idleTimer = null;
        }
    }

    /**
     * Binds window activity listeners to track user engagement.
     * @private
     */
    #bindActivityListeners() {
        if (this.#isInitialized || typeof window === 'undefined') {
            return;
        }

        this.#activityHandler = () => {
            this.touchSession();
        };

        const events = ['mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
        events.forEach(eventType => {
            window.addEventListener(eventType, this.#activityHandler, { passive: true });
        });

        this.#isInitialized = true;
    }

    /**
     * Removes all bound user activity listeners.
     * @private
     */
    #removeActivityListeners() {
        if (!this.#isInitialized || typeof window === 'undefined' || !this.#activityHandler) {
            return;
        }

        const events = ['mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
        events.forEach(eventType => {
            window.removeEventListener(eventType, this.#activityHandler);
        });

        this.#activityHandler = null;
        this.#isInitialized = false;
    }

    /**
     * Creates a new user session while filtering out sensitive fields.
     * @param {Object} userData - User profile metadata object.
     * @param {boolean} [rememberMe=false] - Flag governing persistence medium.
     * @returns {boolean} True upon successful creation.
     */
    createSession(userData, rememberMe = false) {
        if (!userData || typeof userData !== 'object') {
            return false;
        }

        const sanitizedData = { ...userData };
        delete sanitizedData.password;
        delete sanitizedData.refreshToken;
        delete sanitizedData.accessToken;
        delete sanitizedData.secret;

        if (!sanitizedData.id && !sanitizedData.userId && !sanitizedData.sub) {
            return false;
        }

        this.destroySession();

        this.#currentStorage = this.#selectStorageMedium(rememberMe);
        this.#sessionData = {
            ...sanitizedData,
            lastActive: Date.now(),
            createdAt: Date.now()
        };

        const saved = this.#saveSession();
        if (saved) {
            this.#initIdleTimer();
            this.#bindActivityListeners();
            return true;
        }

        return false;
    }

    /**
     * Completely destroys the active session, clearing timers, listeners, storage, and tokens.
     */
    destroySession() {
        this.#clearIdleTimer();
        this.#removeActivityListeners();
        this.#clearAllStorageMediums();

        this.#currentStorage = null;
        this.#sessionData = null;

        try {
            tokenEngine.removeToken();
        } catch (error) {
            // Suppress external token cleanup faults
        }
    }

    /**
     * Retrieves the current safe session data object.
     * @returns {Object|null} Session profile data or null.
     */
    getSessionData() {
        if (!this.#sessionData) {
            this.#sessionData = this.#loadSession();
        }
        return this.#sessionData ? { ...this.#sessionData } : null;
    }

    /**
     * Evaluates if the current session is valid and unexpired.
     * @returns {boolean} True if session is fully valid.
     */
    isSessionValid() {
        const tokenValid = !tokenEngine.isTokenExpired();
        if (!tokenValid) {
            return false;
        }

        const data = this.getSessionData();
        if (!data) {
            return false;
        }

        const userId = data.id || data.userId || data.sub;
        if (!userId) {
            return false;
        }

        if (data.lastActive) {
            const elapsed = Date.now() - data.lastActive;
            if (elapsed > this.#idleTimeoutMs) {
                return false;
            }
        }

        return true;
    }

    /**
     * Touches the session to refresh the idle timeout and last active timestamp.
     */
    touchSession() {
        if (!this.#sessionData) {
            this.#sessionData = this.#loadSession();
        }

        if (!this.#sessionData) {
            return;
        }

        this.#sessionData.lastActive = Date.now();
        this.#saveSession();
        this.#initIdleTimer();
    }
}

export const sessionEngine = new SessionEngine();