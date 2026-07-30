/**
 * file: assets/js/core/dom/dom.base.js
 */

import { DomInterface } from './dom.interface.js';
import { DomElementError, DomSelectorError } from './dom.errors.js';

export class DomBase extends DomInterface {
    constructor() {
        super();
        Object.seal(this);
    }

    _resolveElement(target) {
        if (!target) {
            throw new DomElementError("Target element cannot be null or undefined.");
        }
        if (typeof target === 'string') {
            const el = document.querySelector(target);
            if (!el) {
                throw new DomSelectorError(target);
            }
            return el;
        }
        if (target instanceof Node) {
            return target;
        }
        throw new DomElementError("Invalid target type provided.");
    }

    _normalizeAttributes(element, attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            if (value === null || value === undefined) {
                continue;
            }
            if (key === 'className' || key === 'class') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'string') {
                element.style.cssText = value;
            } else if (key.startsWith('data-') && key.length > 5) {
                const datasetKey = key.slice(5).replace(/-([a-z])/g, (_, g) => g.toUpperCase());
                element.dataset[datasetKey] = value;
            } else if (key in element && typeof element[key] !== 'object') {
                element[key] = value;
            } else {
                element.setAttribute(key, value);
            }
        }
    }

    query(selector, context = document) {
        if (!selector || typeof selector !== 'string') {
            throw new DomSelectorError(selector);
        }
        const ctx = this._resolveElement(context);
        return ctx.querySelector(selector);
    }

    queryAll(selector, context = document) {
        if (!selector || typeof selector !== 'string') {
            throw new DomSelectorError(selector);
        }
        const ctx = this._resolveElement(context);
        return Array.from(ctx.querySelectorAll(selector));
    }

    create(tagName, attributes = {}, children = []) {
        if (!tagName || typeof tagName !== 'string') {
            throw new DomElementError("Tag name must be a valid non-empty string.");
        }
        const element = document.createElement(tagName);

        if (attributes && typeof attributes === 'object') {
            this._normalizeAttributes(element, attributes);
        }

        const childList = Array.isArray(children) ? children : [children];
        for (const child of childList) {
            if (child !== null && child !== undefined) {
                if (typeof child === 'string' || typeof child === 'number') {
                    element.appendChild(document.createTextNode(String(child)));
                } else if (child instanceof Node) {
                    element.appendChild(child);
                }
            }
        }

        return element;
    }

    remove(element) {
        const el = this._resolveElement(element);
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
        return this;
    }

    replace(oldElement, newElement) {
        const oldEl = this._resolveElement(oldElement);
        const newEl = this._resolveElement(newElement);
        if (oldEl.parentNode) {
            oldEl.parentNode.replaceChild(newEl, oldEl);
        }
        return this;
    }

    append(parent, child) {
        const parentEl = this._resolveElement(parent);
        const childEl = this._resolveElement(child);
        parentEl.appendChild(childEl);
        return this;
    }

    prepend(parent, child) {
        const parentEl = this._resolveElement(parent);
        const childEl = this._resolveElement(child);
        parentEl.insertBefore(childEl, parentEl.firstChild);
        return this;
    }

    before(referenceElement, newElement) {
        const refEl = this._resolveElement(referenceElement);
        const newEl = this._resolveElement(newElement);
        if (refEl.parentNode) {
            refEl.parentNode.insertBefore(newEl, refEl);
        }
        return this;
    }

    after(referenceElement, newElement) {
        const refEl = this._resolveElement(referenceElement);
        const newEl = this._resolveElement(newElement);
        if (refEl.parentNode) {
            refEl.parentNode.insertBefore(newEl, refEl.nextSibling);
        }
        return this;
    }

    empty(element) {
        const el = this._resolveElement(element);
        el.replaceChildren();
        return this;
    }

    text(element, value) {
        const el = this._resolveElement(element);
        if (value === undefined) {
            return el.textContent;
        }
        el.textContent = value !== null && value !== undefined ? String(value) : '';
        return this;
    }

    render(targetElement, newContent) {
        const target = this._resolveElement(targetElement);
        if (typeof newContent === 'string') {
            target.replaceChildren(this.fragment(newContent));
        } else if (newContent instanceof Node) {
            target.replaceChildren(newContent);
        } else if (Array.isArray(newContent)) {
            target.replaceChildren(...newContent.filter(item => item instanceof Node || typeof item === 'string'));
        } else {
            throw new DomElementError("Invalid content provided for rendering.");
        }
        return this;
    }

    attr(element, name, value) {
        const el = this._resolveElement(element);
        if (!name || typeof name !== 'string') {
            throw new DomElementError("Attribute name must be a valid string.");
        }
        if (value === undefined) {
            return el.getAttribute(name);
        }
        if (value === null) {
            el.removeAttribute(name);
        } else {
            el.setAttribute(name, value);
        }
        return this;
    }

    dataset(element, key, value) {
        const el = this._resolveElement(element);
        if (!key || typeof key !== 'string') {
            throw new DomElementError("Dataset key must be a valid string.");
        }
        if (value === undefined) {
            return el.dataset[key];
        }
        if (value === null) {
            delete el.dataset[key];
        } else {
            el.dataset[key] = value;
        }
        return this;
    }

    addClass(element, className) {
        const el = this._resolveElement(element);
        if (className && typeof className === 'string') {
            el.classList.add(...className.trim().split(/\s+/));
        }
        return this;
    }

    removeClass(element, className) {
        const el = this._resolveElement(element);
        if (className && typeof className === 'string') {
            el.classList.remove(...className.trim().split(/\s+/));
        }
        return this;
    }

    toggleClass(element, className, force) {
        const el = this._resolveElement(element);
        if (className && typeof className === 'string') {
            el.classList.toggle(className, force);
        }
        return this;
    }

    hasClass(element, className) {
        const el = this._resolveElement(element);
        if (!className || typeof className !== 'string') {
            return false;
        }
        return el.classList.contains(className);
    }

    contains(parent, child) {
        const parentEl = this._resolveElement(parent);
        const childEl = this._resolveElement(child);
        return parentEl.contains(childEl);
    }

    closest(element, selector) {
        const el = this._resolveElement(element);
        if (!selector || typeof selector !== 'string') {
            throw new DomSelectorError(selector);
        }
        return el.closest(selector);
    }

    matches(element, selector) {
        const el = this._resolveElement(element);
        if (!selector || typeof selector !== 'string') {
            throw new DomSelectorError(selector);
        }
        return el.matches(selector);
    }

    fragment(htmlString) {
        if (typeof htmlString !== 'string') {
            throw new DomElementError("Fragment content must be a valid HTML string.");
        }
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        return template.content.cloneNode(true);
    }
}