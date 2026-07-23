/**
 * TopCare AI Platform V2.0.0
 * API Engine Pro
 * Path: assets/js/core/api.engine.pro.js
 */
import Logger from '../core/logger.js';
import NotificationEngine from './notification.engine.js';

const ApiEnginePro = {
    interceptors: { request: [], response: [] },
    cache: new Map(),

    addRequestInterceptor(fn) { this.interceptors.request.push(fn); },
    addResponseInterceptor(fn) { this.interceptors.response.push(fn); },

    async request(url, options = {}, retries = 3, timeout = 20000) {
        let config = { method: 'GET', headers: { 'Content-Type': 'application/json', ...options.headers }, ...options };

        for (const interceptor of this.interceptors.request) {
            config = await interceptor(config);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        config.signal = controller.signal;

        try {
            let response = await fetch(url, config);
            clearTimeout(timeoutId);

            for (const interceptor of this.interceptors.response) {
                response = await interceptor(response);
            }

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (retries > 0 && error.name !== 'AbortError') {
                Logger.warn(`[ApiEnginePro] Retry attempt for ${url}`);
                return await this.request(url, options, retries - 1, timeout);
            }
            NotificationEngine.show(error.message || 'API request failed', 'error');
            throw error;
        }
    }
};

export default ApiEnginePro;