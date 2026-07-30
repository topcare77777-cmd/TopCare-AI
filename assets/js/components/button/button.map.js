/**
 * TOPCARE AI PLATFORM — BUTTON.MAP.JS
 * Theme Resolver, Class Mappings, and Icon Registry (Decoupled from Logic)
 */

import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_WIDTHS } from './button.types.js';

export const VARIANT_CLASS_MAP = Object.freeze({
    [BUTTON_VARIANTS.PRIMARY]: 'btn-primary',
    [BUTTON_VARIANTS.SECONDARY]: 'btn-secondary',
    [BUTTON_VARIANTS.GHOST]: 'btn-ghost',
    [BUTTON_VARIANTS.OUTLINE]: 'btn-outline',
    [BUTTON_VARIANTS.GLASS]: 'btn-glass',
    [BUTTON_VARIANTS.DANGER]: 'btn-danger',
    [BUTTON_VARIANTS.SUCCESS]: 'btn-success',
    [BUTTON_VARIANTS.WARNING]: 'btn-warning',
    [BUTTON_VARIANTS.LINK]: 'btn-link',
    [BUTTON_VARIANTS.FAB]: 'btn-fab',
    [BUTTON_VARIANTS.ICON]: 'btn-icon'
});

export const SIZE_CLASS_MAP = Object.freeze({
    [BUTTON_SIZES.SM]: 'btn-sm',
    [BUTTON_SIZES.MD]: 'btn-md',
    [BUTTON_SIZES.LG]: 'btn-lg',
    [BUTTON_SIZES.XL]: 'btn-xl'
});

export const WIDTH_CLASS_MAP = Object.freeze({
    [BUTTON_WIDTHS.AUTO]: 'btn-auto',
    [BUTTON_WIDTHS.FULL]: 'btn-full',
    [BUTTON_WIDTHS.SQUARE]: 'btn-square'
});

/**
 * Enterprise Icon Registry (Maps semantic string identifiers to clean asset paths)
 */
export const ICON_REGISTRY = Object.freeze({
    rocket: 'assets/images/icons/icon-ai.png',
    robot: 'assets/images/icons/icon-chat.png',
    arrowRight: 'assets/images/icons/icon-dashboard.png',
    login: 'assets/images/icons/icon-profile.png',
    dashboard: 'assets/images/icons/icon-dashboard.png',
    plus: 'assets/images/icons/icon-event.png'
});

/**
 * Theme Resolver: Decouples JavaScript from direct CSS class awareness
 */
export class ButtonThemeResolver {
    static resolveVariantClass(variant) {
        return VARIANT_CLASS_MAP[variant] || VARIANT_CLASS_MAP[BUTTON_VARIANTS.PRIMARY];
    }

    static resolveSizeClass(size) {
        return SIZE_CLASS_MAP[size] || SIZE_CLASS_MAP[BUTTON_SIZES.MD];
    }

    static resolveWidthClass(width) {
        return WIDTH_CLASS_MAP[width] || WIDTH_CLASS_MAP[BUTTON_WIDTHS.AUTO];
    }

    static resolveIconPath(iconKey) {
        if (!iconKey) return null;
        return ICON_REGISTRY[iconKey] || iconKey;
    }
}