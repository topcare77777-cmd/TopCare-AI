/**
 * TOPCARE AI PLATFORM V2
 * Plugin Dependency Resolver
 *
 * Path:
 * assets/js/services/plugin/plugin.dependency.resolver.js
 */

export class PluginDependencyResolver {

    resolve(
        pluginManifest = {},
        registry = {}
    ) {

        return Object.freeze({
            plugin: pluginManifest,
            dependencies: registry
        });

    }

}


export default PluginDependencyResolver;
