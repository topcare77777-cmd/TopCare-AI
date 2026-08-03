/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION INTENT INTERFACE
 * Path: assets/js/runtime/navigation.intent.interface.js
 * Version: 124.1.0 (BUILD 124.1)
 * Status: APPROVED & LOCKED
 * SRP: Formal Interface Boundary Contract for Navigation Intent Management Operations
 */

export const INavigationIntentService = Object.freeze({
    saveIntent: 'function',
    restoreIntent: 'function',
    peekIntent: 'function',
    clearIntent: 'function',
    hasIntent: 'function'
});

/**
 * Validates whether an implementation satisfies the Navigation Intent Interface contract.
 * @param {Object} implementation - Object instance to validate
 * @returns {boolean} True if implementation satisfies the interface contract
 */
export function validateNavigationIntentInterface(implementation) {
    if (!implementation || typeof implementation !== 'object') {
        return false;
    }

    return Object.keys(INavigationIntentService).every((methodName) => {
        return typeof implementation[methodName] === INavigationIntentService[methodName];
    });
}

export default INavigationIntentService;