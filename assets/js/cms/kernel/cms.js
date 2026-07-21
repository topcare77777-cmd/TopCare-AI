/**
 * ==========================================================
 * TopCare AI CMS Framework
 * CMS Facade
 * ==========================================================
 *
 * File    : cms.js
 * Version : 2.0.0
 *
 * Purpose:
 * Public API Gateway for CMS Kernel Ecosystem.
 *
 * Architecture Reference:
 *
 * - docs/Kernel-Architecture.md
 * - docs/Kernel-API.md
 * - docs/Kernel-Sequence.md
 * - docs/Kernel-ADR.md
 *
 * Contract:
 *
 * - Facade Pattern
 * - Single Entry Point
 * - No Kernel Exposure
 * - No Direct Store Exposure
 * - No Direct EventBus Exposure
 * - Lifecycle Delegation Only
 * - Zero Business Logic
 *
 * ==========================================================
 */

"use strict";


import CMSException from "./cms-exception.js";


export default class CMS {


    static #instance = null;


    #kernel = null;



    /**
     * Create CMS Facade
     *
     * @param {Object} kernel
     */
    constructor(kernel) {


        if (!kernel) {

            throw new CMSException(
                "CMS_KERNEL_REQUIRED",
                "Kernel instance wajib tersedia."
            );

        }


        this.#kernel = kernel;

    }



    /**
     * Singleton factory
     *
     * @param {Object} kernel
     * @returns {CMS}
     */
    static create(kernel) {


        if (!CMS.#instance) {

            CMS.#instance = new CMS(kernel);

        }


        return CMS.#instance;

    }



    /**
     * Get active instance
     *
     * @returns {CMS|null}
     */
    static instance() {

        return CMS.#instance;

    }



    /**
     * Initialize lifecycle
     */
    async initialize() {

        await this.#kernel.initialize();

        return this;

    }



    /**
     * Boot lifecycle
     */
    async boot() {

        await this.#kernel.boot();

        return this;

    }



    /**
     * Mount lifecycle
     */
    async mount() {

        await this.#kernel.mount();

        return this;

    }



    /**
     * Destroy lifecycle
     */
    async destroy() {


        if (this.#kernel) {

            await this.#kernel.destroy();

        }


        CMS.#instance = null;


    }



    /**
     * Current kernel state
     */
    get state() {


        return this.#kernel.state;


    }



    /**
     * Kernel version
     */
    get version() {


        return this.#kernel.version ?? "2.0.0";


    }



    /**
     * Emit event
     *
     * @param {string} event
     * @param {*} payload
     */
    emit(
        event,
        payload = {}
    ) {


        return this.#kernel.events.emit(
            event,
            payload
        );

    }



    /**
     * Subscribe event
     */
    on(
        event,
        listener,
        options = {}
    ) {


        return this.#kernel.events.on(
            event,
            listener,
            options
        );

    }



    /**
     * Subscribe once
     */
    once(
        event,
        listener,
        options = {}
    ) {


        return this.#kernel.events.once(
            event,
            listener,
            options
        );

    }



    /**
     * Remove listener
     */
    off(
        event,
        listener
    ) {


        return this.#kernel.events.off(
            event,
            listener
        );

    }



    /**
     * Get listeners
     */
    listeners(event) {


        return this.#kernel.events.listeners(
            event
        );

    }



    /**
     * Store snapshot
     */
    snapshot() {


        return this.#kernel.store.snapshot();

    }



    /**
     * Read state
     */
    getState(path = null) {


        return this.#kernel.store.get(
            path
        );

    }



    /**
     * Update state
     */
    setState(
        path,
        value
    ) {


        return this.#kernel.store.set(
            path,
            value
        );

    }



    /**
     * Watch state
     */
    watch(
        path,
        callback
    ) {


        return this.#kernel.store.watch(
            path,
            callback
        );

    }



    /**
     * Remove state watcher
     */
    unwatch(
        id
    ) {


        return this.#kernel.store.unwatch(
            id
        );

    }



    /**
     * Resolve service
     */
    service(name) {


        return this.#kernel.services.get(
            name
        );

    }



    /**
     * Register service
     */
    registerService(
        name,
        service,
        options = {}
    ) {


        return this.#kernel.services.register(
            name,
            service,
            options
        );

    }



    /**
     * Register module
     */
    registerModule(module) {


        return this.#kernel.modules.register(
            module
        );

    }



    /**
     * Register plugin
     */
    registerPlugin(plugin) {


        return this.#kernel.plugins.register(
            plugin
        );

    }



    /**
     * Internal assertion
     */
    #assertKernelMethod(
        target,
        method
    ) {


        if (
            !target ||
            typeof target[method] !== "function"
        ) {

            throw new CMSException(
                "CMS_CONTRACT_ERROR",
                `Kernel contract method ${method} tidak tersedia.`
            );

        }

    }


}