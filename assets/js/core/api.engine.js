/**
 * TopCare AI Platform V2.0.0
 * API Engine
 * Path: assets/js/core/api.engine.js
 */
import Logger from './logger.js';
import NotificationEngine from './notification.engine.js';

const ApiEngine = {
    interceptors: {
        request: [],
        response: []
    },

    addRequestInterceptor(fn) {
        this.interceptors.request.push(fn);
    },

    addResponseInterceptor(fn) {
        this.interceptors.response.push(fn);
    },

    async request(url, options = {}, retries = 2, timeout = 15000) {
        let config = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        };

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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                NotificationEngine.show('Request timeout exceeded', 'error');
            } else if (retries > 0 && error.name !== 'AbortError') {
                Logger.warn(`[ApiEngine] Retrying request to ${url} (${retries} attempts left)`);
                return await this.request(url, options, retries - 1, timeout);
            } else {
                NotificationEngine.show(error.message || 'API request failed', 'error');
            }
            throw error;
        }
    },

    get(url, options) { return this.request(url, { ...options, method: 'GET' }); },
    post(url, data, options) { return this.request(url, { ...options, method: 'POST', body: JSON.stringify(data) }); },
    put(url, data, options) { return this.request(url, { ...options, method: 'PUT', body: JSON.stringify(data) }); },
    patch(url, data, options) { return this.request(url, { ...options, method: 'PATCH', body: JSON.stringify(data) }); },
    delete(url, options) { return this.request(url, { ...options, method: 'DELETE' }); }
};

export default ApiEngine;