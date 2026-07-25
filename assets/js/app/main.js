/**
 * @file main.js
 * @description Application entry point.
 */

import { bootstrap } from './bootstrap.js';

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        bootstrap.init();
    });
}