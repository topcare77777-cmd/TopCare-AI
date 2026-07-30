/**
 * file: assets/js/core/dom/dom.errors.js
 */

export class DomError extends Error {
    constructor(message) {
        super(`[DomRuntime] ${message}`);
        this.name = 'DomError';
    }
}

export class DomElementError extends DomError {
    constructor(message) {
        super(`Element Error: ${message}`);
        this.name = 'DomElementError';
    }
}

export class DomSelectorError extends DomError {
    constructor(selector) {
        super(`Invalid or missing selector: "${selector}"`);
        this.name = 'DomSelectorError';
    }
}