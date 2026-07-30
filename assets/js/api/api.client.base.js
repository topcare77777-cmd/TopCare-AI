/**
 * file: assets/js/api/api.client.base.js
 */

import { Core } from '../core/index.js';
import { HttpRepositoryProvider } from '../repository/index.js';
import { ApiClientInterface } from './api.client.interface.js';
import { API_EVENTS } from './api.client.types.js';
import { InterceptorService } from './interceptor/interceptor.service.js';
import { TokenInterceptor } from './interceptor/index.js';

export class ApiClientBase extends ApiClientInterface {
    constructor(provider = new HttpRepositoryProvider()) {
        super();
        this._provider = provider;
        TokenInterceptor.attach();
        Object.seal(this);
    }

    setProvider(provider) {
        if (!provider || typeof provider.query !== 'function' || typeof provider.mutate !== 'function') {
            throw new TypeError("ApiClient provider must implement query() and mutate() methods.");
        }
        this._provider = provider;
        Core.Logger.info("ApiClient provider updated successfully.");
        return this;
    }

    addRequestInterceptor(onFulfilled, onRejected) {
        InterceptorService.addRequestInterceptor(onFulfilled, onRejected);
        return this;
    }

    addResponseInterceptor(onFulfilled, onRejected) {
        InterceptorService.addResponseInterceptor(onFulfilled, onRejected);
        return this;
    }

    _generateCorrelationId() {
        return 'corr_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    }

    async execute(method, endpoint, data = null, options = {}) {
        if (!method || typeof method !== 'string') {
            throw new TypeError("API method must be a valid non-empty string.");
        }
        if (!endpoint || typeof endpoint !== 'string') {
            throw new TypeError("API endpoint must be a valid non-empty string.");
        }

        const normalizedMethod = method.toUpperCase();
        
        let initialConfig = {
            method: normalizedMethod,
            endpoint,
            data: data !== null ? Core.Utils.clone(data) : null,
            options: Core.Utils.clone(options),
            headers: {
                'X-Correlation-ID': this._generateCorrelationId(),
                ...(options.headers || {})
            }
        };

        Core.Logger.info(`ApiClient executing [${normalizedMethod}] request to: ${endpoint}`);
        Core.Event.emit(API_EVENTS.REQUEST, { method: normalizedMethod, endpoint, config: initialConfig });

        try {
            const processedConfig = await InterceptorService.executeRequestPipeline(initialConfig);

            let rawResponse;
            const finalOptions = {
                ...(processedConfig.options || {}),
                headers: processedConfig.headers,
                method: processedConfig.method
            };

            if (normalizedMethod === 'GET') {
                rawResponse = await this._provider.query(processedConfig.endpoint, finalOptions);
            } else {
                finalOptions.method = processedConfig.method;
                rawResponse = await this._provider.mutate(processedConfig.endpoint, processedConfig.data, finalOptions);
            }

            const finalResponse = await InterceptorService.executeResponsePipeline(rawResponse);
            const clonedResponse = Core.Utils.clone(finalResponse);

            Core.Logger.debug(`ApiClient success [${normalizedMethod}] for: ${endpoint}`);
            Core.Event.emit(API_EVENTS.SUCCESS, { method: normalizedMethod, endpoint, response: clonedResponse });

            return clonedResponse;
        } catch (error) {
            // Attach retry helper and config reference so response error interceptors can re-trigger execution safely
            error.config = initialConfig;
            error.retryRequest = async (cfg) => {
                return await this.execute(cfg.method, cfg.endpoint, cfg.data, cfg.options);
            };

            try {
                // Pass error through response interceptor pipeline (which includes TokenInterceptor 401 check & retry)
                const interceptedErrorResult = await InterceptorService.executeResponsePipeline(Promise.reject(error));
                return interceptedErrorResult;
            } catch (finalError) {
                Core.Logger.error(`ApiClient error [${normalizedMethod}] for ${endpoint}: ${finalError.message}`);
                Core.Event.emit(API_EVENTS.ERROR, { method: normalizedMethod, endpoint, error: finalError });
                throw finalError;
            }
        }
    }

    async get(endpoint, options = {}) {
        return await this.execute('GET', endpoint, null, options);
    }

    async post(endpoint, data = {}, options = {}) {
        return await this.execute('POST', endpoint, data, options);
    }

    async put(endpoint, data = {}, options = {}) {
        return await this.execute('PUT', endpoint, data, options);
    }

    async patch(endpoint, data = {}, options = {}) {
        return await this.execute('PATCH', endpoint, data, options);
    }

    async delete(endpoint, options = {}) {
        return await this.execute('DELETE', endpoint, null, options);
    }
}