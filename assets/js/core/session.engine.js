/**
 * TopCare AI Platform V2.0.0
 * Session Engine
 * Path: assets/js/core/session.engine.js
 */
import StorageEngine from './storage.engine.js';
import Logger from './logger.js';

const SessionEngine = {
    init() {
        Logger.info("[SessionEngine] Initialized.");
    },

    getUser() {
        return StorageEngine.get('session_user');
    },

    setUser(user) {
        StorageEngine.set('session_user', user);
    },

    clear() {
        StorageEngine.remove('session_user');
    }
};

export default SessionEngine;