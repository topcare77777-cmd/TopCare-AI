/**
 * TOPCARE AI PLATFORM V2 — ENTERPRISE MASTER CAPABILITY BOOTSTRAP
 * Path: assets/js/core/capability/capability.bootstrap.js
 * Status: ACTIVE (BUILD 126.1 — MASTER DOMAIN ORCHESTRATOR)
 * Role: Orchestrates the initialization of all autonomous Domain Bootstraps and aggregates diagnostic reporting.
 */

import { Core } from '../index.js';
import { PersonalityDomainBootstrap } from '../../services/personality/index.js';
import { HealthDomainBootstrap } from '../../services/health/index.js';
import { WellnessDomainBootstrap } from '../../services/wellness/index.js';
import { CareerDomainBootstrap } from '../../services/career/index.js';
import { PlanningDomainBootstrap } from '../../services/planning/index.js';

export const CapabilityBootstrap = (() => {
    let _initialized = false;

    return Object.freeze({
        /**
         * Orchestrates initialization across all domain bootstraps.
         * Safe for repeated execution (idempotent).
         * @returns {Object} Diagnostic summary DTO
         */
        initialize() {
            if (_initialized) {
                return { success: true, alreadyInitialized: true, domainReports: [] };
            }

            try {
                const domainBootstraps = [
                    PersonalityDomainBootstrap,
                    HealthDomainBootstrap,
                    WellnessDomainBootstrap,
                    CareerDomainBootstrap,
                    PlanningDomainBootstrap
                ];

                const domainReports = [];
                let successfulDomains = 0;

                for (const domain of domainBootstraps) {
                    if (domain && typeof domain.initialize === 'function') {
                        const report = domain.initialize();
                        domainReports.push(report);
                        if (report && report.success) {
                            successfulDomains++;
                        }
                    }
                }

                _initialized = true;
                Core.Logger.info(`[CapabilityBootstrap] Master Orchestrator initialized ${successfulDomains}/${domainBootstraps.length} domain bootstraps successfully.`);

                return {
                    success: successfulDomains === domainBootstraps.length,
                    alreadyInitialized: false,
                    totalDomains: domainBootstraps.length,
                    successfulDomains,
                    domainReports
                };
            } catch (error) {
                Core.Logger.error('[CapabilityBootstrap] Master Orchestrator initialization failed:', error);
                return {
                    success: false,
                    alreadyInitialized: false,
                    error: error.message,
                    domainReports: []
                };
            }
        },

        /**
         * Checks if Master Capability Orchestrator has completed initialization.
         * @returns {boolean}
         */
        isInitialized() {
            return _initialized;
        }
    });
})();

export default CapabilityBootstrap;