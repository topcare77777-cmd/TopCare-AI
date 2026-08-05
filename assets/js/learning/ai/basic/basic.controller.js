/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING BASIC: CONTROLLER
 * Path: assets/js/learning/ai/basic/basic.controller.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Lifecycle and mount controller for the Basic Level AI Domain.
 */

import { BasicComponent } from './basic.component.js';

export class BasicController {
    constructor(container) {
        this.container = container;
        this.component = new BasicComponent();
    }

    init() {
        if (!this.container) return;
        this.container.innerHTML = this.component.render();
    }
}

export default BasicController;