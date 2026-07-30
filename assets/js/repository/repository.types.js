/**
 * file: assets/js/repository/repository.types.js
 */

export const REPOSITORY_EVENTS = Object.freeze({
    REQUEST: 'repository.request',
    SUCCESS: 'repository.success',
    ERROR: 'repository.error'
});

export const PROVIDER_TYPES = Object.freeze({
    MOCK: 'mock',
    HTTP: 'http'
});