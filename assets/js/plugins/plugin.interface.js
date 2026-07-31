/**
 * file: assets/js/plugins/plugin.interface.js
 */

export class PluginInterface {
    async install(context) { throw new Error("Not implemented"); }
    async load(context) { throw new Error("Not implemented"); }
    async initialize(context) { throw new Error("Not implemented"); }
    async activate(context) { throw new Error("Not implemented"); }
    async deactivate(context) { throw new Error("Not implemented"); }
    async unload(context) { throw new Error("Not implemented"); }
    async dispose(context) { throw new Error("Not implemented"); }
}