/**
 * file: assets/js/api/interceptor/token.interceptor.manager.js
 */

import { TokenInterceptorBase } from './token.interceptor.base.js';

export class TokenInterceptorManager {
    static initialize(engine) {
        if (!(engine instanceof TokenInterceptorBase)) {
            throw new TypeError("TokenInterceptorManager requires TokenInterceptorBase instance.");
        }
        return engine;
    }
}