/**
 * TopCare AI
 * Module Loader
 * Path: assets/js/core/module-loader.js
 */

class ModuleLoader {
    constructor() {
        this.loaded = [];
    }

    async load(name, module) {
        if (this.loaded.includes(name)) {
            return;
        }

        if (name === 'hero') {
            console.log('[ModuleLoader] Loading HeroModule...');
        } else {
            console.log(`[ModuleLoader] Loading ${name}...`);
        }

        if (module && typeof module.init === "function") {
            await module.init();
        }

        this.loaded.push(name);
        console.log("Module loaded:", name);
    }
}

export default new ModuleLoader();