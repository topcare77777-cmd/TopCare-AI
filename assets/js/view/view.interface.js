/**
 * file: assets/js/view/view.interface.js
 */

export class ViewInterface {
    register(name, component, options) { throw new Error("Not implemented"); }
    resolve(name) { throw new Error("Not implemented"); }
    has(name) { throw new Error("Not implemented"); }
    mount(name, container, data) { throw new Error("Not implemented"); }
}