/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Intent Classifier)
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 49A.1
 * Last Updated : Sprint 49A.1 (Final Hardened)
 * 
 * Description  : Deterministic, stateless intent classification service.
 *                Normalizes input text, applies precision token-based rule matching, 
 *                and returns a structured, immutable intent contract.
 * -----------------------------------------------------------------
 */

/**
 * @typedef {Object} IntentEntity
 * @property {string} type - Entity classification category.
 * @property {string} value - Matched token or text value.
 */

/**
 * @typedef {Object} IntentResult
 * @property {string} id - Identifier of the classified intent.
 * @property {number} confidence - Confidence score between 0.0 and 1.0.
 * @property {IntentEntity[]} entities - Extracted entities or tokens.
 * @property {Object} metadata - Processing metadata and audit trail.
 * @property {string} metadata.matchedBy - Matching technique applied ('rule' or 'fallback').
 * @property {string|null} metadata.ruleId - Identifier of the matched rule schema.
 * @property {string} metadata.version - Rule definition schema version.
 */

/**
 * Static Intent Rule Definitions with explicit confidence scoring and audit metadata.
 * @readonly
 */
const INTENT_RULES = Object.freeze([
    {
        id: 'greeting',
        confidence: 1.0,
        keywords: ['halo', 'hai', 'hi', 'hallo', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'pagi', 'siang', 'sore', 'malam']
    },
    {
        id: 'farewell',
        confidence: 1.0,
        keywords: ['sampai jumpa', 'dadah', 'bye', 'goodbye', 'daah', 'pamit', 'sampai ketemu']
    },
    {
        id: 'gratitude',
        confidence: 1.0,
        keywords: ['terima kasih', 'terimakasih', 'makasih', 'thanks', 'thank you', 'trims']
    },
    {
        id: 'help',
        confidence: 0.95,
        keywords: ['bantu', 'bantuan', 'help', 'tolong', 'panduan', 'cara pakai', 'fitur']
    },
    {
        id: 'coaching',
        confidence: 0.90,
        keywords: ['bingung', 'karier', 'karir', 'tujuan', 'goal', 'fokus', 'masalah', 'solusi', 'curhat', 'saran', 'konsultasi', 'bimbingan', 'arah']
    },
    {
        id: 'personality',
        confidence: 0.95,
        keywords: ['koleris', 'sanguinis', 'melankolis', 'plegmatis', 'temperamen', 'kepribadian', 'sifat', 'karakter']
    },
    {
        id: 'membership',
        confidence: 0.95,
        keywords: ['premium', 'pro', 'membership', 'langganan', 'bayar', 'fitur pro', 'upgrade']
    }
]);

/**
 * Default fallback intent structure returned when no rules match.
 * @readonly
 * @type {IntentResult}
 */
const UNKNOWN_INTENT = Object.freeze({
    id: 'unknown',
    confidence: 0.0,
    entities: [],
    metadata: Object.freeze({
        matchedBy: 'fallback',
        ruleId: null,
        version: '1.1.0'
    })
});

/**
 * Normalizes input text by trimming, lowercasing, and cleaning special punctuation.
 * @param {string} text - Raw input text.
 * @returns {string} Cleaned normalized string.
 */
function normalizeText(text) {
    if (typeof text !== 'string') return '';
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, ' ')
        .replace(/\s+/g, ' ');
}

/**
 * Coach Intent Classifier Singleton Service.
 * Pure stateless function wrapper adhering to standard contract interfaces.
 */
const CoachIntent = (() => {

    /**
     * Detects intent from a raw message input using deterministic precision rule matching.
     * Pure function: Input -> Output mapping without side effects.
     * 
     * @param {string} message - User input text message.
     * @returns {IntentResult} Immutable intent result contract object.
     */
    function detect(message) {
        const normalized = normalizeText(message);

        if (!normalized) {
            return {
                id: UNKNOWN_INTENT.id,
                confidence: UNKNOWN_INTENT.confidence,
                entities: [...UNKNOWN_INTENT.entities],
                metadata: { ...UNKNOWN_INTENT.metadata }
            };
        }

        const tokens = normalized.split(' ');

        for (const rule of INTENT_RULES) {
            // Check precision matching: support both multi-word phrases and exact/token boundaries
            const matchedKeyword = rule.keywords.find(kw => {
                const kwTokens = kw.split(' ');
                if (kwTokens.length === 1) {
                    return tokens.includes(kw);
                }
                // For multi-word phrases, check substring containment on normalized text
                return normalized.includes(kw);
            });

            if (matchedKeyword) {
                return {
                    id: rule.id,
                    confidence: rule.confidence,
                    entities: [
                        {
                            type: 'keyword',
                            value: matchedKeyword
                        }
                    ],
                    metadata: {
                        matchedBy: 'rule',
                        ruleId: rule.id,
                        version: '1.1.0'
                    }
                };
            }
        }

        return {
            id: UNKNOWN_INTENT.id,
            confidence: UNKNOWN_INTENT.confidence,
            entities: [...UNKNOWN_INTENT.entities],
            metadata: { ...UNKNOWN_INTENT.metadata }
        };
    }

    return Object.freeze({
        detect
    });
})();

export default CoachIntent;