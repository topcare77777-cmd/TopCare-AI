/**
 * file: assets/js/repository/http.provider.base.js
 */

import { Core } from '../core/index.js';
import { HttpProviderInterface } from './http.provider.interface.js';

export class HttpProviderBase extends HttpProviderInterface {
    constructor(defaultConfig = {}) {
        super();
        this._baseUrl = defaultConfig.baseUrl || '';
        this._defaultTimeout = defaultConfig.timeout || 10000;
        Object.seal(this);
    }

    _getAuthToken() {
        try {
            const tokenKey = Core.Constants.get('storage', 'TOKEN') || 'token';
            if (typeof Core.Storage !== 'undefined' && Core.Storage.has(tokenKey)) {
                return Core.Storage.get(tokenKey);
            }
        } catch (e) {
            // Fallback if storage or constants unavailable
        }
        return null;
    }

    async _request(method, endpoint, data = null, options = {}) {
        const url = endpoint.startsWith('http') ? endpoint : `${this._baseUrl}${endpoint}`;
        const timeout = options.timeout || this._defaultTimeout;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(options.headers || {})
        };

        const token = this._getAuthToken();
        if (token && !headers['Authorization']) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const fetchOptions = {
            method,
            headers,
            signal: controller.signal,
            ...(options.fetchOptions || {})
        };

        if (data !== null && method !== 'GET') {
            fetchOptions.body = JSON.stringify(data);
        }

        Core.Logger.info(`HttpProvider [${method}] requesting: ${url}`);

        try {
            const response = await fetch(url, fetchOptions);
            clearTimeout(timeoutId);

            let responseData = null;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            if (!response.ok) {
                const errorMessage = (responseData && (responseData.message || responseData.error))
                    ? (responseData.message || responseData.error)
                    : `HTTP Error status: ${response.status}`;

                const error = new Error(errorMessage);
                error.status = response.status;
                error.response = responseData;
                throw error;
            }

            Core.Logger.debug(`HttpProvider [${method}] success: ${url}`);
            return responseData;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                Core.Logger.error(`HttpProvider request timeout for ${url} after ${timeout}ms`);
                const timeoutError = new Error(`Request timeout after ${timeout}ms`);
                timeoutError.status = 408;
                throw timeoutError;
            }
            Core.Logger.error(`HttpProvider request failed for ${url}: ${error.message}`);
            throw error;
        }
    }

    async query(endpoint, options = {}) {
        return await this._request('GET', endpoint, null, options);
    }

    async mutate(endpoint, payload = {}, options = {}) {
        const method = options.method ? options.method.toUpperCase() : 'POST';
        return await this._request(method, endpoint, payload, options);
    }
}