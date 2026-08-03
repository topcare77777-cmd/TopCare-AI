/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY BOOTSTRAPPER
 * Path: assets/js/runtime/capability.bootstrap.js
 * Status: ACTIVE (BUILD 123.1 - REVISION 2)
 * Role: Orchestrates Capability Manifest Registrations and Handler Binding Initialization
 */

import { Core } from '../core/index.js';
import CapabilityRegistry from '../core/capability/capability.registry.js';
import CapabilityHandlerRegistry from '../core/capability/capability.handler.registry.js';
import { initializeResumeOptimizerCapability } from '../services/capability/implementations/resume.optimizer.capability.js';

export class CapabilityBootstrap {
    static _initialized = false;

    static async initialize() {
        if (CapabilityBootstrap._initialized) {
            Core.Logger.info('[CapabilityBootstrap] Already initialized. Skipping execution.');
            return true;
        }

        Core.Logger.info('[CapabilityBootstrap] Bootstrapping Enterprise Capability Subsystems...');

        try {
            // 1. Initialize and register Capability Implementations (Manifests + Handlers)
            initializeResumeOptimizerCapability();

            // 2. Lock Capability Registries SSOT safely using existing contract APIs
            if (typeof CapabilityRegistry.lock === 'function') {
                const state = typeof CapabilityRegistry.getState === 'function' ? CapabilityRegistry.getState() : null;
                if (!state || !state.isLocked) {
                    CapabilityRegistry.lock();
                }
            }

            if (typeof CapabilityHandlerRegistry.lock === 'function' && !CapabilityHandlerRegistry.isLocked()) {
                CapabilityHandlerRegistry.lock();
            }

            CapabilityBootstrap._initialized = true;
            Core.Logger.info('[CapabilityBootstrap] Enterprise Capabilities successfully registered and locked.');
            return true;
        } catch (error) {
            Core.Logger.error(`[CapabilityBootstrap] Capability initialization failed: ${error.message}`);
            throw error;
        }
    }
}

export default CapabilityBootstrap;