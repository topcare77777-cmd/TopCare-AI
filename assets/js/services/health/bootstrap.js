/**
 * TOPCARE AI PLATFORM V2 — HEALTH DOMAIN BOOTSTRAP
 * Path: assets/js/services/health/bootstrap.js
 * Status: ACTIVE (BUILD 126.1 — ENTERPRISE PIPELINE)
 */

import { Core } from '../../core/index.js';
import CapabilityRegistry from '../../core/capability/capability.registry.js';
import CapabilityHandlerRegistry from '../../core/capability/capability.handler.registry.js';
import manifests from './manifests/index.js';
import handlers from './handlers/index.js';
import engines from './engine/index.js';
import prompts from './prompts/index.js';

export const HealthDomainBootstrap = (() => {
    let _initialized = false;
    let _metrics = { registeredManifests: 0, registeredHandlers: 0, registeredEngines: 0, registeredPrompts: 0 };

    function _registerManifests() {
        for (const manifest of manifests) {
            if (manifest && manifest.id) {
                CapabilityRegistry.register(manifest);
                _metrics.registeredManifests++;
            }
        }
    }

    function _registerHandlers() {
        for (const handlerItem of handlers) {
            if (handlerItem && handlerItem.id && handlerItem.handler) {
                CapabilityHandlerRegistry.register(handlerItem.id, handlerItem.handler);
                _metrics.registeredHandlers++;
            }
        }
    }

    function _registerEngines() {
        _metrics.registeredEngines += engines.length;
    }

    function _registerPrompts() {
        _metrics.registeredPrompts += prompts.length;
    }

    return Object.freeze({
        initialize() {
            if (_initialized) {
                return { success: true, domainId: 'health', alreadyInitialized: true, ..._metrics };
            }

            try {
                const phases = [
                    _registerManifests,
                    _registerHandlers,
                    _registerEngines,
                    _registerPrompts
                ];

                for (const phase of phases) {
                    phase();
                }

                _initialized = true;
                Core.Logger.info(`[HealthDomain] Bootstrapped successfully (${_metrics.registeredManifests} manifests).`);

                return {
                    success: true,
                    domainId: 'health',
                    alreadyInitialized: false,
                    ..._metrics
                };
            } catch (error) {
                Core.Logger.error('[HealthDomain] Bootstrap failed:', error);
                return {
                    success: false,
                    domainId: 'health',
                    error: error.message,
                    ..._metrics
                };
            }
        },
        isInitialized: () => _initialized
    });
})();

export default HealthDomainBootstrap;