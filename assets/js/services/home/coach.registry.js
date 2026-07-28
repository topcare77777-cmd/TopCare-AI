/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Registry Service)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 51A.2
 * 
 * Description  : Centralized registry catalog containing available coach personas,
 *                specializations, and metadata profiles. Acts as the Single Source
 *                of Truth for runtime factories without managing active execution instances.
 * -----------------------------------------------------------------
 */

/**
 * Registry Schema Version.
 * @type {string}
 */
const REGISTRY_SCHEMA_VERSION = '1.0.0';

/**
 * Master catalog of available coach personas and profiles.
 * Immutable registry dictionary.
 * @readonly
 */
const COACH_CATALOG = Object.freeze({
    'coach-kael': Object.freeze({
        id: 'coach-kael',
        name: 'Coach Kael',
        persona: 'standard-guide',
        specialization: 'general-coaching',
        defaultTone: 'supportive',
        description: 'Standard guide providing balanced orientation and day-to-day productivity mentoring.'
    }),
    'coach-maya': Object.freeze({
        id: 'coach-maya',
        name: 'Coach Maya',
        persona: 'empathetic-motivator',
        specialization: 'emotional-growth',
        defaultTone: 'empathetic',
        description: 'Empathetic motivator focusing on emotional resilience, personal growth, and well-being.'
    }),
    'coach-atlas': Object.freeze({
        id: 'coach-atlas',
        name: 'Coach Atlas',
        persona: 'analytical-strategist',
        specialization: 'career-analysis',
        defaultTone: 'analytical',
        description: 'Analytical strategist specializing in career roadmapping, metrics, and targeted execution.'
    }),
    'dr-aria': Object.freeze({
        id: 'dr-aria',
        name: 'Dr. Aria',
        persona: 'expert-mentor',
        specialization: 'premium-coaching',
        defaultTone: 'informative',
        description: 'Expert mentor delivering high-tier specialized professional coaching and strategic foresight.'
    })
});

/**
 * Default fallback coach identifier.
 * @readonly
 */
const DEFAULT_COACH_ID = 'coach-kael';

/**
 * Coach Registry Service Singleton.
 * Provides lookup, validation, and listing of available coach definitions.
 */
const CoachRegistry = (() => {

    /**
     * Retrieves the profile definition for a given coach identifier.
     * Falls back to default coach if not found.
     * 
     * @param {string} coachId - Unique coach identifier.
     * @returns {Object} Immutable coach definition profile.
     */
    function get(coachId) {
        const safeId = typeof coachId === 'string' ? coachId.trim().toLowerCase() : '';
        return COACH_CATALOG[safeId] || COACH_CATALOG[DEFAULT_COACH_ID];
    }

    /**
     * Checks whether a specific coach identifier exists in the registry catalog.
     * 
     * @param {string} coachId - Unique coach identifier to verify.
     * @returns {boolean} True if registered, false otherwise.
     */
    function exists(coachId) {
        if (typeof coachId !== 'string') return false;
        return Object.prototype.hasOwnProperty.call(COACH_CATALOG, coachId.trim().toLowerCase());
    }

    /**
     * Returns an array of all available coach profiles in the catalog.
     * 
     * @returns {Array<Object>} List of immutable coach profile objects.
     */
    function list() {
        return Object.freeze(Object.values(COACH_CATALOG));
    }

    /**
     * Returns the default fallback coach identifier.
     * 
     * @returns {string} Default coach ID.
     */
    function getDefaultId() {
        return DEFAULT_COACH_ID;
    }

    /**
     * Returns metadata status of the registry service.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: REGISTRY_SCHEMA_VERSION,
            totalCoaches: Object.keys(COACH_CATALOG).length,
            defaultCoachId: DEFAULT_COACH_ID
        });
    }

    return Object.freeze({
        get,
        exists,
        list,
        getDefaultId,
        getStatus
    });
})();

export default CoachRegistry;