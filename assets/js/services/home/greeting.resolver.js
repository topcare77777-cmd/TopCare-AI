/**
 * TOPCARE AI PLATFORM V2 — DATA-DRIVEN GREETING RESOLVER
 * Path: assets/js/services/home/greeting.resolver.js
 * Role: Resolves Personalized Greeting from Catalog & Rules Engine
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

const GREETING_CATALOG = Object.freeze({
    guest: "Selamat datang di TopCare AI. Silakan masuk untuk sesi bimbingan berbasis kepribadian.",
    templates: Object.freeze({
        koleris: "Selamat datang, {name}. Mari langsung fokus pada target pengembangan diri Anda hari ini.",
        sanguinis: "Halo {name}! Antusias sekali bisa kembali mendampingi sesi bimbingan Anda hari ini!",
        melankolis: "Selamat datang kembali, {name}. Mari kita susun langkah terencana untuk tujuan Anda hari ini.",
        plegmatis: "Halo {name}, tenang dan santai saja. Mari kita diskusikan kemajuan Anda secara perlahan."
    })
});

const GREETING_RULES_ENGINE = {
    selectTemplateKey(identityPayload) {
        if (!identityPayload || !identityPayload.isLoggedIn) {
            return 'guest';
        }
        const type = (identityPayload.personality || identityPayload.temperament || 'plegmatis').toLowerCase();
        return GREETING_CATALOG.templates[type] ? type : 'plegmatis';
    }
};

export const GreetingResolver = {
    resolve(identityPayload) {
        const key = GREETING_RULES_ENGINE.selectTemplateKey(identityPayload);
        if (key === 'guest') {
            return GREETING_CATALOG.guest;
        }

        const name = identityPayload.displayName || identityPayload.name || 'Rekan';
        const template = GREETING_CATALOG.templates[key];
        return template.replace('{name}', name);
    }
};

export default GreetingResolver;
