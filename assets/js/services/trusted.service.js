/**
 * TopCare AI Platform V2.0.0
 * Trusted Service
 * Path: assets/js/services/trusted.service.js
 */

import TrustedRepository from '../repository/trusted.repository.js';

const TrustedService = {
    async load() {
        console.log('[Trusted Service] Connected');
        const data = await TrustedRepository.get();
        console.log("[TrustedService] Data received");
        return data;
    }
};

export default TrustedService;