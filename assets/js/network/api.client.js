/**
 * TopCare AI Platform V2.0.0
 * API Client
 * Path: assets/js/core/api.client.js
 */
import ApiEngine from '../engine/api.engine.js';
import SessionEngine from '../engine/session.engine.js';

const ApiClient = {
    init() {
        ApiEngine.addRequestInterceptor(async (config) => {
            const token = SessionEngine.getUser()?.token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        });
    }
};

export default ApiClient;