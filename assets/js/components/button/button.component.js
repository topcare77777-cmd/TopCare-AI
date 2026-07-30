/**
 * TOPCARE AI PLATFORM — BUTTON.COMPONENT.JS
 * Enterprise Button Component Class with Full Lifecycle Management & Decoupled Events
 */

import { BUTTON_DEFAULT_CONFIG } from './button.defaults.js';
import { createButtonElement } from './button.template.js';

export class ButtonComponent {
    constructor(userConfig = {}) {
        this.config = { ...BUTTON_DEFAULT_CONFIG, ...userConfig };
        this.element = null;
        this.isMounted = false;
        this._boundClickHandler = null;
    }

    _resolveTag() {
        if (this.config.href) return 'a';
        return 'button';
    }

    /**
     * Lifecycle Phase 1: Render DOM Tree
     */
    render() {
        const tag = this._resolveTag();
        const props = { ...this.config, tag };

        let stateClasses = '';
        if (this.config.loading) stateClasses += ' loading ';
        if (this.config.disabled) stateClasses += ' is-disabled ';

        this.element = createButtonElement(props, stateClasses.trim());
        this.bindEvents();

        return this.element;
    }

    /**
     * Lifecycle Phase 2: Bind Event Listeners Separately
     */
    bindEvents() {
        if (!this.element) return;

        this._boundClickHandler = (event) => {
            if (this.config.disabled || this.config.loading) {
                event.preventDefault();
                return;
            }
            if (typeof this.config.onClick === 'function') {
                this.config.onClick(event, this);
            }
        };

        this.element.addEventListener('click', this._boundClickHandler);
    }

    /**
     * Lifecycle Phase 3: Mount Component to Target Parent Container
     */
    mount(container = document.body) {
        if (!this.element) {
            this.render();
        }
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        if (container) {
            container.appendChild(this.element);
            this.isMounted = true;
        }
        return this;
    }

    /**
     * Lifecycle Phase 4: Update Component Configuration & State
     */
    update(newConfig = {}) {
        this.config = { ...this.config, ...newConfig };
        if (this.element && this.element.parentNode) {
            const oldElement = this.element;
            const parent = oldElement.parentNode;

            // Re-render new element
            const tag = this._resolveTag();
            const props = { ...this.config, tag };
            let stateClasses = '';
            if (this.config.loading) stateClasses += ' loading ';
            if (this.config.disabled) stateClasses += ' is-disabled ';

            this.element = createButtonElement(props, stateClasses.trim());
            this.bindEvents();

            parent.replaceChild(this.element, oldElement);
        }
        return this;
    }

    disable() {
        return this.update({ disabled: true, loading: false });
    }

    enable() {
        return this.update({ disabled: false, loading: false });
    }

    setLoading(isLoading = true) {
        return this.update({ loading: isLoading });
    }

    /**
     * Lifecycle Phase 5: Teardown and Cleanup
     */
    destroy() {
        if (this.element) {
            if (this._boundClickHandler) {
                this.element.removeEventListener('click', this._boundClickHandler);
            }
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
        this.element = null;
        this.isMounted = false;
    }
}