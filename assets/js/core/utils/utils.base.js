/**
 * file: assets/js/core/utils/utils.base.js
 */

import { UtilsInterface } from './utils.interface.js';

export class UtilsBase extends UtilsInterface {
    constructor() {
        super();
        Object.seal(this);
    }

    clone(value) {
        if (value === null || typeof value !== 'object') {
            return value;
        }
        if (value instanceof Date) {
            return new Date(value.getTime());
        }
        if (value instanceof RegExp) {
            return new RegExp(value);
        }
        if (Array.isArray(value)) {
            return value.map(item => this.clone(item));
        }
        const clonedObj = Object.create(Object.getPrototypeOf(value));
        for (const key of Reflect.ownKeys(value)) {
            clonedObj[key] = this.clone(value[key]);
        }
        return clonedObj;
    }

    merge(target, source) {
        if (!this.isObject(target) || !this.isObject(source)) {
            return source;
        }
        const output = this.clone(target);
        for (const key of Object.keys(source)) {
            if (this.isObject(source[key]) && this.isObject(output[key])) {
                output[key] = this.merge(output[key], source[key]);
            } else {
                output[key] = this.clone(source[key]);
            }
        }
        return output;
    }

    freeze(value) {
        if (value && (typeof value === 'object' || typeof value === 'function') && !Object.isFrozen(value)) {
            Object.freeze(value);
            Object.getOwnPropertyNames(value).forEach(prop => {
                this.freeze(value[prop]);
            });
        }
        return value;
    }

    isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
        if (value instanceof Map || value instanceof Set) return value.size === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }

    unique(array) {
        if (!Array.isArray(array)) return [];
        return Array.from(new Set(array));
    }

    chunk(array, size) {
        if (!Array.isArray(array) || size <= 0) return [];
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    compact(array) {
        if (!Array.isArray(array)) return [];
        return array.filter(Boolean);
    }

    capitalize(str) {
        if (!this.isString(str) || str.length === 0) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    trim(str) {
        if (!this.isString(str)) return '';
        return str.trim();
    }

    camelCase(str) {
        if (!this.isString(str)) return '';
        return str
            .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
            .replace(/^(.)/, c => c.toLowerCase());
    }

    kebabCase(str) {
        if (!this.isString(str)) return '';
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    pascalCase(str) {
        if (!this.isString(str)) return '';
        const camel = this.camelCase(str);
        return camel.charAt(0).toUpperCase() + camel.slice(1);
    }

    clamp(value, min, max) {
        if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
            return 0;
        }
        return Math.min(Math.max(value, min), max);
    }

    random(min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') return 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    isInteger(value) {
        return Number.isInteger(value);
    }

    isString(value) {
        return typeof value === 'string';
    }

    isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    isFunction(value) {
        return typeof value === 'function';
    }

    isArray(value) {
        return Array.isArray(value);
    }

    isBoolean(value) {
        return typeof value === 'boolean';
    }

    isNumber(value) {
        return typeof value === 'number' && !Number.isNaN(value);
    }

    isUndefined(value) {
        return value === undefined;
    }

    isNull(value) {
        return value === null;
    }
}