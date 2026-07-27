/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service
 * Status       : ACTIVE
 * Pattern      : Pure Data Provider
 * Version      : 2.4.0
 * Architecture : Development Constitution v1.1
 * Owner        : Hero Service
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.9
 *
 * API :
 *   getData()
 *   refresh()
 *   clearCache()
 * -----------------------------------------------------------------
 */

const HeroService = {
    cache: null, // runtime cache

    getData() {
        if (this.cache) {
            return this.cache;
        }

        this.cache = {
            badge: "TopCare AI 2.0 Platform",
            title: "AI-Powered Personal Growth & Care",
            subtitle: "Elevate your daily potential with intelligent coaching, structured guidance, and absolute performance monitoring.",
            ctaText: "Get Started Free",
            ctaLink: "#register",
            secondaryCtaText: "Explore Features",
            secondaryCtaLink: "#features",
            backgroundImage: "assets/images/hero-bg.webp",
            illustration: "assets/images/hero-illustration.svg",
            socialProof: {
                userCount: "10,000+",
                rating: 4.9,
                avatars: [
                    "assets/images/avatars/user-1.webp",
                    "assets/images/avatars/user-2.webp",
                    "assets/images/avatars/user-3.webp"
                ]
            },
            statistics: [
                { label: "Active Users", value: "10K+" },
                { label: "Growth Rate", value: "94%" },
                { label: "Satisfaction", value: "4.9/5" }
            ]
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

export default HeroService;