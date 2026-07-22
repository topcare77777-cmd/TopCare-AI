/**
 * TopCare AI Platform V2.0.0
 * Trusted Repository
 * Path: assets/js/repository/trusted.repository.js
 */

const TrustedRepository = {
    async get() {
        try {
            console.log("[TrustedRepository] Loading trusted.json");
            const response = await fetch('assets/json/homepage/trusted.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[TrustedRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[TrustedRepository] Error fetching trusted data:', error);
            return null;
        }
    }
};

export default TrustedRepository;