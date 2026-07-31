/**
 * file: assets/js/index.js
 * Version: 135.0.0
 * Status: APPROVED & LOCKED
 * SRP: Application Main Entry Module for bootstrapping TopCare AI Platform Runtime V2.
 */

import { bootstrap } from './app/bootstrap.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await bootstrap();
    } catch (err) {
        console.error('[Runtime Index] Critical Boot Failure:', err);
    }
});