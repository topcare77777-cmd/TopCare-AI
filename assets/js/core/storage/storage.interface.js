/**
 * file: assets/js/core/storage/storage.interface.js
 */

export class StorageInterface {
    set(key, value, driver) { throw new Error("Not implemented"); }
    get(key, driver) { throw new Error("Not implemented"); }
    has(key, driver) { throw new Error("Not implemented"); }
    remove(key, driver) { throw new Error("Not implemented"); }
    clear(driver) { throw new Error("Not implemented"); }
    keys(driver) { throw new Error("Not implemented"); }
    length(driver) { throw new Error("Not implemented"); }
    driver() { throw new Error("Not implemented"); }
}