/**
 * file: assets/js/services/user.service.manager.js
 */

import { UserServiceBase } from './user.service.base.js';

export class UserServiceManager {
    static initialize(engine) {
        if (!(engine instanceof UserServiceBase)) {
            throw new TypeError("UserServiceManager requires an instance of UserServiceBase.");
        }
        return engine;
    }
}