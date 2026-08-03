/**
 * TOPCARE AI PLATFORM V2 — RUNTIME SUBSYSTEM BARREL EXPORT
 * Path: assets/js/runtime/index.js
 * Version: 124.1.0 (BUILD 124.1)
 * Status: APPROVED & LOCKED
 * SRP: Central Barrel Export for Runtime Subsystem Core & Navigation Continuation Subsystem
 */

// Existing Core Runtime Exports (Preserved 100%)
export { RuntimeBootstrap } from './runtime.bootstrap.js';
export { RuntimeRouter } from './runtime.router.service.js';
export { ApplicationEntry } from './application.entry.service.js';
export { RUNTIME_ROUTER_EVENTS } from './runtime.router.types.js';
export { APPLICATION_ENTRY_EVENTS } from './application.entry.types.js';

// BUILD 123.1 Capabilities Addition
export { CapabilityBootstrap } from './capability.bootstrap.js';

// BUILD 124.1 Navigation Continuation Subsystem Additions
export { createNavigationIntentDTO } from './navigation.intent.dto.js';
export { NavigationIntentService } from './navigation.intent.service.js';
export { NavigationIntentManager } from './navigation.intent.manager.js';
export { INavigationIntentService, validateNavigationIntentInterface } from './navigation.intent.interface.js';