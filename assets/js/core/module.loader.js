/**
 * TopCare AI Platform V2.0.0
 * Module Loader
 * Path: assets/js/core/module.loader.js
 */
const ModuleLoader = {
    async load(path) {
        return await import(path);
    }
};

export default ModuleLoader;