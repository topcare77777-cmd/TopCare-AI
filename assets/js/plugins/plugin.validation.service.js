/**
 * file: assets/js/plugins/plugin.validation.service.js
 */

import { ManifestValidationResult, ManifestValidatorPipeline } from '../features/index.js';
import { PluginManifestValidator } from './plugin.manifest.validator.js';
import { PluginManifestRegistry } from './plugin.manifest.registry.js';

const pluginPipeline = new ManifestValidatorPipeline();

// Register plugin specific validation rules into pipeline
pluginPipeline.use(async (manifest, context) => {
    return PluginManifestValidator.validate(manifest, context.existingPlugins || {});
});

export const PluginValidationService = Object.freeze({
    async validate(manifest, context = {}) {
        const existingPlugins = PluginManifestRegistry.getAll();
        return await pluginPipeline.execute(manifest, { existingPlugins, ...context });
    },
    addValidatorStep(validatorFn) {
        return pluginPipeline.use(validatorFn);
    }
});