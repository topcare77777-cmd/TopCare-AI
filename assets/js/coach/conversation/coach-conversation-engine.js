/**
 * TOPCARE AI PLATFORM V2 — CONVERSATIONAL COACHING ENGINE
 * Path: assets/js/coach/conversation/coach-conversation-engine.js
 * Version: 148.0.0 (HOTFIX BUILD — _getSafePersonality & Question-First Architecture)
 * Status: APPROVED & FULL REPLACEMENT
 * SRP: Current-intent-first, stateful, multi-signal orchestrator for TopCare AI Coach.
 */

import * as MemoryModule from '../memory/coach-memory-engine.js';
import * as PersonalizationRulesModule from '../personalization/coach-personalization-rules.js';

export class CoachConversationEngine {
    constructor() {
        // Safe Memory Resolver
        const TargetMemory = MemoryModule.CoachMemoryEngine || MemoryModule.coachMemoryEngine || MemoryModule.default;
        if (typeof TargetMemory === 'function') {
            try { this.memoryEngine = new TargetMemory(); } catch (e) { this.memoryEngine = TargetMemory; }
        } else if (TargetMemory && typeof TargetMemory === 'object') {
            this.memoryEngine = TargetMemory;
        } else {
            this.memoryEngine = { getRecentTurns: () => [], getCurrentStage: () => 'OPENING', setStage: () => { }, addTurn: () => { }, clear: () => { } };
        }

        // Safe Personalization Rules Resolver
        const TargetRules = PersonalizationRulesModule.CoachPersonalizationRules ||
            PersonalizationRulesModule.CoachPersonalizationRulesEngine ||
            PersonalizationRulesModule.default;
        if (typeof TargetRules === 'function') {
            try { this.personalizationRules = new TargetRules(); } catch (e) { this.personalizationRules = TargetRules; }
        } else if (TargetRules && typeof TargetRules === 'object') {
            this.personalizationRules = TargetRules;
        } else {
            this.personalizationRules = null;
        }

        this.internalMemory = {
            turns: [],
            extractedSkills: new Set(),
            activeTopic: null
        };
    }

    /**
     * Public API consumed by coach.page.js
     */
    processInput(userInput) {
        const rawText = String(userInput || '').trim();
        if (!rawText) return "Halo! Ada yang bisa aku bantu hari ini?";

        // 1. NORMALIZE & STT TOLERANCE
        const normalizedInput = this._normalize(rawText);

        // 2. GREETING GATE (PRIORITY 0)
        if (this._isGreeting(normalizedInput)) {
            const resp = "Halo! Senang kamu datang. Ada yang ingin kamu ceritakan atau diskusikan hari ini?";
            this._updateMemory('OPENING', 'GREETING', 'NEUTRAL', 'GENERAL', rawText, resp);
            return resp;
        }

        // 3. SHORT-TERM MEMORY & CONTINUITY
        const recentTurns = (this.memoryEngine && typeof this.memoryEngine.getRecentTurns === 'function')
            ? (this.memoryEngine.getRecentTurns(5) || [])
            : this.internalMemory.turns.slice(-5);

        // 4. SIGNAL EXTRACTION
        const signals = this._extractSignals(normalizedInput);

        // 5. CONTEXT CONTINUITY INJECTION (Enrichment Only)
        if (!signals.domain && this.internalMemory.activeTopic) {
            signals.domain = this.internalMemory.activeTopic;
        }

        // 6. INTENT CLASSIFICATION
        const intent = this._classifyIntent(normalizedInput, signals);

        // 7. STAGE EVOLUTION
        const nextStage = this._evolveStage(intent, signals);

        // 8. PERSONALITY RELEVANCE GATE
        const userPersonality = this._getSafePersonality();
        const isPersonalityRelevant = this._evaluatePersonalityRelevance(normalizedInput, signals, intent);

        // 9. RESPONSE STRATEGY SELECTION
        const strategy = this._selectStrategy(intent, signals);

        // 10. NATURAL RESPONSE COMPOSITION
        const response = this._composeResponse(normalizedInput, signals, strategy, intent, userPersonality, isPersonalityRelevant);

        // 11. STATE & MEMORY UPDATE
        if (signals.domain) this.internalMemory.activeTopic = signals.domain;
        this._updateMemory(nextStage, intent, signals.primaryEmotion, signals.domain, rawText, response);

        return response;
    }

    clearHistory() {
        if (this.memoryEngine && typeof this.memoryEngine.clear === 'function') {
            try { this.memoryEngine.clear(); } catch (e) { }
        }
        this.internalMemory.turns = [];
        this.internalMemory.extractedSkills.clear();
        this.internalMemory.activeTopic = null;
    }

    // =========================================================================
    // INTERNAL PIPELINE
    // =========================================================================

    /**
     * Resolves personality data defensively to prevent runtime errors.
     */
    _getSafePersonality() {
        try {
            return localStorage.getItem('user_personality') || null;
        } catch (e) {
            return null;
        }
    }

    _normalize(text) {
        let n = text.toLowerCase().replace(/[.!?,]/g, ' ').replace(/\s+/g, ' ').trim();
        n = n.replace(/\b(skirku|skilku|skil ku|skill ku)\b/g, 'skillku');
        n = n.replace(/\b(prom e)\b/g, 'prompt');
        n = n.replace(/\b(e book|e-book)\b/g, 'ebook');
        n = n.replace(/\b(gimana)\b/g, 'bagaimana');
        n = n.replace(/\b(ga|gak|nggak|ngga|ndak)\b/g, 'tidak');
        n = n.replace(/\b(duit|cuan|pendapatan)\b/g, 'uang');
        return n;
    }

    _isGreeting(text) {
        const greetings = ['halo', 'hai', 'hello', 'hi', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'pagi', 'siang', 'sore', 'malam'];
        return greetings.some(g => text === g || text.startsWith(g + ' ') || text === g + ' coach' || text === g + ' guys');
    }

    _extractSignals(norm) {
        const sig = {
            isExplicitQuestion: false,
            isClarification: false,
            isSharing: false,
            isMonetization: false,
            isDigitalProduct: false,
            isContextSetup: false,
            isCurrentMarket: false,
            domain: null,
            lifeEvents: [],
            emotions: [],
            primaryEmotion: 'NEUTRAL',
            isPersonalityExplicit: false
        };

        // EXPLICIT QUESTION DETECTION
        const qPatterns = [/\bapa\b/, /\bbagaimana\b/, /\bkenapa\b/, /\bmengapa\b/, /\bkapan\b/, /\bapakah\b/, /\bbisa\b/, /\bboleh\b/, /\bcocok\b/, /kira kira/, /menurut(mu| kamu)/, /caranya/, /cara /];
        if (norm.includes('?') || qPatterns.some(p => p.test(norm))) sig.isExplicitQuestion = true;

        // CLARIFICATION
        if (norm.match(/maksud(nya| kamu|mu) apa/) || norm.match(/apa maksud(nya|mu)/) || norm.match(/kurang paham/) || norm.match(/jelaskan lagi/)) {
            sig.isClarification = true;
        }

        // EXPLICIT SETUP & SHARING
        if (norm.match(/mau tanya tentang( peluang)? (bisnis|usaha|kerja)/) || norm.match(/tanya tentang (bisnis|usaha)/)) sig.isContextSetup = true;
        if (norm.match(/mau sharing/) || norm.match(/ingin cerita/) || norm.match(/mau cerita/) || norm.match(/cuma mau cerita/)) sig.isSharing = true;

        // CURRENT MARKET
        if (norm.match(/\b(kondisi sekarang|saat ini|trend|zaman sekarang)\b/)) sig.isCurrentMarket = true;

        // MONETIZATION & DIGITAL PRODUCT
        if (norm.match(/menghasilkan uang|cari uang|dapat uang|monetisasi|dijual|menjual|jual|laku/)) sig.isMonetization = true;
        if (norm.match(/ebook|prompt|template|produk digital/)) sig.isDigitalProduct = true;

        // DOMAIN DETECTION
        if (norm.match(/\b(bisnis|usaha|jualan|produk digital|peluang bisnis)\b/)) sig.domain = 'BUSINESS';
        else if (norm.match(/\b(kerja|pekerjaan|karier|karir|freelance|remote|uang|skillku|keterampilan)\b/) || norm.includes('dari rumah')) {
            sig.domain = 'CAREER';
        }

        // LIFE EVENTS
        if (norm.match(/\b(phk|kehilangan pekerjaan|kehilangan kerja|dipecat|penganggur(an)?|belum dapat kerja)\b/)) sig.lifeEvents.push('JOB_LOSS');

        // EMOTIONS
        if (norm.match(/\b(malu|takut|cemas|khawatir|bingung|lelah|capek|frustrasi|kecewa|sedih|tertekan|minder)\b/) || norm.includes('kurang percaya diri') || norm.includes('tidak percaya diri') || norm.includes('kehilangan arah')) {
            sig.emotions.push('DISTRESS');
            if (norm.match(/malu|takut diejek|takut dinilai/)) sig.primaryEmotion = 'SOCIAL_FEAR';
            else if (norm.includes('sedih')) sig.primaryEmotion = 'SADNESS';
            else if (norm.includes('bingung') || norm.includes('kehilangan arah')) sig.primaryEmotion = 'CONFUSION';
            else sig.primaryEmotion = 'GENERAL_DISTRESS';
        }

        // PERSONALITY
        if (norm.match(/\b(introvert|ekstrovert|ambivert|melankolis|sanguinis|koleris|plegmatis|kepribadian|mbti)\b/)) sig.isPersonalityExplicit = true;

        // SKILL CAPTURE
        if (norm.match(/microsoft office|excel|word|powerpoint/)) this.internalMemory.extractedSkills.add('Microsoft Office');
        if (norm.match(/web|html|javascript|website/)) this.internalMemory.extractedSkills.add('Pembuatan Web');

        return sig;
    }

    _classifyIntent(norm, sig) {
        if (sig.isClarification) return 'CLARIFICATION_REQUEST';
        if (norm.includes('terima kasih') || norm.includes('makasih')) return 'THANKS';

        // EXPLICIT QUESTION HIGHEST PRIORITY
        if (sig.isExplicitQuestion || norm.includes('ada cara lain')) {
            if (sig.domain === 'BUSINESS') return 'BUSINESS_OPPORTUNITY_QUERY';
            if (sig.isDigitalProduct && sig.isMonetization) return 'DIGITAL_PRODUCT_MONETIZATION';
            if (sig.isMonetization) return 'MONETIZATION_QUERY';
            if (norm.match(/mulai dari mana|harus bagaimana|bagaimana cara|cara mengatasi|biar bisa|langkah pertama|saran lain/)) return 'GUIDANCE_REQUEST';
            if (sig.domain === 'CAREER') return 'CAREER_QUESTION';
            if (sig.isPersonalityExplicit) return 'PERSONALITY_QUERY';
            if (norm.match(/bisa tidak|apa bisa/)) return 'FEASIBILITY_QUESTION';
            return 'GENERAL_QUESTION';
        }

        if (sig.isContextSetup) return 'CONTEXTUAL_QUESTION_SETUP';
        if (sig.lifeEvents.length > 0) return 'LIFE_EVENT';
        if (sig.emotions.length > 0) return 'EMOTIONAL_DISCLOSURE';
        if (sig.isPersonalityExplicit) return 'PERSONALITY_STATEMENT';

        // SHARING GATE
        if (sig.isSharing) return 'SHARING';

        return 'UNKNOWN';
    }

    _evolveStage(intent, sig) {
        if (intent === 'SHARING') return 'LISTENING';
        if (sig.emotions.length > 0 || sig.lifeEvents.length > 0) return 'VALIDATION';
        if (sig.isExplicitQuestion || intent === 'GUIDANCE_REQUEST') return 'GUIDANCE';
        return 'EXPLORATION';
    }

    _evaluatePersonalityRelevance(norm, sig, intent) {
        if (sig.isPersonalityExplicit) return true;
        return false;
    }

    _selectStrategy(intent, sig) {
        if (intent === 'CLARIFICATION_REQUEST') return 'CLARIFY_PREVIOUS';
        if (intent === 'CONTEXTUAL_QUESTION_SETUP') return 'LISTEN_READY';
        if (intent === 'SHARING' && !sig.isExplicitQuestion) return 'LISTEN';

        if (sig.isExplicitQuestion || intent === 'GUIDANCE_REQUEST' || intent.includes('QUESTION')) {
            if (sig.emotions.length > 0 || sig.lifeEvents.length > 0) return 'VALIDATE_GUIDE';
            if (intent === 'BUSINESS_OPPORTUNITY_QUERY') return 'ANSWER_GUIDE';
            if (intent === 'DIGITAL_PRODUCT_MONETIZATION' || intent === 'MONETIZATION_QUERY' || intent === 'CAREER_QUESTION' || intent === 'FEASIBILITY_QUESTION') return 'ANSWER_GUIDE';
            if (intent === 'GUIDANCE_REQUEST') return 'GUIDE';
            if (intent === 'PERSONALITY_QUERY') return 'INSIGHT_GUIDE';
            return 'ANSWER';
        }

        if (intent === 'LIFE_EVENT' || intent === 'EMOTIONAL_DISCLOSURE') return 'VALIDATE';
        if (intent === 'PERSONALITY_STATEMENT') return 'INSIGHT';

        return 'CONVERSATIONAL_OPENER';
    }

    _composeResponse(norm, sig, strategy, intent, userPersonality, isPersonalityRelevant) {
        const skillsText = Array.from(this.internalMemory.extractedSkills).join(' dan ');

        // 1. CLARIFY & SETUP
        if (strategy === 'CLARIFY_PREVIOUS') return "Maksudku, dari obrolan kita, kamu bisa mulai melangkah ke depan tanpa harus menunggu semuanya sempurna. Ada banyak hal dari dirimu yang sudah bisa dimanfaatkan.";
        if (strategy === 'LISTEN_READY') return "Tentu, silakan tanya. Bagian bisnis atau peluang apa yang ingin kamu diskusikan?";
        if (strategy === 'LISTEN') return "Boleh. Ceritakan saja, aku dengarkan.";

        // 2. BUSINESS / CURRENT MARKET (STATIC)
        if (intent === 'BUSINESS_OPPORTUNITY_QUERY') {
            let resp = "Tidak ada satu bisnis yang pasti paling bagus untuk semua orang. ";
            if (sig.isCurrentMarket) {
                resp += "Namun untuk kondisi saat ini, dengan pendekatan modal rendah, bisnis jasa digital, penjualan produk digital, atau menjadi reseller dengan niche tertentu layak dipertimbangkan. ";
            } else {
                resp += "Bisnis jasa digital, kreator konten, atau penyedia layanan B2B bisa menjadi titik awal yang baik jika modal terbatas. ";
            }
            if (skillsText) resp += `Apalagi kamu sudah punya keahlian ${skillsText}, itu bisa dimanfaatkan sebagai modal awal.`;
            return resp;
        }

        // 3. MONETIZATION & DIGITAL PRODUCT
        if (intent === 'DIGITAL_PRODUCT_MONETIZATION') {
            return "Ya, sangat bisa. Produk digital seperti ebook atau prompt memiliki pasar yang jelas. Kamu bisa memulainya dengan membagikan keahlian yang sudah kamu kuasai, lalu menawarkannya melalui platform digital.";
        }
        if (intent === 'MONETIZATION_QUERY') {
            return `Ya, bisa. ${skillsText ? `Menggunakan skill ${skillsText}, kamu` : 'Dengan keahlianmu, kamu'} bisa mendapatkan penghasilan dari pekerjaan seperti administrasi remote, pengolahan data, virtual assistant, atau pekerjaan freelance sederhana. Supaya lebih mudah mendapatkan klien, mulailah dengan membuat 2–3 portofolio.`;
        }

        // 4. EMOTIONAL & LIFE EVENTS (VALIDATE_GUIDE / VALIDATE)
        if (strategy === 'VALIDATE_GUIDE') {
            if (sig.lifeEvents.includes('JOB_LOSS')) {
                return "Kena PHK memang bisa membuat seseorang kehilangan arah. Wajar kalau sekarang kamu bingung. Kita tidak perlu menyelesaikan semuanya sekaligus. Dari pengalaman yang kamu sudah punya, kita bisa mulai mencari beberapa pilihan yang realistis.";
            }
            if (sig.emotions.includes('DISTRESS') && sig.isPersonalityExplicit) {
                return "Berkomunikasi dengan banyak orang memang bisa terasa menguras energi. Kamu tidak harus memaksakan diri menjadi sangat aktif. Mulailah dari interaksi dalam kelompok kecil, siapkan topik sebelum berbicara, dan beri dirimu waktu jeda untuk memulihkan energi setelahnya.";
            }
            return "Aku paham perasaanmu. Rasa cemas dan ketakutan itu wajar. Kita bisa menghadapinya perlahan dengan mulai dari hal-hal yang masih ada di bawah kendalimu hari ini.";
        }

        // 5. CAREER ANSWERS
        if (strategy === 'ANSWER_GUIDE' || intent === 'CAREER_QUESTION') {
            if (norm.match(/bekerja dari rumah saja|malas bekerja di luar/)) {
                return "Sangat bisa. Saat ini peluang kerja jarak jauh (remote work) atau proyek freelance dari rumah makin luas. Memilih bekerja dari rumah bukan berarti membatasi diri, melainkan menyesuaikan lingkungan kerja agar lebih nyaman.";
            }
            return "Pekerjaan yang bisa dilakukan dari rumah sangat beragam, seperti admin online, desainer, penulis, atau asisten virtual. Hal terpenting adalah menyesuaikannya dengan keahlian yang paling membuatmu nyaman bekerja.";
        }

        // 6. VALIDATION ONLY
        if (strategy === 'VALIDATE') {
            if (sig.primaryEmotion === 'SOCIAL_FEAR') return "Aku paham. Takut dinilai atau merasa malu memang bisa membuat kepercayaan diri menurun. Kamu tidak harus memaksakan diri di situasi besar; mulailah dari langkah kecil yang terasa aman.";
            if (sig.primaryEmotion === 'SADNESS') return "Aku mengerti. Merasa sedih dan lelah secara emosional adalah reaksi manusiawi ketika kita menghadapi tekanan. Berikan dirimu waktu untuk merasakan emosi tersebut tanpa harus memaksakan diri.";
            return "Aku memahami situasi yang kamu hadapi. Rasa tidak nyaman itu wajar dirasakan dalam kondisi seperti ini.";
        }

        // 7. PERSONALITY INSIGHT
        if (strategy === 'INSIGHT_GUIDE' || strategy === 'INSIGHT') {
            if (sig.domain === 'CAREER' && isPersonalityRelevant) {
                const pType = userPersonality ? userPersonality : 'tipe kepribadianmu';
                return `Kalau kamu merasa lebih nyaman dengan interaksi yang tidak terlalu intens, beberapa pekerjaan seperti analis data, penulis, atau admin mungkin terasa lebih sesuai untuk ${pType}. Namun ingat, kepribadian hanyalah salah satu faktor pendukung.`;
            }
            return "Memahami tipe kepribadian memang membantu kita menyadari cara kita merespons situasi. Hal terpenting adalah menemukan ritme yang pas agar kamu tidak mudah merasa kelelahan.";
        }

        if (strategy === 'GUIDE') return "Untuk memulainya, kamu tidak perlu memikirkan keseluruhan proses hingga akhir. Tentukan satu langkah paling sederhana yang bisa kamu lakukan hari ini.";

        if (strategy === 'ANSWER') return "Itu pertanyaan yang menarik. Kita bisa mulai dengan mengidentifikasi sumber daya dan keahlian yang kamu miliki saat ini untuk melihat langkah apa yang paling realistis.";

        // CONVERSATIONAL_OPENER (UNKNOWN FALLBACK)
        return "Baik, aku ikut memahami arah pembicaraanmu. Kalau kamu mau, kita bisa membahasnya lebih spesifik.";
    }

    _updateMemory(stage, intent, emotion, domain, rawText, response) {
        const turnData = { user: rawText, assistant: response, intent, emotion, stage, domain, timestamp: Date.now() };
        this.internalMemory.turns.push(turnData);
        if (this.memoryEngine && typeof this.memoryEngine.addTurn === 'function') {
            try { this.memoryEngine.addTurn(turnData); } catch (e) { }
        }
        if (this.memoryEngine && typeof this.memoryEngine.setStage === 'function') {
            try { this.memoryEngine.setStage(stage); } catch (e) { }
        }
    }
}

export default new CoachConversationEngine();