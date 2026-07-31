/**
 * file: assets/js/plugins/plugin.update.constraints.js
 */

import { Core } from '../core/index.js';
import { PluginSemVer } from './plugin.semver.js';

export class UpdateConstraintManager {
    constructor() {
        this._pinnedVersions = new Map(); // pluginId -> pinnedVersion (exact)
        this._lockedRanges = new Map();   // pluginId -> rangeSpec (e.g. "^1.2.0" or "1.x")
        Object.seal(this);
    }

    /**
     * Mengunci plugin ke versi spesifik secara absolut.
     * @param {string} pluginId 
     * @param {string} exactVersion 
     */
    pinVersion(pluginId, exactVersion) {
        this._pinnedVersions.set(pluginId, exactVersion);
        Core.Logger.info(`[Update Constraint] Version PINNED for '${pluginId}': ${exactVersion}`);
        return this;
    }

    /**
     * Menetapkan batas versi (SemVer range constraint) untuk pembaruan.
     * @param {string} pluginId 
     * @param {string} rangeSpec 
     */
    setRangeLock(pluginId, rangeSpec) {
        this._lockedRanges.set(pluginId, rangeSpec);
        Core.Logger.info(`[Update Constraint] Range lock set for '${pluginId}': ${rangeSpec}`);
        return this;
    }

    /**
     * Memeriksa apakah kandidat versi baru diizinkan untuk diinstal.
     * @param {string} pluginId 
     * @param {string} targetVersion 
     * @returns {{ allowed: boolean, reason?: string }}
     */
    isUpdateAllowed(pluginId, targetVersion) {
        if (this._pinnedVersions.has(pluginId)) {
            const pinned = this._pinnedVersions.get(pluginId);
            if (pinned !== targetVersion) {
                return {
                    allowed: false,
                    reason: `Update blocked: Plugin '${pluginId}' is pinned strictly to version '${pinned}'.`
                };
            }
        }

        if (this._lockedRanges.has(pluginId)) {
            const range = this._lockedRanges.get(pluginId);
            if (!PluginSemVer.satisfies(targetVersion, range)) {
                return {
                    allowed: false,
                    reason: `Update blocked: Version '${targetVersion}' violates lock range '${range}' for plugin '${pluginId}'.`
                };
            }
        }

        return { allowed: true };
    }

    unpin(pluginId) {
        this._pinnedVersions.delete(pluginId);
        this._lockedRanges.delete(pluginId);
        Core.Logger.info(`[Update Constraint] Unpinned/unlocked plugin: ${pluginId}`);
    }
}

export const GlobalUpdateConstraintManager = Object.freeze(new UpdateConstraintManager());