/**
 * TOPCARE AI PLATFORM — BUTTON.DEFAULTS.JS
 * Default Configuration Constants for Button Component
 */

import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_WIDTHS } from './button.types.js';

export const BUTTON_DEFAULT_CONFIG = Object.freeze({
    label: '',
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
    attributes: {},
    onClick: null
});