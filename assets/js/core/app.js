/**
 * TopCare AI Platform V2.0.0
 * Core Application Entry Point
 * Path: assets/js/core/app.js
 */

import Kernel from '../kernel/kernel.js';

class Application {
    constructor() {
        this.version = '2.0.0';
        this.isReady = false;
    }

    async init() {
        try {
            console.log(`[TopCare AI V${this.version}] Initializing Application...`);
            
            if (typeof Kernel !== 'undefined') {
                if (typeof Kernel.init === 'function') {
                    await Kernel.init();
                } else if (typeof Kernel.bootstrap === 'function') {
                    await Kernel.bootstrap();
                }
            }

            this.isReady = true;
            console.log(`[TopCare AI V${this.version}] Application Ready.`);
        } catch (error) {
            console.error(`[TopCare AI V${this.version}] Application Initialization Error:`, error);
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const app = new Application();
    window.TopCareApp = app;
    await app.init();
});

export default Application;