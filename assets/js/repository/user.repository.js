/**
 * @file user.repository.js
 * @description Enterprise repository data gateway for user authentication, registration, 
 * profile fetching, password reset, token refreshing, and session termination endpoints. 
 * Enforces HTTPS, AbortController timeouts, token injection via TokenEngine, and standard envelope mapping.
 * @module Repository/UserRepository
 * @version 3.0.0
 * @status Production Ready
 */

import { tokenEngine } from '../engine/token.engine.js';

export class UserRepository {
    #baseUrl;
    #defaultTimeout;

    /**
     * Creates an instance of UserRepository.
     * @param {string} [baseUrl=''] - Base URL for API requests.
     * @param {number} [defaultTimeout=10000] - Default request timeout in milliseconds.
     */
    constructor(baseUrl = '', defaultTimeout = 10000) {
        this.#baseUrl = baseUrl;
        this.#defaultTimeout = defaultTimeout;
    }

    /**
     * Builds request headers including Content-Type, Accept, and Bearer authorization if available.
     * @private
     * @param {string} [tokenOverride] - Optional token to override TokenEngine retrieval.
     * @returns {Headers} Configured Headers object.
     */
    #requestHeaders(tokenOverride) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        const token = tokenOverride || tokenEngine.getToken();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    /**
     * Creates an AbortController with a specified timeout.
     * @private
     * @param {number} timeout - Timeout in milliseconds.
     * @returns {Object} Object containing controller and timeoutId.
     */
    #createAbortController(timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        return { controller, timeoutId };
    }

    /**
     * Sanitizes payload objects to strip sensitive unencrypted fields from unintended telemetry or logging traces.
     * @private
     * @param {Object} payload - Raw input payload.
     * @returns {Object} Sanitized payload copy.
     */
    #sanitizePayload(payload) {
        if (!payload || typeof payload !== 'object') {
            return {};
        }
        return { ...payload };
    }

    /**
     * Builds a standardized response object envelope.
     * @private
     * @param {boolean} success - Success status flag.
     * @param {number} status - HTTP status code.
     * @param {string} message - Human-readable response message.
     * @param {any} [data=null] - Response data payload.
     * @param {any} [errors=null] - Structured error information.
     * @returns {Object} Standardized envelope.
     */
    #buildRepositoryResponse(success, status, message, data = null, errors = null) {
        return {
            success,
            status,
            message,
            data,
            errors
        };
    }

    /**
     * Validates that the endpoint URL strictly enforces HTTPS unless running on a local development origin.
     * @private
     * @param {string} urlString - Fully qualified URL string.
     * @returns {boolean} True if secure or permitted local environment.
     */
    #validateHttps(urlString) {
        try {
            const url = new URL(urlString);
            const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '';
            if (!isLocal && url.protocol !== 'https:') {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Maps HTTP status codes into meaningful response messages and structured envelopes.
     * @private
     * @param {Response} response - Fetch API Response object.
     * @param {any} [responseData=null] - Parsed response body.
     * @returns {Object} Standardized response envelope.
     */
    #handleFetchResponse(response, responseData = null) {
        const status = response.status;
        let success = response.ok;
        let message = response.statusText || 'Response received';
        let data = responseData;
        let errors = null;

        if (responseData && typeof responseData === 'object') {
            if (responseData.message) message = responseData.message;
            if (responseData.errors) errors = responseData.errors;
            if (responseData.data !== undefined) data = responseData.data;
        }

        switch (status) {
            case 200:
            case 201:
                success = true;
                break;
            case 204:
                success = true;
                message = 'No Content';
                data = null;
                break;
            case 400:
                message = message || 'Bad Request: Invalid payload or parameters.';
                errors = errors || { request: [message] };
                break;
            case 401:
                message = message || 'Unauthorized: Authentication required or token expired.';
                errors = errors || { auth: [message] };
                break;
            case 403:
                message = message || 'Forbidden: Insufficient permissions to access resource.';
                errors = errors || { authorization: [message] };
                break;
            case 404:
                message = message || 'Not Found: The requested resource does not exist.';
                errors = errors || { endpoint: [message] };
                break;
            case 409:
                message = message || 'Conflict: Resource conflict or duplicate entry.';
                errors = errors || { conflict: [message] };
                break;
            case 422:
                message = message || 'Unprocessable Entity: Validation error.';
                errors = errors || { validation: [message] };
                break;
            case 429:
                message = message || 'Too Many Requests: Rate limit exceeded.';
                errors = errors || { rateLimit: [message] };
                break;
            case 500:
                message = message || 'Internal Server Error: An unexpected error occurred.';
                errors = errors || { server: [message] };
                break;
            case 503:
                message = message || 'Service Unavailable: Server is currently offline or under maintenance.';
                errors = errors || { server: [message] };
                break;
            default:
                if (!success && !errors) {
                    errors = { general: [message] };
                }
                break;
        }

        return this.#buildRepositoryResponse(success, status, message, data, errors);
    }

    /**
     * Core execution engine for HTTP requests with AbortController, error handling, and status mapping.
     * @private
     * @param {string} endpoint - API endpoint route.
     * @param {string} [method='GET'] - HTTP method.
     * @param {Object} [payload=null] - Request payload body.
     * @param {Object} [queryParams={}] - Query parameters.
     * @param {string} [tokenOverride] - Optional token override.
     * @param {number} [timeout] - Timeout override in milliseconds.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async #request(endpoint, method = 'GET', payload = null, queryParams = {}, tokenOverride = undefined, timeout = this.#defaultTimeout) {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const fullUrl = new URL(`${this.#baseUrl}${cleanEndpoint}`, window.location.origin);

        if (queryParams && typeof queryParams === 'object') {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    fullUrl.searchParams.append(key, String(value));
                }
            });
        }

        const urlString = fullUrl.toString();

        if (!this.#validateHttps(urlString)) {
            return this.#buildRepositoryResponse(
                false,
                400,
                'Security Error: Insecure HTTP protocol rejected. HTTPS required.',
                null,
                { security: ['Insecure endpoint protocol.'] }
            );
        }

        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            return this.#buildRepositoryResponse(
                false,
                503,
                'Network Error: Browser is offline.',
                null,
                { network: ['Client is offline.'] }
            );
        }

        const { controller, timeoutId } = this.#createAbortController(timeout);

        const options = {
            method,
            headers: this.#requestHeaders(tokenOverride),
            signal: controller.signal
        };

        if (payload !== null && method !== 'GET' && method !== 'HEAD') {
            options.body = JSON.stringify(this.#sanitizePayload(payload));
        }

        try {
            const response = await fetch(urlString, options);
            clearTimeout(timeoutId);

            let responseData = null;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    responseData = await response.json();
                } catch (jsonError) {
                    return this.#buildRepositoryResponse(
                        false,
                        500,
                        'Invalid JSON response received from server.',
                        null,
                        { parse: ['Failed to parse JSON response body.'] }
                    );
                }
            }

            return this.#handleFetchResponse(response, responseData);
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                return this.#buildRepositoryResponse(
                    false,
                    504,
                    'Gateway Timeout: Request timed out.',
                    null,
                    { timeout: ['Request exceeded timeout limit.'] }
                );
            }

            const errorMsg = error.message || 'Network Communication Error';
            const isCorsOrNetwork = errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError');

            return this.#buildRepositoryResponse(
                false,
                isCorsOrNetwork ? 503 : 500,
                isCorsOrNetwork ? 'CORS or Network Connection Error.' : errorMsg,
                null,
                { network: [errorMsg] }
            );
        }
    }

    /**
     * Authenticates user credentials.
     * @param {Object} credentials - Object containing email and password.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async loginApi(credentials) {
        return this.#request('/api/v3/auth/login', 'POST', credentials);
    }

    /**
     * Registers a new user account.
     * @param {Object} payload - New user registration data.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async registerApi(payload) {
        return this.#request('/api/v3/auth/register', 'POST', payload);
    }

    /**
     * Fetches the current authenticated user profile.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async fetchProfileApi() {
        return this.#request('/api/v3/auth/profile', 'GET');
    }

    /**
     * Resets password using a recovery token and new password.
     * @param {Object} payload - Object containing token and new password.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async resetPasswordApi(payload) {
        return this.#request('/api/v3/auth/reset-password', 'POST', payload);
    }

    /**
     * Requests an updated access token using a refresh token.
     * @param {string} [refreshToken] - Optional refresh token string.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async refreshTokenApi(refreshToken) {
        const payload = refreshToken ? { refreshToken } : null;
        return this.#request('/api/v3/auth/refresh-token', 'POST', payload);
    }

    /**
     * Terminates the current authenticated session on the backend.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async logoutApi() {
        return this.#request('/api/v3/auth/logout', 'POST');
    }
}

export const userRepository = new UserRepository();/**
 * @file user.repository.js
 * @description Enterprise repository data gateway for user authentication, registration, 
 * profile fetching, password reset, token refreshing, and session termination endpoints. 
 * Enforces HTTPS, AbortController timeouts, token injection via TokenEngine, and standard envelope mapping.
 * @module Repository/UserRepository
 * @version 3.0.0
 * @status Production Ready
 */

import { tokenEngine } from '../engine/token.engine.js';

export class UserRepository {
    #baseUrl;
    #defaultTimeout;

    /**
     * Creates an instance of UserRepository.
     * @param {string} [baseUrl=''] - Base URL for API requests.
     * @param {number} [defaultTimeout=10000] - Default request timeout in milliseconds.
     */
    constructor(baseUrl = '', defaultTimeout = 10000) {
        this.#baseUrl = baseUrl;
        this.#defaultTimeout = defaultTimeout;
    }

    /**
     * Builds request headers including Content-Type, Accept, and Bearer authorization if available.
     * @private
     * @param {string} [tokenOverride] - Optional token to override TokenEngine retrieval.
     * @returns {Headers} Configured Headers object.
     */
    #requestHeaders(tokenOverride) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        const token = tokenOverride || tokenEngine.getToken();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    /**
     * Creates an AbortController with a specified timeout.
     * @private
     * @param {number} timeout - Timeout in milliseconds.
     * @returns {Object} Object containing controller and timeoutId.
     */
    #createAbortController(timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        return { controller, timeoutId };
    }

    /**
     * Sanitizes payload objects to strip sensitive unencrypted fields from unintended telemetry or logging traces.
     * @private
     * @param {Object} payload - Raw input payload.
     * @returns {Object} Sanitized payload copy.
     */
    #sanitizePayload(payload) {
        if (!payload || typeof payload !== 'object') {
            return {};
        }
        return { ...payload };
    }

    /**
     * Builds a standardized response object envelope.
     * @private
     * @param {boolean} success - Success status flag.
     * @param {number} status - HTTP status code.
     * @param {string} message - Human-readable response message.
     * @param {any} [data=null] - Response data payload.
     * @param {any} [errors=null] - Structured error information.
     * @returns {Object} Standardized envelope.
     */
    #buildRepositoryResponse(success, status, message, data = null, errors = null) {
        return {
            success,
            status,
            message,
            data,
            errors
        };
    }

    /**
     * Validates that the endpoint URL strictly enforces HTTPS unless running on a local development origin.
     * @private
     * @param {string} urlString - Fully qualified URL string.
     * @returns {boolean} True if secure or permitted local environment.
     */
    #validateHttps(urlString) {
        try {
            const url = new URL(urlString);
            const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '';
            if (!isLocal && url.protocol !== 'https:') {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Maps HTTP status codes into meaningful response messages and structured envelopes.
     * @private
     * @param {Response} response - Fetch API Response object.
     * @param {any} [responseData=null] - Parsed response body.
     * @returns {Object} Standardized response envelope.
     */
    #handleFetchResponse(response, responseData = null) {
        const status = response.status;
        let success = response.ok;
        let message = response.statusText || 'Response received';
        let data = responseData;
        let errors = null;

        if (responseData && typeof responseData === 'object') {
            if (responseData.message) message = responseData.message;
            if (responseData.errors) errors = responseData.errors;
            if (responseData.data !== undefined) data = responseData.data;
        }

        switch (status) {
            case 200:
            case 201:
                success = true;
                break;
            case 204:
                success = true;
                message = 'No Content';
                data = null;
                break;
            case 400:
                message = message || 'Bad Request: Invalid payload or parameters.';
                errors = errors || { request: [message] };
                break;
            case 401:
                message = message || 'Unauthorized: Authentication required or token expired.';
                errors = errors || { auth: [message] };
                break;
            case 403:
                message = message || 'Forbidden: Insufficient permissions to access resource.';
                errors = errors || { authorization: [message] };
                break;
            case 404:
                message = message || 'Not Found: The requested resource does not exist.';
                errors = errors || { endpoint: [message] };
                break;
            case 409:
                message = message || 'Conflict: Resource conflict or duplicate entry.';
                errors = errors || { conflict: [message] };
                break;
            case 422:
                message = message || 'Unprocessable Entity: Validation error.';
                errors = errors || { validation: [message] };
                break;
            case 429:
                message = message || 'Too Many Requests: Rate limit exceeded.';
                errors = errors || { rateLimit: [message] };
                break;
            case 500:
                message = message || 'Internal Server Error: An unexpected error occurred.';
                errors = errors || { server: [message] };
                break;
            case 503:
                message = message || 'Service Unavailable: Server is currently offline or under maintenance.';
                errors = errors || { server: [message] };
                break;
            default:
                if (!success && !errors) {
                    errors = { general: [message] };
                }
                break;
        }

        return this.#buildRepositoryResponse(success, status, message, data, errors);
    }

    /**
     * Core execution engine for HTTP requests with AbortController, error handling, and status mapping.
     * @private
     * @param {string} endpoint - API endpoint route.
     * @param {string} [method='GET'] - HTTP method.
     * @param {Object} [payload=null] - Request payload body.
     * @param {Object} [queryParams={}] - Query parameters.
     * @param {string} [tokenOverride] - Optional token override.
     * @param {number} [timeout] - Timeout override in milliseconds.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async #request(endpoint, method = 'GET', payload = null, queryParams = {}, tokenOverride = undefined, timeout = this.#defaultTimeout) {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const fullUrl = new URL(`${this.#baseUrl}${cleanEndpoint}`, window.location.origin);

        if (queryParams && typeof queryParams === 'object') {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    fullUrl.searchParams.append(key, String(value));
                }
            });
        }

        const urlString = fullUrl.toString();

        if (!this.#validateHttps(urlString)) {
            return this.#buildRepositoryResponse(
                false,
                400,
                'Security Error: Insecure HTTP protocol rejected. HTTPS required.',
                null,
                { security: ['Insecure endpoint protocol.'] }
            );
        }

        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            return this.#buildRepositoryResponse(
                false,
                503,
                'Network Error: Browser is offline.',
                null,
                { network: ['Client is offline.'] }
            );
        }

        const { controller, timeoutId } = this.#createAbortController(timeout);

        const options = {
            method,
            headers: this.#requestHeaders(tokenOverride),
            signal: controller.signal
        };

        if (payload !== null && method !== 'GET' && method !== 'HEAD') {
            options.body = JSON.stringify(this.#sanitizePayload(payload));
        }

        try {
            const response = await fetch(urlString, options);
            clearTimeout(timeoutId);

            let responseData = null;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    responseData = await response.json();
                } catch (jsonError) {
                    return this.#buildRepositoryResponse(
                        false,
                        500,
                        'Invalid JSON response received from server.',
                        null,
                        { parse: ['Failed to parse JSON response body.'] }
                    );
                }
            }

            return this.#handleFetchResponse(response, responseData);
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                return this.#buildRepositoryResponse(
                    false,
                    504,
                    'Gateway Timeout: Request timed out.',
                    null,
                    { timeout: ['Request exceeded timeout limit.'] }
                );
            }

            const errorMsg = error.message || 'Network Communication Error';
            const isCorsOrNetwork = errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError');

            return this.#buildRepositoryResponse(
                false,
                isCorsOrNetwork ? 503 : 500,
                isCorsOrNetwork ? 'CORS or Network Connection Error.' : errorMsg,
                null,
                { network: [errorMsg] }
            );
        }
    }

    /**
     * Authenticates user credentials.
     * @param {Object} credentials - Object containing email and password.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async loginApi(credentials) {
        return this.#request('/api/v3/auth/login', 'POST', credentials);
    }

    /**
     * Registers a new user account.
     * @param {Object} payload - New user registration data.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async registerApi(payload) {
        return this.#request('/api/v3/auth/register', 'POST', payload);
    }

    /**
     * Fetches the current authenticated user profile.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async fetchProfileApi() {
        return this.#request('/api/v3/auth/profile', 'GET');
    }

    /**
     * Resets password using a recovery token and new password.
     * @param {Object} payload - Object containing token and new password.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async resetPasswordApi(payload) {
        return this.#request('/api/v3/auth/reset-password', 'POST', payload);
    }

    /**
     * Requests an updated access token using a refresh token.
     * @param {string} [refreshToken] - Optional refresh token string.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async refreshTokenApi(refreshToken) {
        const payload = refreshToken ? { refreshToken } : null;
        return this.#request('/api/v3/auth/refresh-token', 'POST', payload);
    }

    /**
     * Terminates the current authenticated session on the backend.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async logoutApi() {
        return this.#request('/api/v3/auth/logout', 'POST');
    }
}

export const userRepository = new UserRepository();