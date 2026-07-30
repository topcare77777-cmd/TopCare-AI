/**
 * TOPCARE CORE RUNTIME (TCR) — THEME.SERVICE.JS
 * ES Module Singleton Facade utilizing native module caching.
 * Exposes strict read-only resolution methods.
 */

import { ThemeBase } from './theme.base.js';
import { ThemeManager } from './theme.manager.js';

const engine = new ThemeBase();
ThemeManager.populateDefaults(engine);

export const Theme = Object.freeze({
    resolveVariant(variant) {
        return engine.resolveVariant(variant);
    },
    resolveSize(size) {
        return engine.resolveSize(size);
    },
    resolveSurface(surface) {
        return engine.resolveSurface(surface);
    },
    resolveState(state) {
        return engine.resolveState(state);
    },
    resolve(category, key) {
        return engine.resolve(category, key);
    },
    has(category, key) {
        return engine.has(category, key);
    }
});