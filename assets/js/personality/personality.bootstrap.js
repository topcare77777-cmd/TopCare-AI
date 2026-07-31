/**
 * file: assets/js/personality/personality.bootstrap.js
 * Version: 133A.0.0
 * Status: APPROVED & LOCKED
 * SRP: Lifecycle wrapper and mount bridge for Legacy Personality Test V1 Engine.
 */

import { initPersonalityTest } from './personality-test.js';

export class PersonalityBootstrap {
    static _mountedContainer = null;

    /**
     * Mounts and initializes the legacy Personality Test V1 Engine into the provided DOM container.
     * @param {HTMLElement} container 
     * @returns {Promise<void>}
     */
    static async bootstrap(container) {
        if (!container) {
            throw new Error("[PersonalityBootstrap] Invalid container element provided for bootstrap.");
        }

        PersonalityBootstrap._mountedContainer = container;

        // Delegate directly to Legacy V1 Entry Point without modifying engine behavior
        if (typeof initPersonalityTest === 'function') {
            await initPersonalityTest(container);
        } else {
            throw new Error("[PersonalityBootstrap] initPersonalityTest export missing from legacy module.");
        }
    }

    /**
     * Checks whether the Personality Test Engine is currently mounted in the DOM.
     * @returns {boolean}
     */
    static isMounted() {
        return PersonalityBootstrap._mountedContainer !== null && document.body.contains(PersonalityBootstrap._mountedContainer);
    }

    /**
     * Cleans up the DOM container for page unmounting.
     */
    static destroy() {
        if (PersonalityBootstrap._mountedContainer) {
            PersonalityBootstrap._mountedContainer.innerHTML = '';
            PersonalityBootstrap._mountedContainer = null;
        }
    }
}