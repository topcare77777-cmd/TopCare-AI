/**
 * file: assets/js/runtime/application.entry.manager.js
 * Version: 131.1.0
 * Status: RESTORED
 * SRP: Application Entry Lifecycle Manager
 */

export class ApplicationEntryManager {

    static #instance = null;

    static initialize(entry) {

        if (!ApplicationEntryManager.#instance) {
            ApplicationEntryManager.#instance =
                new ApplicationEntryManager();
        }

        if (entry) {
            ApplicationEntryManager.#instance.register(entry);
        }

        return ApplicationEntryManager.#instance;
    }

    constructor() {

        this._entry = null;
        this._initialized = false;

        Object.seal(this);
    }

    register(entry) {

        if (!entry) {
            throw new TypeError(
                "Application entry is required."
            );
        }

        this._entry = entry;

        return this;
    }

    async bootstrap(context = {}) {

        if (this._initialized) {
            return this._entry;
        }

        if (
            this._entry &&
            typeof this._entry.bootstrap === "function"
        ) {
            await this._entry.bootstrap(context);
        } else if (
            this._entry &&
            typeof this._entry.initialize === "function"
        ) {
            await this._entry.initialize(context);
        }

        this._initialized = true;

        return this._entry;
    }

    isBootstrapped() {
        return this._initialized;
    }

    async start(context = {}) {

        if (
            this._entry &&
            typeof this._entry.start === "function"
        ) {
            return await this._entry.start(context);
        }

        return null;
    }

    async stop() {

        if (
            this._entry &&
            typeof this._entry.stop === "function"
        ) {
            await this._entry.stop();
        }
    }

    async destroy() {

        if (
            this._entry &&
            typeof this._entry.destroy === "function"
        ) {
            await this._entry.destroy();
        }

        this._entry = null;
        this._initialized = false;
    }

    getEntry() {
        return this._entry;
    }

    isInitialized() {
        return this._initialized;
    }
}

export const applicationEntryManager =
    ApplicationEntryManager.initialize();

export default applicationEntryManager;