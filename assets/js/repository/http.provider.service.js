/**
 * file: assets/js/repository/http.provider.service.js
 */

import { HttpProviderBase } from './http.provider.base.js';
import { HttpProviderManager } from './http.provider.manager.js';

export class HttpRepositoryProvider extends HttpProviderBase {
    constructor(config) {
        super(config);
        HttpProviderManager.initialize(this);
        Object.seal(this);
    }
}