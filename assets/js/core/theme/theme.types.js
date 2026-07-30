/**
 * TOPCARE CORE RUNTIME (TCR) — THEME.TYPES.JS
 * Single Source of Truth (SSOT) for Theme Variants, Sizes, Surfaces, and States.
 * Fully immutable using Object.freeze(). Zero hardcoded magic strings outside this module.
 */

export const THEME_VARIANTS = Object.freeze({
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    GHOST: 'ghost',
    OUTLINE: 'outline',
    GLASS: 'glass',
    LINK: 'link'
});

export const THEME_SIZES = Object.freeze({
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl'
});

export const THEME_SURFACES = Object.freeze({
    DEFAULT: 'default',
    ELEVATED: 'elevated',
    FLOATING: 'floating',
    TRANSPARENT: 'transparent'
});

export const THEME_STATES = Object.freeze({
    DEFAULT: 'default',
    HOVER: 'hover',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    LOADING: 'loading',
    FOCUS: 'focus'
});

export const THEME_CATEGORIES = Object.freeze({
    VARIANT: 'variant',
    SIZE: 'size',
    SURFACE: 'surface',
    STATE: 'state'
});