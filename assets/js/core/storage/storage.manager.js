/**
 * file: assets/js/core/storage/storage.manager.js
 */

import { StorageBase } from './storage.base.js';

export class StorageManager {
    static initialize(engine) {
        if (!(engine instanceof StorageBase)) {
            throw new TypeError("StorageManager requires an instance of StorageBase.");
        }
        return engine;
    }
}