/**
 * TopCare AI Platform V2.0.0
 * CTA Service
 * Path: assets/js/services/cta.service.js
 */

import CtaRepository from '../repository/cta.repository.js';

const CtaService = {
    async load() {
        console.log('[Cta Service] Connected');
        const data = await CtaRepository.get();
        console.log("[CtaService] Data received");
        return data;
    }
};

export default CtaService;