/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Plugin Manager
 * ==========================================================
 *
 * File    : plugin-manager.js
 * Version : 2.0.0
 *
 * Architecture Reference:
 * - docs/Kernel-Architecture.md
 * - docs/Kernel-API.md
 * - docs/Kernel-Sequence.md
 * - docs/Kernel-ADR.md
 *
 * Responsibility:
 * - Plugin registration
 * - Plugin lifecycle control
 * - Plugin discovery
 * - Plugin isolation
 *
 * ==========================================================
 */

"use strict";

import CMSException from "./cms-exception.js";

import {
    PLUGIN_STATUS
} from "./constants.js";


export default class PluginManager {


    #plugins = new Map();



    /**
     * Register plugin
     *
     * @param {object} plugin
     * @returns {object}
     */
    register(plugin) {


        this.#validate(plugin);


        const name = plugin.name;



        if (this.#plugins.has(name)) {

            throw new CMSException(
                "PLUGIN_ALREADY_EXISTS",
                `Plugin "${name}" sudah terdaftar.`,
                {
                    plugin: name
                }
            );

        }



        const entry = {

            name,

            plugin,

            status: PLUGIN_STATUS.REGISTERED,

            metadata: Object.freeze({
                ...(plugin.metadata ?? {})
            }),

            registeredAt: Date.now()

        };



        this.#plugins.set(
            name,
            entry
        );


        return entry;

    }





    /**
     * Initialize plugin
     *
     * @param {string} name
     * @param {object} context
     */
    async initialize(name, context = {}) {


        const entry = this.resolve(name);



        if (!entry) {

            throw new CMSException(
                "PLUGIN_NOT_FOUND",
                `Plugin "${name}" tidak ditemukan.`,
                {
                    plugin: name
                }
            );

        }



        if (
            typeof entry.plugin.initialize === "function"
        ) {

            await entry.plugin.initialize(
                context
            );

        }



        entry.status =
            PLUGIN_STATUS.INITIALIZED;



        return entry;

    }





    /**
     * Enable plugin
     *
     * @param {string} name
     */
    async enable(name) {


        const entry = this.resolve(name);



        if (!entry) {

            throw new CMSException(
                "PLUGIN_NOT_FOUND",
                `Plugin "${name}" tidak ditemukan.`
            );

        }



        if (
            typeof entry.plugin.enable === "function"
        ) {

            await entry.plugin.enable();

        }



        entry.status =
            PLUGIN_STATUS.ENABLED;



        return entry;

    }





    /**
     * Disable plugin
     *
     * @param {string} name
     */
    async disable(name) {


        const entry = this.resolve(name);



        if (!entry) {

            return false;

        }



        if (
            typeof entry.plugin.disable === "function"
        ) {

            await entry.plugin.disable();

        }



        entry.status =
            PLUGIN_STATUS.DISABLED;



        return true;

    }





    /**
     * Remove plugin
     *
     * @param {string} name
     */
    async unregister(name) {


        const entry =
            this.resolve(name);



        if (!entry) {

            return false;

        }



        await this.#destroyPlugin(
            entry
        );



        this.#plugins.delete(
            name
        );



        return true;

    }





    /**
     * Resolve plugin
     *
     * @param {string} name
     */
    resolve(name) {

        return (
            this.#plugins.get(name)
            ?? null
        );

    }





    /**
     * Check plugin
     *
     * @param {string} name
     */
    has(name) {

        return this.#plugins.has(name);

    }





    /**
     * List plugins
     */
    list() {

        return [
            ...this.#plugins.values()
        ];

    }





    /**
     * Count plugins
     */
    count() {

        return this.#plugins.size;

    }





    /**
     * Update status
     */
    status(name) {

        return (
            this.#plugins.get(name)?.status
            ?? null
        );

    }





    /**
     * Destroy all plugins
     */
    async destroy() {


        for (const entry of this.#plugins.values()) {

            await this.#destroyPlugin(
                entry
            );

        }



        this.#plugins.clear();

    }





    /**
     * Internal destroy handler
     *
     * @private
     */
    async #destroyPlugin(entry) {


        try {


            if (
                typeof entry.plugin.destroy === "function"
            ) {

                await entry.plugin.destroy();

            }


            entry.status =
                PLUGIN_STATUS.DESTROYED;



        } catch (error) {


            throw CMSException.from(
                error,
                "PLUGIN_DESTROY_FAILED"
            );


        }

    }





    /**
     * Validate plugin contract
     *
     * @private
     */
    #validate(plugin) {


        if (
            !plugin ||
            typeof plugin !== "object"
        ) {

            throw new CMSException(
                "PLUGIN_INVALID",
                "Plugin harus berupa object."
            );

        }




        if (
            typeof plugin.name !== "string" ||
            !plugin.name.trim()
        ) {

            throw new CMSException(
                "PLUGIN_NAME_INVALID",
                "Plugin harus memiliki nama valid."
            );

        }




        if (
            !plugin.metadata
        ) {

            plugin.metadata = {};

        }


    }


}