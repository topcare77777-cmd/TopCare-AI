/**
 * file: assets/js/api/api.client.manager.js
 */

import { ApiClientBase } from './api.client.base.js';

export class ApiClientManager {
    static initialize(engine) {
        if (!(engine instanceof ApiClientBase)) {
            throw new TypeError("ApiClientManager requires an instance of ApiClientBase.");
        }
        return engine;
    }
}