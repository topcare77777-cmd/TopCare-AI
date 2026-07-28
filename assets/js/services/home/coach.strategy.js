/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Strategy Engine)
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 49A.3
 * Last Updated : Sprint 49A.3 (Final Hardened)
 * 
 * Description  : Deterministic, stateless strategy resolution service.
 *                Takes a ConversationContext and resolves communication tone, 
 *                coach persona, objectives, and response modes via hardened rule tables.
 * -----------------------------------------------------------------
 */

/**
 * Strategy Engine Schema Version.
 * @type {string}
 */
const STRATEGY_SCHEMA_VERSION = '1.1.0';

/**
 * Default fallback coach persona mapping.
 * @readonly
 */
const DEFAULT_COACH = Object.freeze({
    id: 'coach-kael',
    persona: 'standard-guide'
});

/**
 * Default objective fallback schema.
 * @readonly
 */
const DEFAULT_OBJECTIVE = Object.freeze({
    primary: 'assist',
    secondary: 'clarify'
});

/**
 * Scalable set of premium membership tiers.
 * @readonly
 */
const PREMIUM_TIERS = Object.freeze(new Set([
    'premium',
    'pro',
    'enterprise',
    'business',
    'vip',
    'coach-plus'
]));

/**
 * Registry of available coach personas.
 * @readonly
 */
const COACH_REGISTRY = Object.freeze({
    'Dr. Aria': Object.freeze({ id: 'dr-aria', persona: 'expert-mentor' }),
    'Coach Kael': Object.freeze({ id: 'coach-kael', persona: 'standard-guide' }),
    'Coach Maya': Object.freeze({ id: 'coach-maya', persona: 'empathetic-motivator' }),
    'Coach Atlas': Object.freeze({ id: 'coach-atlas', persona: 'analytical-strategist' })
});

/**
 * Tone resolution rules mapped by intent identifier.
 * @readonly
 */
const INTENT_TONE_MAP = Object.freeze({
    greeting: 'friendly',
    help: 'supportive',
    coaching: 'empathetic',
    gratitude: 'appreciative',
    personality: 'analytical',
    membership: 'informative',
    farewell: 'warm',
    unknown: 'neutral'
});

/**
 * Objective resolution rules mapped by intent identifier.
 * @readonly
 */
const INTENT_OBJECTIVE_MAP = Object.freeze({
    greeting: Object.freeze({ primary: 'welcome', secondary: 'orient' }),
    help: Object.freeze({ primary: 'assist', secondary: 'guide' }),
    coaching: Object.freeze({ primary: 'guide', secondary: 'educate' }),
    gratitude: Object.freeze({ primary: 'acknowledge', secondary: 'maintain-rapport' }),
    personality: Object.freeze({ primary: 'explain', secondary: 'profile' }),
    membership: Object.freeze({ primary: 'inform', secondary: 'convert' }),
    farewell: Object.freeze({ primary: 'close', secondary: 'reassure' }),
    unknown: DEFAULT_OBJECTIVE
});

/**
 * Coach Strategy Engine Singleton Service.
 * Resolves context input into deterministic communication strategies.
 */
const CoachStrategy = (() => {

    /**
     * Resolves appropriate coach persona based on preferences, membership, and intent.
     * Priority: Preferences -> Membership specializations -> Intent steering -> Default fallback.
     * 
     * @param {Object} preferences - Preferences contract from context.
     * @param {Object} identity - Identity contract from context.
     * @param {Object} intent - Intent contract from context.
     * @returns {Object} Resolved coach configuration.
     * @private
     */
    function resolveCoach(preferences, identity, intent) {
        // 1. Check explicit user preference with defensive type validation
        if (preferences && typeof preferences.coach === 'string' && COACH_REGISTRY[preferences.coach]) {
            return {
                ...COACH_REGISTRY[preferences.coach],
                matchedBy: 'preference'
            };
        }

        // 2. Check scalable membership-based specialization rules
        const membership = (identity && identity.membership ? identity.membership : 'free').toLowerCase();
        if (PREMIUM_TIERS.has(membership)) {
            return {
                ...COACH_REGISTRY['Dr. Aria'],
                matchedBy: 'membership-tier'
            };
        }

        // 3. Intent-based persona steering (e.g., personality intent -> Coach Atlas)
        if (intent && intent.id === 'personality') {
            return {
                ...COACH_REGISTRY['Coach Atlas'],
                matchedBy: 'intent-steering'
            };
        }

        // 4. Default fallback coach
        return {
            ...DEFAULT_COACH,
            matchedBy: 'default-fallback'
        };
    }

    /**
     * Resolves communication tone based on intent.
     * 
     * @param {string} intentId - Classified intent identifier.
     * @returns {string} Resolved communication tone.
     * @private
     */
    function resolveTone(intentId) {
        return INTENT_TONE_MAP[intentId] || 'neutral';
    }

    /**
     * Resolves primary and secondary objectives based on intent using centralized fallback.
     * 
     * @param {string} intentId - Classified intent identifier.
     * @returns {Object} Resolved objectives contract.
     * @private
     */
    function resolveObjective(intentId) {
        return INTENT_OBJECTIVE_MAP[intentId] || DEFAULT_OBJECTIVE;
    }

    /**
     * Resolves communication style and verbosity based on user personality traits.
     * 
     * @param {Object} identity - Identity contract.
     * @returns {Object} Communication style configuration.
     * @private
     */
    function resolveCommunicationStyle(identity) {
        const personality = identity && identity.personality ? identity.personality.toLowerCase() : '';
        
        let style = 'structured';
        let verbosity = 'normal';

        if (personality.includes('melankolis') || personality.includes('analitis')) {
            style = 'analytical';
            verbosity = 'detailed';
        } else if (personality.includes('sanguinis')) {
            style = 'conversational';
            verbosity = 'concise';
        } else if (personality.includes('koleris')) {
            style = 'direct';
            verbosity = 'concise';
        } else if (personality.includes('plegmatis')) {
            style = 'calm';
            verbosity = 'normal';
        }

        return {
            style,
            verbosity
        };
    }

    /**
     * Resolves strategy contract from a given conversation context.
     * Pure function: Deterministic mapping of explicit context input to strategy contract.
     * 
     * @param {Object} context - Conversation context contract from CoachContext.
     * @returns {Object} Immutable strategy contract object.
     */
    function resolve(context) {
        const safeContext = context && typeof context === 'object' ? context : {};
        const intent = safeContext.intent || { id: 'unknown' };
        const identity = safeContext.identity || {};
        const preferences = safeContext.preferences || {};

        const coachConfig = resolveCoach(preferences, identity, intent);
        const tone = resolveTone(intent.id);
        const objective = resolveObjective(intent.id);
        const commStyle = resolveCommunicationStyle(identity);

        return Object.freeze({
            coach: Object.freeze({
                id: coachConfig.id,
                persona: coachConfig.persona,
                source: coachConfig.matchedBy
            }),
            communication: Object.freeze({
                tone,
                style: commStyle.style,
                verbosity: commStyle.verbosity
            }),
            objective: Object.freeze({
                primary: objective.primary,
                secondary: objective.secondary
            }),
            response: Object.freeze({
                mode: 'conversation',
                deterministic: true
            }),
            metadata: Object.freeze({
                version: STRATEGY_SCHEMA_VERSION,
                strategyRule: coachConfig.matchedBy,
                intentRule: intent.id
            })
        });
    }

    return Object.freeze({
        resolve
    });
})();

export default CoachStrategy;