/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Production Bootstrap
 * ==========================================================
 *
 * File    : bootstrap.js
 * Version : 2.0.0
 *
 * Status:
 * GOLD STANDARD
 *
 * Responsibility:
 * Application Composition Root.
 *
 * This file is responsible for:
 *
 * - Kernel creation
 * - CMS Facade creation
 * - Extension registration
 * - Lifecycle orchestration
 *
 * This file MUST NOT:
 *
 * - contain business logic
 * - access kernel internals
 * - bypass CMS Facade
 *
 * Architecture Reference:
 *
 * - docs/Kernel-Architecture.md
 * - docs/Kernel-API.md
 * - docs/Kernel-Sequence.md
 * - docs/Kernel-ADR.md
 *
 * Rules:
 *
 * - Single Composition Root
 * - Facade Only Access
 * - Deterministic Lifecycle
 * - Zero Hidden Side Effect
 *
 * ==========================================================
 */

"use strict";


import CMS from "./kernel/cms.js";

import Kernel from "./kernel/kernel.js";

import CMSException from "./kernel/cms-exception.js";

import {
    CMS_EVENTS,
    CMS_STATUS
} from "./kernel/constants.js";



/**
 * Runtime instance
 *
 * Controlled singleton.
 */
let runtime = null;



/**
 * Validate bootstrap options
 *
 * @param {object} options
 */
function validateOptions(options) {


    if (
        options === null ||
        typeof options !== "object" ||
        Array.isArray(options)
    ) {

        throw new CMSException(
            "BOOTSTRAP_INVALID_OPTIONS",
            "Bootstrap options harus berupa object.",
            {
                received:
                    typeof options
            }
        );

    }


}



/**
 * Create Kernel instance
 *
 * Composition Root responsibility.
 *
 * @param {object} options
 *
 * @returns {Kernel}
 */
function createKernel(options) {


    return new Kernel(
        options.kernel ?? {}
    );


}



/**
 * Register external modules
 *
 * Through Facade only.
 *
 * @param {CMS} cms
 * @param {Array} modules
 */
function registerModules(
    cms,
    modules = []
) {


    for (
        const module of modules
    ) {


        cms.registerModule(
            module
        );


    }


}



/**
 * Register external plugins
 *
 * Through Facade only.
 *
 * @param {CMS} cms
 * @param {Array} plugins
 */
function registerPlugins(
    cms,
    plugins = []
) {


    for (
        const plugin of plugins
    ) {


        cms.registerPlugin(
            plugin
        );


    }


}



/**
 * Register external services
 *
 * Through Facade only.
 *
 * @param {CMS} cms
 * @param {object} services
 */
function registerServices(
    cms,
    services = {}
) {


    if (
        typeof services !== "object"
    ) {

        return;

    }


    for (
        const [
            name,
            service
        ]
        of Object.entries(services)
    ) {


        cms.registerService(
            name,
            service
        );


    }


}



/**
 * Bootstrap CMS runtime
 *
 * Lifecycle:
 *
 * CREATED
 *    |
 * initialize()
 *    |
 * INITIALIZED
 *    |
 * boot()
 *    |
 * BOOTED
 *    |
 * mount()
 *    |
 * RUNNING
 *
 *
 * @param {object} options
 *
 * @returns {Promise<CMS>}
 */
export async function bootstrap(
    options = {}
) {


    validateOptions(
        options
    );



    const kernel =
        createKernel(
            options
        );



    const cms =
        CMS.create(
            kernel
        );



    registerServices(
        cms,
        options.services
    );



    registerModules(
        cms,
        options.modules
    );



    registerPlugins(
        cms,
        options.plugins
    );



    await cms.initialize();


    await cms.boot();


    await cms.mount();



    await cms.emit(
        CMS_EVENTS.BOOTSTRAPPED,
        {
            status:
                CMS_STATUS.READY,

            timestamp:
                Date.now()
        }
    );



    return cms;

}



/**
 * Start CMS runtime
 *
 * Singleton launcher.
 *
 * @param {object} options
 *
 * @returns {Promise<CMS>}
 */
export async function start(
    options = {}
) {


    if (runtime) {

        return runtime;

    }



    runtime =
        await bootstrap(
            options
        );


    return runtime;

}



/**
 * Get active runtime
 *
 * @returns {CMS|null}
 */
export function instance() {


    return runtime;


}



/**
 * Shutdown CMS runtime
 *
 * @returns {Promise<boolean>}
 */
export async function shutdown() {


    if (!runtime) {

        return false;

    }



    await runtime.destroy();


    runtime = null;


    return true;

}



/**
 * Default bootstrap export
 */
export default bootstrap;