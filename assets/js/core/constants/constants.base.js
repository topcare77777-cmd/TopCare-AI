/**
 * file: assets/js/core/constants/constants.base.js
 */

import { ConstantsInterface } from './constants.interface.js';
import * as Domains from './constants.types.js';

export class ConstantsBase extends ConstantsInterface {
    constructor() {
        super();
        this._domains = new Map();

        for (const [domainName, domainValues] of Object.entries(Domains)) {
            this._domains.set(domainName.toLowerCase(), Object.freeze(domainValues));
        }

        Object.seal(this);
    }

    _validateDomain(domain) {
        if (!domain || typeof domain !== 'string') {
            throw new TypeError("Constant domain must be a valid non-empty string.");
        }
        const normalized = domain.toLowerCase();
        if (!this._domains.has(normalized)) {
            throw new TypeError(`Constant domain "${domain}" does not exist.`);
        }
        return normalized;
    }

    _validateKey(key) {
        if (!key || typeof key !== 'string') {
            throw new TypeError("Constant key must be a valid non-empty string.");
        }
    }

    get(domain, key) {
        const normalizedDomain = this._validateDomain(domain);
        this._validateKey(key);

        const domainMap = this._domains.get(normalizedDomain);
        if (!(key in domainMap)) {
            return undefined;
        }
        return domainMap[key];
    }

    has(domain, key) {
        const normalizedDomain = this._validateDomain(domain);
        this._validateKey(key);

        const domainMap = this._domains.get(normalizedDomain);
        return key in domainMap;
    }

    getAll() {
        const result = {};
        for (const [domain, values] of this._domains.entries()) {
            result[domain] = values;
        }
        return Object.freeze(result);
    }
}