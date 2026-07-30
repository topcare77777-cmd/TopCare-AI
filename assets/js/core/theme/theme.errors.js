/**
 * TOPCARE CORE RUNTIME (TCR) — THEME.ERRORS.JS
 * Enterprise Error Classes for Theme Resolution Engine operations.
 */

export class ThemeError extends Error {
    constructor(message, context = 'ThemeEngine') {
        super(`[${context}] ${message}`);
        this.name = 'ThemeError';
    }
}

export class ThemeCategoryError extends ThemeError {
    constructor(category) {
        super(`Invalid or unsupported theme category: "${String(category)}"`, 'ThemeCategoryError');
        this.name = 'ThemeCategoryError';
    }
}

export class ThemeTokenError extends ThemeError {
    constructor(category, key) {
        super(`Theme token already exists for category "${String(category)}" with key "${String(key)}"`, 'ThemeTokenError');
        this.name = 'ThemeTokenError';
    }
}