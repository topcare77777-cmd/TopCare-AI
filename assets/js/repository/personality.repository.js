/**
 * TopCare AI Platform V2.0.0
 * Personality Repository
 * Path: assets/js/repository/personality.repository.js
 */

const PersonalityRepository = {
    async get() {
        try {
            console.log("[PersonalityRepository] Loading personality.json");
            const response = await fetch('assets/json/homepage/personality.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[PersonalityRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[Personality Repository] Error fetching personality data:', error);
            return null;
        }
    }
};

export default PersonalityRepository;