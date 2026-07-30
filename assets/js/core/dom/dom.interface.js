/**
 * file: assets/js/core/dom/dom.interface.js
 */

export class DomInterface {
    query(selector, context) { throw new Error("Not implemented"); }
    queryAll(selector, context) { throw new Error("Not implemented"); }
    create(tagName, attributes, children) { throw new Error("Not implemented"); }
    remove(element) { throw new Error("Not implemented"); }
    replace(oldElement, newElement) { throw new Error("Not implemented"); }
    append(parent, child) { throw new Error("Not implemented"); }
    prepend(parent, child) { throw new Error("Not implemented"); }
    before(referenceElement, newElement) { throw new Error("Not implemented"); }
    after(referenceElement, newElement) { throw new Error("Not implemented"); }
    empty(element) { throw new Error("Not implemented"); }
    text(element, value) { throw new Error("Not implemented"); }
    render(targetElement, newContent) { throw new Error("Not implemented"); }
    attr(element, name, value) { throw new Error("Not implemented"); }
    dataset(element, key, value) { throw new Error("Not implemented"); }
    addClass(element, className) { throw new Error("Not implemented"); }
    removeClass(element, className) { throw new Error("Not implemented"); }
    toggleClass(element, className, force) { throw new Error("Not implemented"); }
    hasClass(element, className) { throw new Error("Not implemented"); }
    contains(parent, child) { throw new Error("Not implemented"); }
    closest(element, selector) { throw new Error("Not implemented"); }
    matches(element, selector) { throw new Error("Not implemented"); }
    fragment(htmlString) { throw new Error("Not implemented"); }
}