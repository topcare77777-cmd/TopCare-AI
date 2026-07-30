/**
 * TOPCARE CORE RUNTIME (TCR) — THEME INDEX.JS
 * Single Entry Point (SSOT) public export for the Theme subsystem.
 * Strictly exposes interfaces, types, base engine, manager, and facade service.
 */

export { ThemeInterface } from './theme.interface.js';
export { THEME_VARIANTS, THEME_SIZES, THEME_SURFACES, THEME_STATES, THEME_CATEGORIES } from './theme.types.js';
export { ThemeError, ThemeCategoryError, ThemeTokenError } from './theme.errors.js';
export { ThemeBase } from './theme.base.js';
export { ThemeManager } from './theme.manager.js';
export { Theme } from './theme.service.js';