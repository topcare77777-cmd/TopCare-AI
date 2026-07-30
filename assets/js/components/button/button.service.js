/**
 * TOPCARE AI PLATFORM — BUTTON.SERVICE.JS
 * Business Logic & Event Delegation Service for Button System
 */

export class ButtonService {
    constructor() {
        this.activeButtons = new Set();
    }

    register(buttonInstance) {
        this.activeButtons.add(buttonInstance);
    }

    unregister(buttonInstance) {
        this.activeButtons.delete(buttonInstance);
    }

    disableAll() {
        for (const btn of this.activeButtons) {
            btn.disable();
        }
    }

    enableAll() {
        for (const btn of this.activeButtons) {
            btn.enable();
        }
    }
}

export const buttonService = new ButtonService();