/**
 * file: assets/js/core/storage/storage.base.js
 */

import { StorageInterface } from './storage.interface.js';
import { STORAGE_DRIVER } from './storage.types.js';

export class StorageBase extends StorageInterface {
    constructor() {
        super();
        this._memoryStorage = new Map();
        this._activeDriver = this._resolveInitialDriver();
        Object.seal(this);
    }

    _validateKey(key) {
        if (!key || typeof key !== 'string') {
            throw new TypeError("Storage key must be a valid non-empty string.");
        }
    }

    _testStorage(storageObject) {
        try {
            const testKey = '__tcr_storage_test__';
            storageObject.setItem(testKey, testKey);
            storageObject.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    _resolveInitialDriver() {
        if (typeof window !== 'undefined') {
            try {
                if (window.localStorage && this._testStorage(window.localStorage)) {
                    return STORAGE_DRIVER.LOCAL;
                }
            } catch (e) {
                // Ignore and try next
            }

            try {
                if (window.sessionStorage && this._testStorage(window.sessionStorage)) {
                    return STORAGE_DRIVER.SESSION;
                }
            } catch (e) {
                // Ignore and fallback
            }
        }
        return STORAGE_DRIVER.MEMORY;
    }

    _getStorageEngine(driver) {
        const selected = driver || STORAGE_DRIVER.AUTO;
        let targetDriver = selected;

        if (targetDriver === STORAGE_DRIVER.AUTO) {
            targetDriver = this._activeDriver;
        }

        if (targetDriver === STORAGE_DRIVER.LOCAL) {
            if (typeof window !== 'undefined') {
                try {
                    if (window.localStorage && this._testStorage(window.localStorage)) {
                        return { engine: window.localStorage, type: STORAGE_DRIVER.LOCAL };
                    }
                } catch (e) {
                    // Fallback to session
                }
            }
            targetDriver = STORAGE_DRIVER.SESSION;
        }

        if (targetDriver === STORAGE_DRIVER.SESSION) {
            if (typeof window !== 'undefined') {
                try {
                    if (window.sessionStorage && this._testStorage(window.sessionStorage)) {
                        return { engine: window.sessionStorage, type: STORAGE_DRIVER.SESSION };
                    }
                } catch (e) {
                    // Fallback to memory
                }
            }
            targetDriver = STORAGE_DRIVER.MEMORY;
        }

        return { engine: this._memoryStorage, type: STORAGE_DRIVER.MEMORY };
    }

    _serialize(value) {
        try {
            return JSON.stringify(value);
        } catch (e) {
            return String(value);
        }
    }

    _deserialize(value) {
        if (value === null || value === undefined) {
            return value;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    set(key, value, driver = STORAGE_DRIVER.AUTO) {
        this._validateKey(key);
        const { engine, type } = this._getStorageEngine(driver);
        const serialized = this._serialize(value);

        try {
            if (type === STORAGE_DRIVER.MEMORY) {
                engine.set(key, serialized);
            } else {
                engine.setItem(key, serialized);
            }
        } catch (e) {
            // Fallback to memory storage on QuotaExceededError or failure
            this._memoryStorage.set(key, serialized);
        }
        return this;
    }

    get(key, driver = STORAGE_DRIVER.AUTO) {
        this._validateKey(key);
        const { engine, type } = this._getStorageEngine(driver);
        let raw = null;

        try {
            if (type === STORAGE_DRIVER.MEMORY) {
                raw = engine.has(key) ? engine.get(key) : null;
            } else {
                raw = engine.getItem(key);
            }
        } catch (e) {
            raw = null;
        }

        return this._deserialize(raw);
    }

    has(key, driver = STORAGE_DRIVER.AUTO) {
        this._validateKey(key);
        const { engine, type } = this._getStorageEngine(driver);

        try {
            if (type === STORAGE_DRIVER.MEMORY) {
                return engine.has(key);
            } else {
                return engine.getItem(key) !== null;
            }
        } catch (e) {
            return false;
        }
    }

    remove(key, driver = STORAGE_DRIVER.AUTO) {
        this._validateKey(key);
        const { engine, type } = this._getStorageEngine(driver);

        try {
            if (type === STORAGE_DRIVER.MEMORY) {
                engine.delete(key);
            } else {
                engine.removeItem(key);
            }
        } catch (e) {
            // Ignore failure
        }
        return this;
    }

    clear(driver = STORAGE_DRIVER.AUTO) {
        const { engine, type } = this._getStorageEngine(driver);

        try {
            if (type === STORAGE_DRIVER.MEMORY) {
                engine.clear();
            } else {
                engine.clear();
            }
        } catch (e) {
            // Ignore failure
        }
        return this;
    }

    keys(driver = STORAGE_DRIVER.AUTO) {
        const { engine, type } = this._getStorageEngine(driver);

        try {
            if (type === STORAGE_DRIVER.MEMORY) {
                return Array.from(engine.keys());
            } else {
                const keysArr = [];
                for (let i = 0; i < engine.length; i++) {
                    const k = engine.key(i);
                    if (k !== null) {
                        keysArr.push(k);
                    }
                }
                return keysArr;
            }
        } catch (e) {
            return [];
        }
    }

    length(driver = STORAGE_DRIVER.AUTO) {
        const { engine, type } = this._getStorageEngine(driver);

        try {
            if (type === STORAGE_DRIVER.MEMORY) {
                return engine.size;
            } else {
                return engine.length;
            }
        } catch (e) {
            return 0;
        }
    }

    driver() {
        return this._activeDriver;
    }
}