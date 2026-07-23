/**
 * @file bootstrap.js
 * @description Enterprise application initialization and bootstrap sequence. 
 * Orchestrates core infrastructure startup, router engine initialization, router attachment, 
 * and DOM root configuration without direct session verification responsibilities.
 * @module App/Bootstrap
 * @version 3.0.0
 * @status Production Ready
 */

import { router } from '../router/router.js';
import { routerEngine } from '../router/router.engine.js';

export class Bootstrap {
    #initialized;

    /**
     * Creates an instance of Bootstrap.
     */
    constructor() {
        this.#initialized = false;
    }

    /**
     * Initializes the entire application infrastructure boot sequence.
     * @returns {boolean} True when initialization succeeds, false otherwise.
     */
    init() {
        if (this.#initialized) {
            return true;
        }

        try {
            if (typeof document === 'undefined' || typeof window === 'undefined') {
                return false;
            }

            let rootContainer = document.getElementById('app');
            if (!rootContainer) {
                rootContainer = document.createElement('div');
                rootContainer.id = 'app';
                document.body.appendChild(rootContainer);
            }

            if (routerEngine && typeof routerEngine.init === 'function') {
                routerEngine.init();
            }

            if (router && typeof router.init === 'function') {
                router.init(rootContainer);
            }

            this.#initialized = true;
            return true;
        } catch (error) {
            return false;
        }
    }
}

export const bootstrap = new Bootstrap();

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        bootstrap.init();
    });
}