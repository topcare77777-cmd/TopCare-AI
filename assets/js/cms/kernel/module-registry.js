/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Module Registry
 * ==========================================================
 *
 * File    : module-registry.js
 * Version : 2.0.0
 *
 * Architecture Reference:
 * - docs/Kernel-Architecture.md
 * - docs/Kernel-API.md
 * - docs/Kernel-Sequence.md
 * - docs/Kernel-ADR.md
 *
 * Responsibility:
 * - Module registration
 * - Module discovery
 * - Lifecycle tracking
 * - Metadata validation
 *
 * ==========================================================
 */

"use strict";

import CMSException from "./cms-exception.js";
import {
    MODULE_STATUS
} from "./constants.js";


export default class ModuleRegistry {

    #modules = new Map();


    /**
     * Register module
     *
     * @param {object} module
     * @returns {object}
     */
    register(module) {

        this.#validate(module);


        const name = module.name;


        if (this.#modules.has(name)) {

            throw new CMSException(
                "MODULE_ALREADY_EXISTS",
                `Module "${name}" sudah terdaftar.`,
                {
                    module: name
                }
            );

        }


        const entry = {

            name,

            module,

            status: MODULE_STATUS.REGISTERED,

            metadata: Object.freeze({
                ...module.metadata
            }),

            registeredAt: Date.now()

        };


        this.#modules.set(
            name,
            entry
        );


        return entry;

    }



    /**
     * Remove module
     *
     * @param {string} name
     * @returns {boolean}
     */
    unregister(name) {

        if (!this.#modules.has(name)) {

            return false;

        }


        this.#modules.delete(name);


        return true;

    }



    /**
     * Resolve module
     *
     * @param {string} name
     * @returns {object|null}
     */
    resolve(name) {

        return (
            this.#modules.get(name)
            ?? null
        );

    }



    /**
     * Check module existence
     *
     * @param {string} name
     * @returns {boolean}
     */
    has(name) {

        return this.#modules.has(name);

    }



    /**
     * List modules
     *
     * @returns {Array}
     */
    list() {

        return [
            ...this.#modules.values()
        ];

    }



    /**
     * Count modules
     *
     * @returns {number}
     */
    count() {

        return this.#modules.size;

    }



    /**
     * Update lifecycle status
     *
     * @param {string} name
     * @param {string} status
     */
    setStatus(name, status) {


        const entry = this.#modules.get(name);


        if (!entry) {

            throw new CMSException(
                "MODULE_NOT_FOUND",
                `Module "${name}" tidak ditemukan.`,
                {
                    module: name
                }
            );

        }


        entry.status = status;


        return entry;

    }



    /**
     * Get module status
     *
     * @param {string} name
     */
    status(name) {

        return (
            this.#modules.get(name)?.status
            ?? null
        );

    }



    /**
     * Clear registry
     */
    clear() {

        this.#modules.clear();


        return this;

    }



    /**
     * Destroy registry
     */
    destroy() {

        this.clear();

    }



    /**
     * Validate module contract
     *
     * @private
     */
    #validate(module) {


        if (
            !module ||
            typeof module !== "object"
        ) {

            throw new CMSException(
                "MODULE_INVALID",
                "Module harus berupa object."
            );

        }



        if (
            typeof module.name !== "string" ||
            !module.name.trim()
        ) {

            throw new CMSException(
                "MODULE_NAME_INVALID",
                "Module harus memiliki nama valid."
            );

        }



        if (
            typeof module.mount !== "function"
            &&
            typeof module.initialize !== "function"
        ) {

            throw new CMSException(
                "MODULE_CONTRACT_INVALID",
                "Module minimal memiliki lifecycle initialize atau mount.",
                {
                    module: module.name
                }
            );

        }

    }

}