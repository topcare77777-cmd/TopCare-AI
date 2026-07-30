/**
 * file: assets/js/auth/auth.manager.js
 */

import { AuthBase } from './auth.base.js';

export class AuthManager {
    static initialize(engine) {
        if (!(engine instanceof AuthBase)) {
            throw new TypeError("AuthManager requires an instance of AuthBase.");
        }
        return engine;
    }
}