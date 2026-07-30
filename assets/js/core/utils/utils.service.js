/**
 * file: assets/js/core/utils/utils.service.js
 */

import { UtilsBase } from './utils.base.js';
import { UtilsManager } from './utils.manager.js';

const engine = UtilsManager.initialize(new UtilsBase());

export const Utils = Object.freeze({
    clone(value) { return engine.clone(value); },
    merge(target, source) { return engine.merge(target, source); },
    freeze(value) { return engine.freeze(value); },
    isEmpty(value) { return engine.isEmpty(value); },
    unique(array) { return engine.unique(array); },
    chunk(array, size) { return engine.chunk(array, size); },
    compact(array) { return engine.compact(array); },
    capitalize(str) { return engine.capitalize(str); },
    trim(str) { return engine.trim(str); },
    camelCase(str) { return engine.camelCase(str); },
    kebabCase(str) { return engine.kebabCase(str); },
    pascalCase(str) { return engine.pascalCase(str); },
    clamp(value, min, max) { return engine.clamp(value, min, max); },
    random(min, max) { return engine.random(min, max); },
    isInteger(value) { return engine.isInteger(value); },
    isString(value) { return engine.isString(value); },
    isObject(value) { return engine.isObject(value); },
    isFunction(value) { return engine.isFunction(value); },
    isArray(value) { return engine.isArray(value); },
    isBoolean(value) { return engine.isBoolean(value); },
    isNumber(value) { return engine.isNumber(value); },
    isUndefined(value) { return engine.isUndefined(value); },
    isNull(value) { return engine.isNull(value); }
});