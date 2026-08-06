/**
 * TOPCARE AI PLATFORM V2 — INSTALLATION AUDIT TRAIL PLUGIN
 * Path: assets/js/plugins/plugin.audit.trail.js
 * Version: 123.2.4 (BUILD 123.2 — NAMED EXPORT SYNCHRONIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Tracks and records installation audit actions and hash navigation events.
 */

import { Core } from '../core/index.js';

export class InstallationAuditTrailBase {
    constructor() {
        this._lastHash = typeof window !== 'undefined' ? (window.location.hash || '#/home') : '#/home';
        this._auditLog = [];
        this._isInitialized = false;

        Object.seal(this);
    }

    /**
     * Initializes the audit trail plugin and registers hash change listeners.
     */
    init() {
        if (this._isInitialized) return;

        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', () => {
                const currentHash = window.location.hash || '#/home';
                this.recordAction('NAVIGATE', { from: this._lastHash, to: currentHash });
            });
        }

        this._isInitialized = true;
        if (Core && Core.Logger) {
            Core.Logger.info('[AuditTrail] Installation Audit Trail Plugin initialized.');
        }
    }

    /**
     * Records an action event into audit trail history.
     * @param {string} actionType 
     * @param {Object} details 
     */
    recordAction(actionType, details = {}) {
        const currentHash = typeof window !== 'undefined' ? (window.location.hash || '#/home') : '#/home';

        const auditEntry = Object.freeze({
            timestamp: new Date().toISOString(),
            action: actionType,
            hash: currentHash,
            details: { ...details }
        });

        this._auditLog.push(auditEntry);
        this._lastHash = currentHash;

        if (Core && Core.Logger) {
            Core.Logger.info(`[AuditTrail] Action Recorded: [${actionType}] -> ${currentHash}`);
        }
    }

    /**
     * Returns a snapshot copy of current audit log entries.
     * @returns {Array<Object>}
     */
    getLogs() {
        return [...this._auditLog];
    }

    /**
     * Clears all recorded audit logs.
     */
    clearLogs() {
        this._auditLog = [];
    }
}

// -----------------------------------------------------------------------------
// COMPATIBILITY EXPORTS
// -----------------------------------------------------------------------------

// Explicit Named Export for InstallationAuditTrail
export const InstallationAuditTrail = InstallationAuditTrailBase;

// Singleton Instance Export
export const auditTrailInstance = new InstallationAuditTrailBase();

// Default Export
export default InstallationAuditTrailBase;