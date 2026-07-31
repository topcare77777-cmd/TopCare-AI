/**
 * file: assets/js/plugins/plugin.audit.trail.js
 * Comprehensive Audit Trail mencakup seluruh tindakan siklus hidup & kegagalan keamanan.
 */
import { Core } from '../core/index.js';
import { CryptoEngine } from './plugin.crypto.engine.js';

export const AUDIT_ACTIONS = Object.freeze({
    INSTALL: 'INSTALL',
    UPDATE: 'UPDATE',
    ROLLBACK: 'ROLLBACK',
    ENABLE: 'ENABLE',
    DISABLE: 'DISABLE',
    DELETE: 'DELETE',
    SIGNATURE_FAILURE: 'SIGNATURE_FAILURE',
    CHECKSUM_FAILURE: 'CHECKSUM_FAILURE'
});

class InstallationAuditTrailBase {
    constructor() {
        this._auditLogs = [];
        this._lastHash = 'GENESIS_HASH';
        Object.seal(this);
    }

    async recordAction(action, pluginId, meta = {}) {
        const timestamp = Core.Utils.now ? Core.Utils.now() : Date.now();
        const rawPayload = `${action}:${pluginId}:${timestamp}:${this._lastHash}`;

        const sequenceEncoder = new TextEncoder();
        const sequenceBuffer = sequenceEncoder.encode(rawPayload).buffer;
        const entryHash = await CryptoEngine.computeSHA256(sequenceBuffer);

        const auditEntry = Object.freeze({
            sequenceId: this._auditLogs.length + 1,
            action,
            pluginId,
            details: meta,
            timestamp,
            prevHash: this._lastHash,
            entryHash
        });

        this._lastHash = entryHash;
        this._auditLogs.push(auditEntry);

        Core.Logger.info(`[Audit Log] #${auditEntry.sequenceId} [${action}] for plugin: ${pluginId}`);
        Core.Event.emit('plugin.audit.recorded', auditEntry);
        return auditEntry;
    }

    getAuditLogs() {
        return Core.Utils.clone(this._auditLogs).map(entry => Object.freeze(entry));
    }
}

export const InstallationAuditTrail = Object.freeze(new InstallationAuditTrailBase());