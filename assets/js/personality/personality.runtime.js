/**
 * file: assets/js/personality/personality.runtime.js
 * Version: 133A.1.0
 * Status: APPROVED & LOCKED
 * SRP: Pure SSOT Read-Only Runtime Bridge for consuming V1 Personality Test results across Platform V2.
 */

import { PersonalityStorage } from './personality-storage.js';

class PersonalityRuntimeBase {
    constructor() {
        Object.seal(this);
    }

    /**
     * Retrieves the raw saved personality record directly from PersonalityStorage SSOT.
     * @returns {Object|null}
     */
    load() {
        try {
            if (typeof PersonalityStorage !== 'undefined' && typeof PersonalityStorage.loadResult === 'function') {
                return PersonalityStorage.loadResult();
            }
            if (typeof PersonalityStorage !== 'undefined' && typeof PersonalityStorage.load === 'function') {
                return PersonalityStorage.load();
            }
            return null;
        } catch {
            return null;
        }
    }

    /**
     * Returns structured profile data mapped strictly from V1 report payload.
     * @returns {Object|null}
     */
    getProfile() {
        const data = this.load();
        if (!data) return null;

        const report = data.report || data;

        return {
            primaryType: this.getPrimaryType(),
            secondaryType: this.getSecondaryType(),
            ageGroup: data.ageGroup || null,
            report: report,
            scores: report.scores || report.breakdown || {},
            ranking: report.ranking || [],
            completedAt: data.timestamp || data.completedAt || null
        };
    }

    /**
     * Returns the primary temperament type mapped from V1 report.primary or report.dominant.
     * @returns {string|null}
     */
    getPrimaryType() {
        const data = this.load();
        if (!data) return null;

        const report = data.report || data;
        return report.primary || report.primaryType || report.dominant || report.dominantType || null;
    }

    /**
     * Returns the secondary temperament type mapped from V1 report.secondary.
     * @returns {string|null}
     */
    getSecondaryType() {
        const data = this.load();
        if (!data) return null;

        const report = data.report || data;
        return report.secondary || report.secondaryType || null;
    }

    /**
     * Checks if a valid personality test result exists in storage.
     * @returns {boolean}
     */
    hasResult() {
        return this.getPrimaryType() !== null;
    }

    /**
     * Clears saved result strictly via PersonalityStorage.
     */
    clear() {
        if (typeof PersonalityStorage !== 'undefined') {
            if (typeof PersonalityStorage.clearResult === 'function') {
                PersonalityStorage.clearResult();
            } else if (typeof PersonalityStorage.clear === 'function') {
                PersonalityStorage.clear();
            }
        }
    }
}

export const PersonalityRuntime = Object.freeze(new PersonalityRuntimeBase());