/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Service Container
 * ==========================================================
 *
 * File    : service-container.js
 * Version : 2.0.0
 *
 * Architecture References:
 * - docs/Kernel-Architecture.md   (LOCKED)
 * - docs/Kernel-API.md            (LOCKED)
 * - docs/Kernel-Sequence.md       (LOCKED)
 * - docs/Kernel-ADR.md            (LOCKED)
 *
 * Responsibility:
 * - Dependency Injection Container
 * - Service Lifecycle Management
 * - Singleton / Transient Resolution
 *
 * ==========================================================
 */

"use strict";

import CMSException from "./cms-exception.js";


export default class ServiceContainer {


    #services = new Map();

    #instances = new Map();

    #resolving = new Set();


    /**
     * Register service
     *
     * @param {string} name
     * @param {Function|Object} definition
     * @param {Object} options
     *
     * @returns {ServiceContainer}
     */
    register(
        name,
        definition,
        options = {}
    ) {

        this.#validateName(name);

        if (
            typeof definition !== "function" &&
            (
                typeof definition !== "object" ||
                definition === null
            )
        ) {

            throw new CMSException(
                "SERVICE_INVALID",
                "Service definition harus berupa function atau object.",
                {
                    name
                }
            );

        }


        const metadata = Object.freeze({

            name,

            definition,

            singleton:
                options.singleton !== false,

            factory:
                Boolean(options.factory),

            dependencies:
                Object.freeze(
                    [
                        ...(options.dependencies ?? [])
                    ]
                )

        });


        this.#services.set(
            name,
            metadata
        );


        return this;

    }


    /**
     * Register singleton service
     *
     * @param {string} name
     * @param {Function|Object} definition
     */
    singleton(
        name,
        definition,
        options = {}
    ) {

        return this.register(
            name,
            definition,
            {
                ...options,
                singleton: true
            }
        );

    }


    /**
     * Register transient service
     *
     * @param {string} name
     * @param {Function} definition
     */
    transient(
        name,
        definition,
        options = {}
    ) {

        return this.register(
            name,
            definition,
            {
                ...options,
                singleton: false
            }
        );

    }


    /**
     * Resolve service
     *
     * @param {string} name
     *
     * @returns {*}
     */
    resolve(name) {

        this.#validateName(name);


        const service =
            this.#services.get(name);


        if (!service) {

            throw new CMSException(
                "SERVICE_NOT_FOUND",
                `Service '${name}' tidak ditemukan.`,
                {
                    name
                }
            );

        }


        if (
            service.singleton &&
            this.#instances.has(name)
        ) {

            return this.#instances.get(name);

        }


        if (
            this.#resolving.has(name)
        ) {

            throw new CMSException(
                "SERVICE_CIRCULAR_DEPENDENCY",
                `Circular dependency pada service '${name}'.`,
                {
                    name
                }
            );

        }


        this.#resolving.add(name);


        try {


            const dependencies =
                service.dependencies.map(
                    dependency =>
                        this.resolve(dependency)
                );


            const instance =
                this.#create(
                    service,
                    dependencies
                );


            if (
                service.singleton
            ) {

                this.#instances.set(
                    name,
                    instance
                );

            }


            return instance;


        }
        finally {

            this.#resolving.delete(name);

        }


    }



    /**
     * Check service exists
     *
     * @param {string} name
     *
     * @returns {boolean}
     */
    has(name) {

        return this.#services.has(name);

    }



    /**
     * Remove service
     *
     * @param {string} name
     */
    remove(name) {

        this.#services.delete(name);

        this.#destroyInstance(name);

        return this;

    }



    /**
     * List registered services
     *
     * @returns {Array}
     */
    list() {

        return [
            ...this.#services.keys()
        ];

    }



    /**
     * Total service
     *
     * @returns {number}
     */
    count() {

        return this.#services.size;

    }



    /**
     * Destroy container
     */
    destroy() {


        for (
            const name of this.#instances.keys()
        ) {

            this.#destroyInstance(name);

        }


        this.#services.clear();

        this.#instances.clear();

        this.#resolving.clear();


    }



    /**
     * Create instance
     *
     * @private
     */
    #create(
        service,
        dependencies
    ) {


        if (
            service.factory
        ) {

            return service.definition(
                ...dependencies
            );

        }



        if (
            typeof service.definition === "function"
        ) {

            return new service.definition(
                ...dependencies
            );

        }



        return service.definition;


    }



    /**
     * Destroy instance
     *
     * @private
     */
    #destroyInstance(name) {


        const instance =
            this.#instances.get(name);


        if (!instance) {
            return;
        }


        if (
            typeof instance.destroy === "function"
        ) {

            instance.destroy();

        }


        this.#instances.delete(name);


    }



    /**
     * Validate service name
     *
     * @private
     */
    #validateName(name) {


        if (
            typeof name !== "string" ||
            !name.trim()
        ) {

            throw new CMSException(
                "SERVICE_NAME_INVALID",
                "Nama service harus berupa string.",
                {
                    name
                }
            );

        }

    }


}