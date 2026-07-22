/**
 * TopCare AI Platform V2.0.0
 * Testimonials Repository
 * Path: assets/js/repository/testimonials.repository.js
 */
import DataEngine from '../core/data.engine.js';
import Logger from '../core/logger.js';

const TestimonialsRepository = {
    async get() {
        try {
            Logger.info("[TestimonialsRepository] Loading testimonials data");
            const data = await DataEngine.get('testimonials');
            Logger.info("[TestimonialsRepository] Data fetched successfully");
            return data;
        } catch (error) {
            Logger.error('[TestimonialsRepository] Error fetching data:', error);
            return {
                tag: "Success Stories",
                title: "Trusted by Industry Pioneers",
                testimonials: []
            };
        }
    }
};

export default TestimonialsRepository;