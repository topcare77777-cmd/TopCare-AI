/**
 * file: assets/js/core/dom/dom.service.js
 */

import { DomBase } from './dom.base.js';
import { DomManager } from './dom.manager.js';

const engine = DomManager.initialize(new DomBase());

export const DOM = Object.freeze({
    query(selector, context) {
        return engine.query(selector, context);
    },
    queryAll(selector, context) {
        return engine.queryAll(selector, context);
    },
    create(tagName, attributes, children) {
        return engine.create(tagName, attributes, children);
    },
    remove(element) {
        return engine.remove(element);
    },
    replace(oldElement, newElement) {
        return engine.replace(oldElement, newElement);
    },
    append(parent, child) {
        return engine.append(parent, child);
    },
    prepend(parent, child) {
        return engine.prepend(parent, child);
    },
    before(referenceElement, newElement) {
        return engine.before(referenceElement, newElement);
    },
    after(referenceElement, newElement) {
        return engine.after(referenceElement, newElement);
    },
    empty(element) {
        return engine.empty(element);
    },
    text(element, value) {
        return engine.text(element, value);
    },
    render(targetElement, newContent) {
        return engine.render(targetElement, newContent);
    },
    attr(element, name, value) {
        return engine.attr(element, name, value);
    },
    dataset(element, key, value) {
        return engine.dataset(element, key, value);
    },
    addClass(element, className) {
        return engine.addClass(element, className);
    },
    removeClass(element, className) {
        return engine.removeClass(element, className);
    },
    toggleClass(element, className, force) {
        return engine.toggleClass(element, className, force);
    },
    hasClass(element, className) {
        return engine.hasClass(element, className);
    },
    contains(parent, child) {
        return engine.contains(parent, child);
    },
    closest(element, selector) {
        return engine.closest(element, selector);
    },
    matches(element, selector) {
        return engine.matches(element, selector);
    },
    fragment(htmlString) {
        return engine.fragment(htmlString);
    }
});