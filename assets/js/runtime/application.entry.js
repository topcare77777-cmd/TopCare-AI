/**
 * file: assets/js/runtime/application.entry.js
 */

import { ApplicationEntry } from './application.entry.service.js';

// Automatically trigger startup when imported as the single composition root module entry point
(async () => {
    try {
        await ApplicationEntry.bootstrap();
    } catch (error) {
        console.error("Fatal: Application startup failed at composition root entry.", error);
    }
})();

export { ApplicationEntry };