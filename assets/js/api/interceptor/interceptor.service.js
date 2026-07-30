/**
 * file: assets/js/api/interceptor/interceptor.service.js
 */

import { InterceptorBase } from './interceptor.base.js';
import { InterceptorManager } from './interceptor.manager.js';

const engine = InterceptorManager.initialize(new InterceptorBase());

export const InterceptorService = Object.freeze({
    addRequestInterceptor(onFulfilled, onRejected) {
        return engine.addRequestInterceptor(onFulfilled, onRejected);
    },
    addResponseInterceptor(onFulfilled, onRejected) {
        return engine.addResponseInterceptor(onFulfilled, onRejected);
    },
    async executeRequestPipeline(config) {
        return await engine.executeRequestPipeline(config);
    },
    async executeResponsePipeline(response) {
        return await engine.executeResponsePipeline(response);
    }
});