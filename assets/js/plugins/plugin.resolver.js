/**
 * file: assets/js/plugins/plugin.resolver.js
 */

import { Core } from '../core/index.js';
import { PluginManifestRegistry } from './plugin.manifest.registry.js';
import { PluginDependencyGraphRegistry } from './plugin.dependency.graph.js';
import { PluginDependencyMissingException, PluginCircularDependencyException } from './plugin.exceptions.js';
import { DependencyGraphCycleException } from '../features/dependency.graph.types.js';
import { PluginSemVer } from './plugin.semver.js';

export class PluginResolver {
    static resolveDependencyOrder(pluginId) {
        const manifests = PluginManifestRegistry.getAll();
        const targetManifest = manifests[pluginId];
        if (!targetManifest) {
            throw new Error(`Plugin manifest not found for ID: ${pluginId}`);
        }

        const dependencies = targetManifest.dependencies || [];
        const isArrayDeps = Array.isArray(dependencies);
        const depEntries = isArrayDeps ? dependencies.map(d => [d, '*']) : Object.entries(dependencies);

        for (const [depKey, rangeSpec] of depEntries) {
            const actualDepId = isArrayDeps ? depKey : depKey;
            const resolvedManifest = manifests[actualDepId];

            if (!resolvedManifest) {
                // Support optional or weak dependencies if specified in meta/flags
                const isOptional = targetManifest.optionalDependencies && targetManifest.optionalDependencies.includes(actualDepId);
                if (isOptional) {
                    Core.Logger.warn(`Optional dependency '${actualDepId}' missing for plugin '${pluginId}'. Skipping.`);
                    continue;
                }
                throw new PluginDependencyMissingException(pluginId, actualDepId);
            }

            if (rangeSpec && rangeSpec !== '*') {
                if (!PluginSemVer.satisfies(resolvedManifest.version, rangeSpec)) {
                    throw new Error(`Plugin '${pluginId}' requires dependency '${actualDepId}' matching range '${rangeSpec}', but found version '${resolvedManifest.version}'.`);
                }
            }
        }

        try {
            return PluginDependencyGraphRegistry.resolveOrder(pluginId);
        } catch (err) {
            if (err instanceof DependencyGraphCycleException) {
                throw new PluginCircularDependencyException(pluginId, err.path || [pluginId]);
            }
            throw err;
        }
    }
}