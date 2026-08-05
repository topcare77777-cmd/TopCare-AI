/**
 * TOPCARE AI PLATFORM V2 — HOME CONTROLLER
 * Path: assets/js/home/home.controller.js
 * Status: APPROVED & LOCKED (BUILD 128.4)
 * SRP: Manages initialization for Home Landing Page.
 */

import { HomeRenderer } from './home.renderer.js';

export class HomeController {
    constructor(container) {
        this.container = container;
    }

    init() {
        if (!this.container) return;
        this.container.innerHTML = HomeRenderer.renderPage();
    }
}

export default HomeController;