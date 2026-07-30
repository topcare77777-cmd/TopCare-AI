/**
 * file: assets/js/endpoints/endpoint.base.js
 */

import { Core } from '../core/index.js';
import { EndpointInterface } from './endpoint.interface.js';
import { ENDPOINTS } from './endpoint.types.js';

export class EndpointBase extends EndpointInterface {
    constructor() {
        super();
        this._registry = Core.Utils.freeze(JSON.parse(JSON.stringify(ENDPOINTS)));
        Object.seal(this);
    }

    _validateDomain(domain) {
        if (!domain || typeof domain !== 'string') {
            throw new TypeError("Endpoint domain must be a valid non-empty string.");
        }
        const normalized = domain.toUpperCase();
        if (!Object.prototype.hasOwnProperty.call(this._registry, normalized)) {
            throw new Error(`Endpoint domain not found: ${domain}`);
        }
        return normalized;
    }

    get(domain, key) {
        const normDomain = this._validateDomain(domain);
        if (!key || typeof key !== 'string') {
            throw new TypeError("Endpoint key must be a valid non-empty string.");
        }
        const normKey = key.toUpperCase();
        const domainObj = this._registry[normDomain];

        if (!Object.prototype.hasOwnProperty.call(domainObj, normKey)) {
            throw new Error(`Endpoint key '${key}' not found in domain '${domain}'`);
        }

        return domainObj[normKey];
    }

    has(domain, key) {
        try {
            if (!domain || typeof domain !== 'string' || !key || typeof key !== 'string') {
                return false;
            }
            const normDomain = domain.toUpperCase();
            const normKey = key.toUpperCase();
            return Boolean(
                this._registry[normDomain] &&
                Object.prototype.hasOwnProperty.call(this._registry[normDomain], normKey)
            );
        } catch (e) {
            return false;
        }
    }

    getDomain(domain) {
        const normDomain = this._validateDomain(domain);
        return Core.Utils.clone(this._registry[normDomain]);
    }

    getAll() {
        return Core.Utils.clone(this._registry);
    }
}