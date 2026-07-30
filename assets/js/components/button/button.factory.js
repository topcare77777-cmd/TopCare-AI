/**
 * TOPCARE AI PLATFORM — BUTTON.FACTORY.JS
 * Fluent Factory Pattern for Zero-Boilerplate Component Instantiation
 */

import { ButtonComponent } from './button.component.js';
import { BUTTON_VARIANTS } from './button.types.js';

export class ButtonFactory {
    static create(config = {}) {
        const instance = new ButtonComponent(config);
        return instance.render();
    }

    static createPrimary(label, onClick, options = {}) {
        return this.create({ label, variant: BUTTON_VARIANTS.PRIMARY, onClick, ...options });
    }

    static createSecondary(label, onClick, options = {}) {
        return this.create({ label, variant: BUTTON_VARIANTS.SECONDARY, onClick, ...options });
    }

    static createDanger(label, onClick, options = {}) {
        return this.create({ label, variant: BUTTON_VARIANTS.DANGER, onClick, ...options });
    }

    static createSuccess(label, onClick, options = {}) {
        return this.create({ label, variant: BUTTON_VARIANTS.SUCCESS, onClick, ...options });
    }

    static createGlass(label, onClick, options = {}) {
        return this.create({ label, variant: BUTTON_VARIANTS.GLASS, onClick, ...options });
    }

    static createLink(label, href, options = {}) {
        return this.create({ label, variant: BUTTON_VARIANTS.LINK, href, ...options });
    }

    static createIcon(icon, onClick, options = {}) {
        return this.create({ icon, variant: BUTTON_VARIANTS.ICON, onClick, ...options });
    }

    static createFAB(icon, onClick, options = {}) {
        return this.create({ icon, variant: BUTTON_VARIANTS.FAB, onClick, ...options });
    }
}