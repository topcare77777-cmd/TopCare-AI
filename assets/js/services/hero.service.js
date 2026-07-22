/**
 * TopCare AI Platform V2.0.0
 * Hero Service
 * Path: assets/js/services/hero.service.js
 */

import HeroRepository from '../repository/hero.repository.js';

const HeroService = {
    async load() {
        console.log('[Hero Service] Connected');
        const data = await HeroRepository.get();
        console.log("[HeroService] Data received");
        return data;
    }
};

export default HeroService;