/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service
 * Status       : ACTIVE
 * Pattern      : Pure Data Provider
 * Version      : 2.4.0
 * Architecture : Development Constitution v1.1
 * Owner        : About Service
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.9
 *
 * API :
 *   getData()
 *   refresh()
 *   clearCache()
 * -----------------------------------------------------------------
 */

const AboutService = {
    cache: null, // runtime cache

    getData() {
        if (this.cache) {
            return this.cache;
        }

        this.cache = {
            title: "About TopCare AI Platform",
            subtitle: "Built on rigorous architectural principles to deliver high-performance care solutions.",
            description: "TopCare AI combines modern component-based architecture with intelligent coaching frameworks, empowering users to track progress, optimize habits, and achieve balanced growth.",
            highlights: [
                "Modular Component-Widget Architecture",
                "Strict Runtime and Lifecycle Isolation",
                "Enterprise-Grade Reliability & Zero Regression"
            ],
            image: "assets/images/about-showcase.webp"
        };

        return this.cache;
    },

    async refresh() {
        this.clearCache();
        return await this.getData();
    },

    clearCache() {
        this.cache = null;
    }
};

export default AboutService;