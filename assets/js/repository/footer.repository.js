/**
 * TopCare AI Platform V2.0.0
 * Footer Repository
 * Path: assets/js/repository/footer.repository.js
 */

const FooterRepository = {
    async get() {
        try {
            console.log("[FooterRepository] Loading footer.json");
            const response = await fetch('assets/json/homepage/footer.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[FooterRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[FooterRepository] Error fetching footer data:', error);
            return null;
        }
    }
};

export default FooterRepository;