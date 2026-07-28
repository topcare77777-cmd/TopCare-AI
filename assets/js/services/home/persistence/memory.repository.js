/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Memory Repository)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 50A.3
 * 
 * Description  : Middle-layer repository service coordinating between 
 *                runtime RAM memory (CoachMemory) and persistence storage adapters (MemoryStorage).
 *                Handles session bootstrap loading, snapshot persistence, and schema versioning.
 * -----------------------------------------------------------------
 */

import CoachMemory from '../coach.memory.js';
import MemoryStorage from './memory.storage.js';

/**
 * Repository Schema Configuration.
 * @readonly
 */
const REPOSITORY_CONFIG = Object.freeze({
    SCHEMA_VERSION: '1.0.0'
});

/**
 * Coach Memory Repository Singleton Service.
 * Orchestrates persistence synchronization for runtime memory states.
 */
const MemoryRepository = (() => {

    /**
     * Validates and sanitizes a loaded raw snapshot object.
     * Ensures mandatory root structures exist and handles basic schema version matching.
     * 
     * @param {Object} raw - Raw object loaded from storage.
     * @returns {Object|null} Validated snapshot or null if corrupt.
     * @private
     */
    function validateAndMigrateSnapshot(raw) {
        if (!raw || typeof raw !== 'object') {
            return null;
        }

        const metadata = raw.metadata || {};
        const schemaVersion = metadata.schemaVersion || '0.9.0';

        // Basic structural validation check
        if (!raw.identity || !raw.conversation || !raw.preferences) {
            console.warn('[MemoryRepository] Snapshot validation failed: Missing required core keys.');
            return null;
        }

        // Future migration hook can be placed here based on schemaVersion
        if (schemaVersion !== REPOSITORY_CONFIG.SCHEMA_VERSION) {
            console.info(`[MemoryRepository] Migrating snapshot schema from ${schemaVersion} to ${REPOSITORY_CONFIG.SCHEMA_VERSION}`);
        }

        return {
            identity: { ...(raw.identity || {}) },
            conversation: { ...(raw.conversation || {}) },
            preferences: { ...(raw.preferences || {}) },
            metadata: {
                schemaVersion: REPOSITORY_CONFIG.SCHEMA_VERSION,
                migratedFrom: schemaVersion,
                updatedAt: new Date().toISOString()
            }
        };
    }

    /**
     * Initializes and restores session memory from persistent storage into runtime CoachMemory.
     * Called during application startup.
     * 
     * @returns {Promise<boolean>} Resolves to true if session was successfully restored, false otherwise.
     */
    async function restoreSession() {
        try {
            const rawSnapshot = await MemoryStorage.load();
            if (!rawSnapshot) {
                return false;
            }

            const validSnapshot = validateAndMigrateSnapshot(rawSnapshot);
            if (!validSnapshot) {
                console.warn('[MemoryRepository] Stored snapshot was invalid; clearing corrupted record.');
                await MemoryStorage.remove();
                return false;
            }

            // Hydrate runtime RAM memory via official CoachMemory update contract
            CoachMemory.update({
                identity: validSnapshot.identity,
                conversation: validSnapshot.conversation,
                preferences: validSnapshot.preferences
            });

            return true;
        } catch (err) {
            console.error('[MemoryRepository] Exception during session restoration:', err);
            return false;
        }
    }

    /**
     * Captures current runtime CoachMemory snapshot and persists it to storage.
     * 
     * @returns {Promise<boolean>} Resolves to true if successfully saved.
     */
    async function persistSession() {
        try {
            const currentMemory = CoachMemory.get();

            const snapshot = {
                identity: currentMemory.identity || {},
                conversation: currentMemory.conversation || {},
                preferences: currentMemory.preferences || {},
                metadata: {
                    schemaVersion: REPOSITORY_CONFIG.SCHEMA_VERSION,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            };

            const success = await MemoryStorage.save(snapshot);
            return success;
        } catch (err) {
            console.error('[MemoryRepository] Exception during session persistence:', err);
            return false;
        }
    }

    /**
     * Clears persisted session storage and resets runtime memory state if needed.
     * 
     * @returns {Promise<boolean>} Resolves to true if successfully cleared.
     */
    async function clearSession() {
        try {
            const success = await MemoryStorage.remove();
            return success;
        } catch (err) {
            console.error('[MemoryRepository] Exception during session clearance:', err);
            return false;
        }
    }

    return Object.freeze({
        restoreSession,
        persistSession,
        clearSession
    });
})();

export default MemoryRepository;