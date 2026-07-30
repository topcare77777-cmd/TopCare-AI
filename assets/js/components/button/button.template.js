/**
 * TOPCARE AI PLATFORM — BUTTON.TEMPLATE.JS
 * Secure DOM Construction Engine using Native document.createElement() (XSS Safe)
 */

import { ButtonThemeResolver } from './button.map.js';

export function createButtonElement(props, stateClasses = '') {
    const {
        tag,
        type,
        href,
        target,
        ariaLabel,
        disabled,
        loading,
        variant,
        size,
        width,
        icon,
        iconPosition,
        label,
        className,
        attributes
    } = props;

    const element = document.createElement(tag);

    // Resolve Class Names via Theme Resolver
    const variantClass = ButtonThemeResolver.resolveVariantClass(variant);
    const sizeClass = ButtonThemeResolver.resolveSizeClass(size);
    const widthClass = ButtonThemeResolver.resolveWidthClass(width);

    let iconLayoutClass = '';
    if (icon && iconPosition === 'left' && label) iconLayoutClass = 'btn-icon-left';
    if (icon && iconPosition === 'right' && label) iconLayoutClass = 'btn-icon-right';

    const classList = [
        'btn',
        variantClass,
        sizeClass,
        widthClass,
        iconLayoutClass,
        stateClasses,
        className
    ].filter(Boolean);

    element.classList.add(...classList);

    // Safe Attribute Assignments
    if (tag === 'a') {
        if (href) element.setAttribute('href', href);
        if (target) element.setAttribute('target', target);
    } else {
        element.setAttribute('type', type);
        if (disabled || loading) element.setAttribute('disabled', 'true');
    }

    if (ariaLabel) element.setAttribute('aria-label', ariaLabel);
    if (loading) element.setAttribute('aria-busy', 'true');

    if (attributes && typeof attributes === 'object') {
        for (const [key, val] of Object.entries(attributes)) {
            element.setAttribute(key, val);
        }
    }

    // DOM Tree Construction (Zero HTML Strings / XSS Safe)
    if (loading) {
        const spinner = document.createElement('span');
        spinner.className = 'btn-spinner';
        spinner.setAttribute('aria-hidden', 'true');
        element.appendChild(spinner);

        const textSpan = document.createElement('span');
        textSpan.className = 'btn-text btn-hidden';
        textSpan.textContent = label || '';
        element.appendChild(textSpan);
    } else {
        const iconPath = ButtonThemeResolver.resolveIconPath(icon);
        const iconElement = iconPath ? createIconElement(iconPath) : null;
        const textSpan = label ? document.createElement('span') : null;

        if (textSpan) {
            textSpan.className = 'btn-text';
            textSpan.textContent = label;
        }

        if (iconElement && (iconPosition === 'left' || iconPosition === 'only')) {
            element.appendChild(iconElement);
        }
        if (textSpan) {
            element.appendChild(textSpan);
        }
        if (iconElement && iconPosition === 'right') {
            element.appendChild(iconElement);
        }
    }

    return element;
}

function createIconElement(src) {
    const wrapper = document.createElement('span');
    wrapper.className = 'btn-icon-wrapper';
    wrapper.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.width = 18;
    img.height = 18;
    wrapper.appendChild(img);

    return wrapper;
}