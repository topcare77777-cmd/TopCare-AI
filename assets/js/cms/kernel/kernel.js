/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Orchestrator
 * ==========================================================
 *
 * File    : kernel.js
 * Version : 1.0.0
 *
 * Purpose:
 * Central lifecycle orchestrator for CMS Kernel.
 *
 * Architecture Reference:
 *
 * docs/Kernel-Architecture.md
 * docs/Kernel-API.md
 * docs/Kernel-Sequence.md
 * docs/Kernel-ADR.md
 *
 * Principles:
 *
 * - Dependency Injection
 * - Deterministic Lifecycle
 * - Zero Global State
 * - Fault Isolation
 * - Single Responsibility
 *
 * ==========================================================
 */

"use strict";


import CMSException from "./cms-exception.js";

import EventBus from "./event-bus.js";
import Store from "./store.js";
import ServiceContainer from "./service-container.js";
import ModuleRegistry from "./module-registry.js";
import PluginManager from "./plugin-manager.js";


export default class Kernel {


    #events;

    #store;

    #services;

    #modules;

    #plugins;


    #state = "CREATED";



    /**
     * Kernel constructor
     *
     * @param {Object} options
     */
    constructor(options = {}) {


        this.#events =
            options.events ??
            new EventBus();


        this.#store =
            options.store ??
            new Store();


        this.#services =
            options.services ??
            new ServiceContainer();


        this.#modules =
            options.modules ??
            new ModuleRegistry();


        this.#plugins =
            options.plugins ??
            new PluginManager();



    }



    /**
     * Initialize Kernel
     *
     * Prepare internal dependencies.
     *
     * @returns {Promise<Kernel>}
     */
    async initialize() {


        this.#assertState(
            "CREATED"
        );


        this.#state =
            "INITIALIZING";


        await this.#plugins.initialize?.();


        this.#state =
            "INITIALIZED";


        return this;


    }



    /**
     * Boot Kernel
     *
     * Register runtime services,
     * modules and plugins.
     *
     * @returns {Promise<Kernel>}
     */
    async boot() {


        this.#assertState(
            "INITIALIZED"
        );


        this.#state =
            "BOOTING";


        await this.#services.boot?.();


        await this.#modules.boot?.();


        await this.#plugins.boot?.();



        this.#state =
            "BOOTED";


        return this;


    }



    /**
     * Mount Kernel runtime
     *
     * @returns {Promise<Kernel>}
     */
    async mount() {


        this.#assertState(
            "BOOTED"
        );


        this.#state =
            "MOUNTING";


        await this.#modules.mount?.();


        await this.#plugins.mount?.();



        this.#state =
            "RUNNING";


        return this;


    }



    /**
     * Destroy Kernel
     *
     * Cleanup resources.
     *
     * @returns {Promise<void>}
     */
    async destroy() {


        if (
            this.#state === "DESTROYED"
        ) {

            return;

        }



        this.#state =
            "DESTROYING";



        await this.#plugins.destroy?.();


        await this.#modules.destroy?.();


        this.#events.clear();


        this.#state =
            "DESTROYED";


    }




    /**
     * Kernel event bus
     */
    get events() {


        return this.#events;


    }



    /**
     * Kernel store
     */
    get store() {


        return this.#store;


    }



    /**
     * Service container
     */
    get services() {


        return this.#services;


    }



    /**
     * Module registry
     */
    get modules() {


        return this.#modules;


    }



    /**
     * Plugin manager
     */
    get plugins() {


        return this.#plugins;


    }



    /**
     * Current lifecycle state
     */
    get state() {


        return this.#state;


    }



    /**
     * Kernel health check
     *
     * @returns {Object}
     */
    health() {


        return {

            state:
                this.#state,

            services:
                this.#services.count?.() ?? 0,

            modules:
                this.#modules.count?.() ?? 0,

            plugins:
                this.#plugins.count?.() ?? 0,

            events:
                this.#events.count?.() ?? 0

        };


    }



    /**
     * Validate lifecycle state
     */
    #assertState(expected) {


        if (
            this.#state !== expected
        ) {


            throw new CMSException(
                "KERNEL_INVALID_STATE",
                `Kernel state harus ${expected}.`,
                {

                    current:
                        this.#state,

                    expected

                }
            );


        }


    }


}