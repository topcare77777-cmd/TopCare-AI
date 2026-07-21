/**
 * ==========================================================
 * TopCare AI
 * CMS Kernel Engine
 * ==========================================================
 *
 * File    : cms.js
 * Module  : CMS Core
 * Version : 1.0.0
 *
 * Features:
 * - Singleton Kernel
 * - Module Registry
 * - Service Container
 * - Plugin Manager
 * - Event Bus
 * - Lifecycle Manager
 * - Config Manager
 *
 * ==========================================================
 */

"use strict";


class CMSKernel {


    /**
     * Singleton instance
     */
    static #instance = null;


    /**
     * Internal configuration
     */
    #config = {};


    /**
     * Registered modules
     */
    #modules = new Map();


    /**
     * Registered services
     */
    #services = new Map();


    /**
     * Registered plugins
     */
    #plugins = new Map();


    /**
     * Event listeners
     */
    #events = new Map();


    /**
     * Application container
     */
    #container = null;


    /**
     * Lifecycle state
     */
    #state = {

        initialized: false,

        booted: false,

        mounted: false,

        destroyed: false

    };


    /**
     * Private constructor
     */
    constructor() {


        if (CMSKernel.#instance) {

            return CMSKernel.#instance;

        }


        CMSKernel.#instance = this;

    }



    /**
     * Get singleton instance
     */
    static instance() {


        if (!CMSKernel.#instance) {

            CMSKernel.#instance =
                new CMSKernel();

        }


        return CMSKernel.#instance;


    }




    /**
     * Initialize CMS Kernel
     *
     * @param {Object} config
     */
    initialize(config = {}) {


        this.#config = {

            ...this.#config,

            ...config

        };


        this.#state.initialized = true;


        this.emit(

            "cms.initialized",

            this.#config

        );


        return this;


    }





    /**
     * Get configuration
     */
    config(key = null) {


        if (!key) {

            return {

                ...this.#config

            };

        }


        return this.#config[key] ?? null;


    }




    /**
     * Update configuration
     */
    setConfig(key, value) {


        this.#config[key] = value;


        this.emit(

            "config.changed",

            {

                key,

                value

            }

        );


        return this;


    }





    /**
     * Boot CMS Kernel
     */
    async boot() {


        if (this.#state.booted) {

            return this;

        }


        if (!this.#state.initialized) {

            this.initialize();

        }



        for (

            const plugin

            of this.#plugins.values()

        ) {


            if (

                typeof plugin.boot ===

                "function"

            ) {


                await plugin.boot(this);


            }


        }



        for (

            const module

            of this.#modules.values()

        ) {


            if (

                typeof module.initialize ===

                "function"

            ) {


                await module.initialize(this);


            }


        }



        this.#state.booted = true;


        this.emit(

            "cms.booted"

        );


        return this;


    }






    /**
     * Mount application
     *
     * @param {HTMLElement|string} container
     */
    async mount(container) {


        if (this.#state.mounted) {

            return this;

        }



        if (typeof container === "string") {


            this.#container =

                document.querySelector(container);


        } else {


            this.#container = container;


        }



        if (!this.#container) {


            throw new Error(

                "CMS mount container tidak ditemukan."

            );


        }




        for (

            const module

            of this.#modules.values()

        ) {



            if (

                typeof module.mount ===

                "function"

            ) {


                await module.mount(

                    this.#container,

                    this

                );


            }


        }




        this.#state.mounted = true;



        this.emit(

            "cms.mounted",

            this.#container

        );



        return this;


    }
    



    /**
     * Register CMS module
     *
     * Supported:
     *
     * CMS.register({
     *   name:"article",
     *   module: ArticleModule
     * })
     *
     */
    register(config = {}) {


        if (
            !config.name ||
            typeof config.name !== "string"
        ) {

            throw new Error(
                "Module harus memiliki name."
            );

        }



        if (this.#modules.has(config.name)) {

            throw new Error(
                `Module ${config.name} sudah terdaftar.`
            );

        }



        this.#modules.set(

            config.name,

            config

        );



        this.emit(

            "module.registered",

            config

        );



        return this;


    }





    /**
     * Remove module
     */
    unregister(name) {


        if (!this.#modules.has(name)) {

            return false;

        }



        const module =

            this.#modules.get(name);



        if (

            module.module &&

            typeof module.module.destroy ===

            "function"

        ) {


            module.module.destroy();


        }



        this.#modules.delete(name);



        this.emit(

            "module.removed",

            name

        );



        return true;


    }





    /**
     * Get module
     */
    module(name) {


        return this.#modules.get(name) ?? null;


    }





    /**
     * Check module
     */
    hasModule(name) {


        return this.#modules.has(name);


    }





    /**
     * Return all modules
     */
    modules() {


        return Array.from(

            this.#modules.values()

        );


    }





    /**
     * Register service
     *
     * Example:
     *
     * CMS.service(
     *    "api",
     *    ApiService
     * )
     */
    service(name, instance) {


        if (!name) {


            throw new Error(
                "Service name wajib diisi."
            );


        }



        this.#services.set(

            name,

            instance

        );



        this.emit(

            "service.registered",

            {

                name,

                instance

            }

        );



        return this;


    }





    /**
     * Resolve service
     */
    resolve(name) {


        if (!this.#services.has(name)) {


            throw new Error(

                `Service '${name}' tidak ditemukan.`

            );


        }



        return this.#services.get(name);


    }





    /**
     * Check service
     */
    hasService(name) {


        return this.#services.has(name);


    }





    /**
     * Register plugin
     */
    use(plugin) {


        if (!plugin || !plugin.name) {


            throw new Error(

                "Plugin harus memiliki name."

            );


        }



        this.#plugins.set(

            plugin.name,

            plugin

        );



        this.emit(

            "plugin.registered",

            plugin

        );



        return this;


    }





    /**
     * Remove plugin
     */
    removePlugin(name) {


        return this.#plugins.delete(name);


    }





    /**
     * Event listener
     */
    on(event, callback) {


        if (

            typeof callback !==

            "function"

        ) {


            throw new Error(

                "Event callback harus function."

            );


        }



        if (!this.#events.has(event)) {


            this.#events.set(

                event,

                new Set()

            );


        }



        this.#events

            .get(event)

            .add(callback);



        return this;


    }





    /**
     * Once event
     */
    once(event, callback) {


        const wrapper = (...args) => {


            callback(...args);


            this.off(

                event,

                wrapper

            );


        };



        return this.on(

            event,

            wrapper

        );


    }





    /**
     * Remove event listener
     */
    off(event, callback = null) {


        if (!this.#events.has(event)) {


            return this;


        }



        if (!callback) {


            this.#events.delete(event);


            return this;


        }



        this.#events

            .get(event)

            .delete(callback);



        return this;


    }





    /**
     * Emit event
     */
    async emit(event, payload = null) {


        if (!this.#events.has(event)) {


            return this;


        }



        for (

            const callback

            of this.#events.get(event)

        ) {


            await callback(payload);


        }



        return this;


    }
    /**
     * Get container
     */
    container() {

        return this.#container;

    }





    /**
     * Return services list
     */
    services() {

        return Array.from(

            this.#services.entries()

        );

    }





    /**
     * Return plugins list
     */
    plugins() {

        return Array.from(

            this.#plugins.entries()

        );

    }





    /**
     * Kernel status
     */
    status() {

        return {

            initialized:

                this.#state.initialized,

            booted:

                this.#state.booted,

            mounted:

                this.#state.mounted,

            destroyed:

                this.#state.destroyed,

            modules:

                this.#modules.size,

            services:

                this.#services.size,

            plugins:

                this.#plugins.size

        };

    }





    /**
     * Destroy CMS Kernel
     *
     * Release memory
     * Remove listeners
     * Destroy modules
     */
    async destroy() {


        for (

            const module

            of this.#modules.values()

        ) {


            if (

                module.module &&

                typeof module.module.destroy ===

                "function"

            ) {


                await module.module.destroy();


            }


        }




        for (

            const plugin

            of this.#plugins.values()

        ) {


            if (

                typeof plugin.destroy ===

                "function"

            ) {


                await plugin.destroy(

                    this

                );


            }


        }





        this.#events.clear();


        this.#modules.clear();


        this.#services.clear();


        this.#plugins.clear();



        this.#container = null;



        this.#state = {

            initialized:false,

            booted:false,

            mounted:false,

            destroyed:true

        };



        this.emit(

            "cms.destroyed"

        );



        return this;


    }



}



/**
 * Singleton CMS instance
 */
const CMS =

    CMSKernel.instance();



export {

    CMSKernel

};


export default CMS;