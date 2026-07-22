/**
 * TopCare AI Platform V2.0.0
 * Testimonials Service
 * Path: assets/js/services/testimonials.service.js
 */
import TestimonialsRepository from '../repository/testimonials.repository.js';
import Logger from '../core/logger.js';

const TestimonialsService = {
    async load() {
        Logger.info('[TestimonialsService] Connected');
        const data = await TestimonialsRepository.get();
        Logger.info("[TestimonialsService] Data received");
        return data;
    }
};

export default TestimonialsService;