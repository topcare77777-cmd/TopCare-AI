/**
 * TOPCARE AI PLATFORM — BUTTON.CONFIG.JS
 * Centralized Configuration & Mapping for Button Component
 */

import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_WIDTHS } from './button.types.js';

export const BUTTON_DEFAULT_CONFIG = Object.freeze({
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.MD,
    width: BUTTON_WIDTHS.AUTO,
    type: 'button',
    disabled: false,
    loading: false,
    icon: null,
    iconPosition: 'left',
    href: null,
    target: null,
    ariaLabel: null,
    className: '',
    onClick: null
});

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