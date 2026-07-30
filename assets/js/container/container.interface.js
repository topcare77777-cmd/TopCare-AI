/**
 * file: assets/js/container/container.interface.js
 */

export class ContainerInterface {
    register(name, dependency, options) {
        throw new Error("Not implemented");
    }

    resolve(name) {
        throw new Error("Not implemented");
    }

    has(name) {
        throw new Error("Not implemented");
    }

    remove(name) {
        throw new Error("Not implemented");
    }

    clear() {
        throw new Error("Not implemented");
    }

    getAll() {
        throw new Error("Not implemented");
    }
}