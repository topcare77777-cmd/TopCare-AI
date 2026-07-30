/**
 * file: assets/js/endpoints/endpoint.service.js
 */

import { EndpointBase } from './endpoint.base.js';
import { EndpointManager } from './endpoint.manager.js';

const engine = EndpointManager.initialize(new EndpointBase());

export const Endpoints = Object.freeze({
    get(domain, key) {
        return engine.get(domain, key);
    },
    has(domain, key) {
        return engine.has(domain, key);
    },
    getDomain(domain) {
        return engine.getDomain(domain);
    },
    getAll() {
        return engine.getAll();
    }
});