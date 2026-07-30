/**
 * file: assets/js/api/interceptor/token.interceptor.service.js
 */

import { TokenInterceptorBase } from './token.interceptor.base.js';
import { TokenInterceptorManager } from './token.interceptor.manager.js';

const engine = TokenInterceptorManager.initialize(new TokenInterceptorBase());

export const TokenInterceptor = Object.freeze({
    attach() {
        return engine.attach();
    },
    detach() {
        return engine.detach();
    },
    refreshToken() {
        return engine.refreshToken();
    }
});