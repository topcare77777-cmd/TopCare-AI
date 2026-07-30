/**
 * TOPCARE CORE RUNTIME (TCR) — THEME.MANAGER.JS
 * Configuration bootstrap repository. Populates default mappings and locks the engine runtime.
 */

import { THEME_VARIANTS, THEME_SIZES, THEME_SURFACES, THEME_STATES, THEME_CATEGORIES } from './theme.types.js';

export class ThemeManager {
    static populateDefaults(engine) {
        const defaultMappings = [
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.PRIMARY, value: 'primary' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.SECONDARY, value: 'secondary' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.SUCCESS, value: 'success' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.WARNING, value: 'warning' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.DANGER, value: 'danger' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.GHOST, value: 'ghost' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.OUTLINE, value: 'outline' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.GLASS, value: 'glass' },
            { category: THEME_CATEGORIES.VARIANT, key: THEME_VARIANTS.LINK, value: 'link' },

            { category: THEME_CATEGORIES.SIZE, key: THEME_SIZES.SM, value: 'sm' },
            { category: THEME_CATEGORIES.SIZE, key: THEME_SIZES.MD, value: 'md' },
            { category: THEME_CATEGORIES.SIZE, key: THEME_SIZES.LG, value: 'lg' },
            { category: THEME_CATEGORIES.SIZE, key: THEME_SIZES.XL, value: 'xl' },

            { category: THEME_CATEGORIES.SURFACE, key: THEME_SURFACES.DEFAULT, value: 'default' },
            { category: THEME_CATEGORIES.SURFACE, key: THEME_SURFACES.ELEVATED, value: 'elevated' },
            { category: THEME_CATEGORIES.SURFACE, key: THEME_SURFACES.FLOATING, value: 'floating' },
            { category: THEME_CATEGORIES.SURFACE, key: THEME_SURFACES.TRANSPARENT, value: 'transparent' },

            { category: THEME_CATEGORIES.STATE, key: THEME_STATES.DEFAULT, value: 'default' },
            { category: THEME_CATEGORIES.STATE, key: THEME_STATES.HOVER, value: 'hover' },
            { category: THEME_CATEGORIES.STATE, key: THEME_STATES.ACTIVE, value: 'active' },
            { category: THEME_CATEGORIES.STATE, key: THEME_STATES.DISABLED, value: 'disabled' },
            { category: THEME_CATEGORIES.STATE, key: THEME_STATES.LOADING, value: 'loading' },
            { category: THEME_CATEGORIES.STATE, key: THEME_STATES.FOCUS, value: 'focus' }
        ];

        defaultMappings.forEach(({ category, key, value }) => {
            if (!engine.has(category, key)) {
                engine.register(category, key, value);
            }
        });

        engine.lock();
        return engine;
    }
}