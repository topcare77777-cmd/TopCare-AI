/**
 * TopCare AI Platform V2.0.0
 * Main Application Entry Point
 * Path: assets/js/main.js
 */

import Bootstrap from './kernel/bootstrap.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("TopCare AI Platform V2.0.0 booting...");
        await Bootstrap.init();
        console.log("TopCare AI Platform V2.0.0 Aplikasi berhasil dimuat tanpa error.");
    } catch (error) {
        console.error("Critical error during application bootstrap:", error);
    }
});