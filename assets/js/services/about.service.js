/**
 * TopCare AI Platform V2.0.0
 * About Service
 * Path: assets/js/services/about.service.js
 */

import AboutRepository from '../repository/about.repository.js';

const AboutService = {
    async load() {
        console.log('[About Service] Connected');
        const data = await AboutRepository.get();
        console.log("[AboutService] Data received");
        return data;
    }
};

export default AboutService;