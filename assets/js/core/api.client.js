/**
 * TopCare AI Platform V2.0.0
 * API Client
 * Path: assets/js/core/api.client.js
 */
import ApiEngine from './api.engine.js';
import SessionEngine from './session.engine.js';

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