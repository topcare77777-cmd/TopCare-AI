/**
 * TopCare AI Platform V2.0.0
 * Lazy Immutable Iterators for Map/Set and Read-Only View Proxies for TypedArrays
 * Path: assets/js/auth/events/utils/deep.freeze.js
 */

function createReadOnlyTypedArrayProxy(typedArray) {
    return new Proxy(typedArray, {
        set(target, prop, value) {
            throw new TypeError("Cannot modify read-only TypedArray view.");
        },
        deleteProperty(target, prop) {
            throw new TypeError("Cannot delete from read-only TypedArray view.");
        }
    });
}

function createImmutableMapProxy(map, visited) {
    return new Proxy(map, {
        set(target, prop, value) { throw new TypeError("Cannot modify immutable Map."); },
        deleteProperty(target, prop) { throw new TypeError("Cannot delete from immutable Map."); },
        get(target, prop) {
            const value = Reflect.get(target, prop);
            if (typeof value === 'function') {
                if (['set', 'delete', 'clear'].includes(prop)) {
                    return function() { throw new TypeError(`Method '${prop}' is restricted on immutable Map.`); };
                }
                if (prop === 'get') {
                    return function(key) {
                        return deepFreeze(target.get(key), visited);
                    };
                }
                if (['entries', 'values', 'Symbol.iterator'].includes(prop) || prop === Symbol.iterator) {
                    return function* () {
                        for (const item of target[prop === Symbol.iterator ? 'entries' : prop]()) {
                            if (prop === 'values') {
                                yield deepFreeze(item, visited);
                            } else {
                                const [k, v] = item;
                                yield [deepFreeze(k, visited), deepFreeze(v, visited)];
                            }
                        }
                    };
                }
                return value.bind(target);
            }
            return value;
        }
    });
}

function createImmutableSetProxy(set, visited) {
    return new Proxy(set, {
        set(target, prop, value) { throw new TypeError("Cannot modify immutable Set."); },
        deleteProperty(target, prop) { throw new TypeError("Cannot delete from immutable Set."); },
        get(target, prop) {
            const value = Reflect.get(target, prop);
            if (typeof value === 'function') {
                if (['add', 'delete', 'clear'].includes(prop)) {
                    return function() { throw new TypeError(`Method '${prop}' is restricted on immutable Set.`); };
                }
                if (['values', 'keys', 'Symbol.iterator'].includes(prop) || prop === Symbol.iterator) {
                    return function* () {
                        for (const item of target.values()) {
                            yield deepFreeze(item, visited);
                        }
                    };
                }
                return value.bind(target);
            }
            return value;
        }
    });
}

function deepFreeze(obj, visited = new WeakSet()) {
    if (obj && (typeof obj === 'object' || typeof obj === 'function')) {
        if (visited.has(obj)) return obj;
        visited.add(obj);

        if (obj instanceof Date || obj instanceof RegExp || obj instanceof Error) {
            if (!Object.isFrozen(obj)) Object.freeze(obj);
            return obj;
        }

        if (obj instanceof Map) {
            return createImmutableMapProxy(obj, visited);
        }

        if (obj instanceof Set) {
            return createImmutableSetProxy(obj, visited);
        }

        if (ArrayBuffer.isView(obj)) {
            return createReadOnlyTypedArrayProxy(obj);
        }

        if (obj instanceof ArrayBuffer) {
            return obj.slice(0);
        }

        const descriptors = Object.getOwnPropertyDescriptors(obj);
        Reflect.ownKeys(descriptors).forEach(key => {
            const desc = descriptors[key];
            if (typeof desc.value === 'object' && desc.value !== null) {
                deepFreeze(desc.value, visited);
            }
        });

        if (!Object.isFrozen(obj)) {
            Object.freeze(obj);
        }

        Reflect.ownKeys(obj).forEach(prop => {
            deepFreeze(obj[prop], visited);
        });
    }
    return obj;
}