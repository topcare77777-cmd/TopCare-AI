/**
 * TOPCARE CORE RUNTIME (TCR) — THEME.BASE.JS
 * Core resolution engine implementing ThemeInterface using native Map().
 * Enforces immutability after lock, prevents token overwrites, and unifies validation.
 */

import { ThemeInterface } from './theme.interface.js';
import { THEME_CATEGORIES } from './theme.types.js';
import { ThemeCategoryError, ThemeTokenError } from './theme.errors.js';

export class ThemeBase extends ThemeInterface {
    constructor() {
        super();
        this.tokenRegistry = new Map();
        this.isLocked = false;

        Object.values(THEME_CATEGORIES).forEach(category => {
            this.tokenRegistry.set(category, new Map());
        });
    }

    _validateCategory(category) {
        if (!this.tokenRegistry.has(category)) {
            throw new ThemeCategoryError(category);
        }
    }

    register(category, key, resolvedValue) {
        if (this.isLocked) {
            throw new Error('[ThemeEngine] Cannot modify registry after runtime lock.');
        }
        this._validateCategory(category);
        const categoryMap = this.tokenRegistry.get(category);
        if (categoryMap.has(key)) {
            throw new ThemeTokenError(category, key);
        }
        categoryMap.set(key, resolvedValue);
        return this;
    }

    lock() {
        this.isLocked = true;
        return this;
    }

    resolve(category, key) {
        this._validateCategory(category);
        const categoryMap = this.tokenRegistry.get(category);
        return categoryMap.get(key) || null;
    }

    resolveVariant(variant) {
        return this.resolve(THEME_CATEGORIES.VARIANT, variant);
    }

    resolveSize(size) {
        return this.resolve(THEME_CATEGORIES.SIZE, size);
    }

    resolveSurface(surface) {
        return this.resolve(THEME_CATEGORIES.SURFACE, surface);
    }

    resolveState(state) {
        return this.resolve(THEME_CATEGORIES.STATE, state);
    }

    has(category, key) {
        this._validateCategory(category);
        return this.tokenRegistry.get(category).has(key);
    }

    clear() {
        if (this.isLocked) {
            throw new Error('[ThemeEngine] Cannot clear registry after runtime lock.');
        }
        this.tokenRegistry.forEach(categoryMap => categoryMap.clear());
        return this;
    }
}