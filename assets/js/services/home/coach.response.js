/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Response Composer)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 49A.4
 * 
 * Description  : Deterministic, stateless response composer service.
 *                Takes ConversationContext and CoachStrategy contracts, 
 *                resolves template segments, injects identity variables, 
 *                and yields a standardized Response Contract.
 * -----------------------------------------------------------------
 */

/**
 * Response Composer Schema Version.
 * @type {string}
 */
const RESPONSE_SCHEMA_VERSION = '1.0.0';

/**
 * Deterministic template registry mapped by intent identifier.
 * Supports placeholder variables like {displayName}, {membership}, {personality}.
 * @readonly
 */
const RESPONSE_TEMPLATES = Object.freeze({
    greeting: Object.freeze({
        greeting: 'Halo, {displayName}. Senang bertemu kembali dengan Anda.',
        body: 'Bagaimana perkembangan tujuan dan fokus Anda hari ini?',
        closing: 'Silakan sampaikan apa yang ingin kita bahas bersama.'
    }),
    help: Object.freeze({
        greeting: 'Halo, {displayName}.',
        body: 'Saya siap membantu memberikan panduan dan arahan sesuai kebutuhan Anda.',
        closing: 'Silakan jelaskan kendala atau topik yang ingin Anda eksplorasi.'
    }),
    coaching: Object.freeze({
        greeting: 'Halo, {displayName}. Mari kita fokus pada pengembangan diri Anda.',
        body: 'Berdasarkan pendekatan profil Anda, mari kita bedah tantangan karier atau tujuan hidup Anda secara terstruktur.',
        closing: 'Apa langkah awal atau hambatan utama yang sedang Anda hadapi saat ini?'
    }),
    personality: Object.freeze({
        greeting: 'Halo, {displayName}.',
        body: 'Analisis kepribadian dan temperamen seperti {personality} memegang peranan penting dalam pola komunikasi dan pengambilan keputusan Anda.',
        closing: 'Apakah Anda ingin mendalami karakteristik tersebut lebih jauh hari ini?'
    }),
    membership: Object.freeze({
        greeting: 'Halo, {displayName}.',
        body: 'Status keanggotaan Anda saat ini adalah {membership}. Keanggotaan ini membuka akses penuh ke berbagai fitur eksklusif platform.',
        closing: 'Ada bagian dari layanan atau fitur premium yang ingin Anda maksimalkan?'
    }),
    gratitude: Object.freeze({
        greeting: 'Sama-sama, {displayName}.',
        body: 'Senang bisa mendampingi proses refleksi dan pengembangan diri Anda.',
        closing: 'Jangan ragu untuk kembali kapan pun Anda membutuhkan sesi lanjutan.'
    }),
    farewell: Object.freeze({
        greeting: 'Sampai jumpa kembali, {displayName}.',
        body: 'Tetap jaga semangat dan konsistensi dalam mencapai tujuan Anda.',
        closing: 'Saya akan selalu siap sedia kapan pun Anda memerlukan sesi coaching berikutnya.'
    }),
    unknown: Object.freeze({
        greeting: 'Halo, {displayName}.',
        body: 'Saya menangkap pesan Anda, namun mari kita arahkan fokus pada tujuan pengembangan, karier, atau eksplorasi potensi diri.',
        closing: 'Bagaimana saya dapat membantu mengarahkan sesi kita hari ini?'
    })
});

/**
 * Helper to replace template placeholder variables with actual context values.
 * 
 * @param {string} templateStr - Raw template string containing placeholders.
 * @param {Object} identity - Identity contract from context.
 * @returns {string} Interpolated clean string.
 */
function interpolate(templateStr, identity) {
    if (typeof templateStr !== 'string') return '';
    const name = identity?.displayName || 'Guest';
    const membership = identity?.membership || 'free';
    const personality = identity?.personality || 'umum';

    return templateStr
        .replace(/{displayName}/g, name)
        .replace(/{membership}/g, membership)
        .replace(/{personality}/g, personality);
}

/**
 * Coach Response Composer Singleton Service.
 * Composes deterministic responses from immutable context and strategy contracts.
 */
const CoachResponse = (() => {

    /**
     * Resolves greeting segment based on intent template and identity.
     * 
     * @param {string} intentId - Classified intent identifier.
     * @param {Object} identity - Identity contract.
     * @returns {string} Resolved greeting sentence.
     */
    function resolveGreeting(intentId, identity) {
        const template = RESPONSE_TEMPLATES[intentId] || RESPONSE_TEMPLATES.unknown;
        return interpolate(template.greeting, identity);
    }

    /**
     * Resolves body segment based on intent template and identity.
     * 
     * @param {string} intentId - Classified intent identifier.
     * @param {Object} identity - Identity contract.
     * @returns {string} Resolved body sentence.
     */
    function resolveBody(intentId, identity) {
        const template = RESPONSE_TEMPLATES[intentId] || RESPONSE_TEMPLATES.unknown;
        return interpolate(template.body, identity);
    }

    /**
     * Resolves closing segment based on intent template and identity.
     * 
     * @param {string} intentId - Classified intent identifier.
     * @param {Object} identity - Identity contract.
     * @returns {string} Resolved closing sentence.
     */
    function resolveClosing(intentId, identity) {
        const template = RESPONSE_TEMPLATES[intentId] || RESPONSE_TEMPLATES.unknown;
        return interpolate(template.closing, identity);
    }

    /**
     * Composes a unified Response Contract from conversation context and strategy contracts.
     * Pure function: Deterministic mapping of explicit inputs to response contract.
     * 
     * @param {Object} context - Conversation context contract from CoachContext.
     * @param {Object} strategy - Strategy contract from CoachStrategy.
     * @returns {Object} Immutable standardized response contract.
     */
    function compose(context, strategy) {
        const safeContext = context && typeof context === 'object' ? context : {};
        const safeStrategy = strategy && typeof strategy === 'object' ? strategy : {};

        const intentId = safeContext.intent?.id || 'unknown';
        const identity = safeContext.identity || {};

        // Resolve individual response segments
        const greetingLine = resolveGreeting(intentId, identity);
        const bodyLine = resolveBody(intentId, identity);
        const closingLine = resolveClosing(intentId, identity);

        // Combine segments into a coherent plain text response
        const fullText = [greetingLine, bodyLine, closingLine].filter(Boolean).join(' ');

        const coachInfo = safeStrategy.coach || { id: 'coach-kael', persona: 'standard-guide' };
        const commInfo = safeStrategy.communication || { tone: 'neutral', style: 'structured', verbosity: 'normal' };
        const objInfo = safeStrategy.objective || { primary: 'assist', secondary: 'clarify' };

        return Object.freeze({
            text: fullText,
            coach: Object.freeze({
                id: coachInfo.id,
                persona: coachInfo.persona
            }),
            communication: Object.freeze({
                tone: commInfo.tone,
                style: commInfo.style,
                verbosity: commInfo.verbosity
            }),
            objective: Object.freeze({
                primary: objInfo.primary,
                secondary: objInfo.secondary
            }),
            metadata: Object.freeze({
                version: RESPONSE_SCHEMA_VERSION,
                generatedBy: 'template-engine',
                template: intentId,
                coach: coachInfo.id,
                deterministic: true
            })
        });
    }

    return Object.freeze({
        resolveGreeting,
        resolveBody,
        resolveClosing,
        compose
    });
})();

export default CoachResponse;