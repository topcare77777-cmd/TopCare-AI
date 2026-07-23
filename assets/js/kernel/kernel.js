/**
 * TopCare AI Platform V2.0.0
 * Kernel Module
 * Path: assets/js/kernel/kernel.js
 */

import Bootstrap from '../app/bootstrap.js';

export const Kernel = {
    version: '2.0.0',
    
    async init() {
        console.log(`[Kernel V${this.version}] Booting system kernel...`);
        
        if (typeof Bootstrap !== 'undefined') {
            if (typeof Bootstrap.run === 'function') {
                await Bootstrap.run();
            } else if (typeof Bootstrap.init === 'function') {
                await Bootstrap.init();
            } else if (typeof Bootstrap === 'function') {
                await Bootstrap();
            }
        }
        
        console.log(`[Kernel V${this.version}] Kernel booted successfully.`);
    }
};

export default Kernel;