/**
 * TopCare AI Platform V2.0.0
 * Robust Core Deep Freeze Utility resistant to circular references and safe for Arrays, Dates, and RegExps
 * Path: assets/js/auth/utils/auth.freeze.js
 */

function deepFreeze(obj, visited = new WeakSet()) {
    if (obj && (typeof obj === 'object' || typeof obj === 'function')) {
        if (visited.has(obj)) {
            return obj;
        }
        visited.add(obj);

        if (obj instanceof Date || obj instanceof RegExp || obj instanceof Error) {
            if (!Object.isFrozen(obj)) Object.freeze(obj);
            return obj;
        }

        if (!Object.isFrozen(obj)) {
            Object.freeze(obj);
        }

        Reflect.ownKeys(obj).forEach(prop => {
            deepFreeze(obj[prop], visited);
        });
    }
    return obj;
}