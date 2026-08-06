/**
 * file: assets/js/features/manifest.validation.result.js
 * Version: 131.0.0
 * Status: APPROVED COMPATIBILITY CONTRACT
 * SRP: Feature Manifest Validation Result DTO
 */

export class ManifestValidationResult {
    constructor(valid = true, errors = [], metadata = {}) {
        this.valid = Boolean(valid);
        this.errors = Array.isArray(errors) ? errors : [];
        this.metadata = metadata && typeof metadata === 'object'
            ? metadata
            : {};

        Object.freeze(this.errors);
        Object.freeze(this.metadata);
        Object.freeze(this);
    }

    static success(metadata = {}) {
        return new ManifestValidationResult(true, [], metadata);
    }

    static failure(errors = [], metadata = {}) {
        return new ManifestValidationResult(false, errors, metadata);
    }

    isValid() {
        return this.valid;
    }
}

export default ManifestValidationResult;