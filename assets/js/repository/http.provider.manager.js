/**
 * file: assets/js/repository/http.provider.manager.js
 */

import { HttpProviderBase } from './http.provider.base.js';

export class HttpProviderManager {
    static initialize(engine) {
        if (!(engine instanceof HttpProviderBase)) {
            throw new TypeError("HttpProviderManager requires an instance of HttpProviderBase.");
        }
        return engine;
    }
}