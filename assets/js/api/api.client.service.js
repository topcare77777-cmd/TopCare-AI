/**
 * file: assets/js/api/api.client.service.js
 */

import { ApiClientBase } from './api.client.base.js';
import { ApiClientManager } from './api.client.manager.js';

const engine = ApiClientManager.initialize(new ApiClientBase());

export const ApiClient = Object.freeze({
    async execute(method, endpoint, data, options) {
        return await engine.execute(method, endpoint, data, options);
    },
    async get(endpoint, options) {
        return await engine.get(endpoint, options);
    },
    async post(endpoint, data, options) {
        return await engine.post(endpoint, data, options);
    },
    async put(endpoint, data, options) {
        return await engine.put(endpoint, data, options);
    },
    async patch(endpoint, data, options) {
        return await engine.patch(endpoint, data, options);
    },
    async delete(endpoint, options) {
        return await engine.delete(endpoint, options);
    },
    setProvider(provider) {
        engine.setProvider(provider);
        return this;
    },
    addRequestInterceptor(onFulfilled, onRejected) {
        engine.addRequestInterceptor(onFulfilled, onRejected);
        return this;
    },
    addResponseInterceptor(onFulfilled, onRejected) {
        engine.addResponseInterceptor(onFulfilled, onRejected);
        return this;
    }
});