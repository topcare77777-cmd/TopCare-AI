/**
 * TopCare AI Platform V2.0.0
 * Footer Service
 * Path: assets/js/services/footer.service.js
 */

import FooterRepository from '../repository/footer.repository.js';

const FooterService = {
    async load() {
        console.log('[Footer Service] Connected');
        const data = await FooterRepository.get();
        console.log("[FooterService] Data received");
        return data;
    }
};

export default FooterService;