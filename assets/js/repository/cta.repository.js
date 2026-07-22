/**
 * TopCare AI Platform V2.0.0
 * CTA Repository
 * Path: assets/js/repository/cta.repository.js
 */

const CtaRepository = {
    async get() {
        try {
            console.log("[CtaRepository] Loading cta.json");
            const response = await fetch('assets/json/homepage/cta.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[CtaRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[CtaRepository] Error fetching cta data:', error);
            return null;
        }
    }
};

export default CtaRepository;