/**
 * file: assets/js/plugins/plugin.manifest.validator.js
 */

import { ManifestValidationResult, SemVerParser } from '../features/index.js';
import { PLUGIN_VALIDATION_ERROR_CODES } from './plugin.manifest.types.js';

export class PluginManifestValidator {
    static validate(manifest, existingPlugins = {}) {
        const result = new ManifestValidationResult();

        if (!manifest || typeof manifest !== 'object') {
            result.addError(PLUGIN_VALIDATION_ERROR_CODES.REQUIRED_FIELD, 'manifest', manifest, 'Plugin manifest must be a valid object.');
            return result;
        }

        const requiredStringFields = ['id', 'name', 'version'];
        for (const field of requiredStringFields) {
            if (!(field in manifest)) {
                result.addError(PLUGIN_VALIDATION_ERROR_CODES.REQUIRED_FIELD, field, undefined, `Required field '${field}' is missing in plugin manifest.`);
            } else if (typeof manifest[field] !== 'string') {
                result.addError(PLUGIN_VALIDATION_ERROR_CODES.INVALID_TYPE, field, manifest[field], `Field '${field}' must be a string.`);
            } else if (manifest[field].trim() === '') {
                result.addError(PLUGIN_VALIDATION_ERROR_CODES.EMPTY_FIELD, field, manifest[field], `Field '${field}' cannot be empty.`);
            }
        }

        if (!('loader' in manifest)) {
            result.addError(PLUGIN_VALIDATION_ERROR_CODES.REQUIRED_FIELD, 'loader', undefined, "Required field 'loader' is missing in plugin manifest.");
        } else if (typeof manifest.loader !== 'function') {
            result.addError(PLUGIN_VALIDATION_ERROR_CODES.INVALID_TYPE, 'loader', manifest.loader, "Field 'loader' must be a function.");
        }

        if (manifest.id && existingPlugins[manifest.id]) {
            result.addError(PLUGIN_VALIDATION_ERROR_CODES.DUPLICATE_PLUGIN_ID, 'id', manifest.id, `Plugin ID '${manifest.id}' is already registered.`);
        }

        if (manifest.version && typeof manifest.version === 'string') {
            if (!SemVerParser.isValid(manifest.version)) {
                result.addError(PLUGIN_VALIDATION_ERROR_CODES.INVALID_SEMVER, 'version', manifest.version, `Invalid SemVer format for plugin version '${manifest.version}'.`);
            }
        }

        if ('dependencies' in manifest) {
            if (!Array.isArray(manifest.dependencies)) {
                result.addError(PLUGIN_VALIDATION_ERROR_CODES.INVALID_TYPE, 'dependencies', manifest.dependencies, "Field 'dependencies' must be an array.");
            } else {
                const depSet = new Set();
                for (const dep of manifest.dependencies) {
                    if (typeof dep === 'string') {
                        if (depSet.has(dep)) {
                            result.addError(PLUGIN_VALIDATION_ERROR_CODES.DUPLICATE_DEPENDENCY, 'dependencies', dep, `Duplicate dependency '${dep}' detected in plugin.`);
                        } else {
                            depSet.add(dep);
                        }
                    }
                }
            }
        }

        if ('permissions' in manifest && (typeof manifest.permissions !== 'object' || manifest.permissions === null || Array.isArray(manifest.permissions))) {
            result.addError(PLUGIN_VALIDATION_ERROR_CODES.INVALID_TYPE, 'permissions', manifest.permissions, "Field 'permissions' must be an object.");
        }

        if ('capabilities' in manifest && !Array.isArray(manifest.capabilities)) {
            result.addError(PLUGIN_VALIDATION_ERROR_CODES.INVALID_TYPE, 'capabilities', manifest.capabilities, "Field 'capabilities' must be an array.");
        }

        if ('hooks' in manifest && (typeof manifest.hooks !== 'object' || manifest.hooks === null || Array.isArray(manifest.hooks))) {
            result.addError(PLUGIN_VALIDATION_ERROR_CODES.INVALID_TYPE, 'hooks', manifest.hooks, "Field 'hooks' must be an object.");
        }

        return result;
    }
}