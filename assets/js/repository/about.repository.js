/**
 * TopCare AI Platform V2.0.0
 * About Repository
 * Path: assets/js/repository/about.repository.js
 */

const AboutRepository = {
    async get() {
        try {
            console.log("[AboutRepository] Loading about.json");
            const response = await fetch('assets/json/homepage/about.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[AboutRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[About Repository] Error fetching about data:', error);
            return null;
        }
    }
};

export default AboutRepository;