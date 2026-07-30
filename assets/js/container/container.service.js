/**
 * file: assets/js/container/container.service.js
 */

import { ContainerBase } from './container.base.js';
import { ContainerManager } from './container.manager.js';

const engine = ContainerManager.initialize(new ContainerBase());

export const Container = Object.freeze({
    register(name, dependency, options) {
        engine.register(name, dependency, options);
        return this;
    },
    resolve(name) {
        return engine.resolve(name);
    },
    has(name) {
        return engine.has(name);
    },
    remove(name) {
        engine.remove(name);
        return this;
    },
    clear() {
        engine.clear();
        return this;
    },
    getAll() {
        return engine.getAll();
    }
});