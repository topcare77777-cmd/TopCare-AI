/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service
 * Status       : ACTIVE
 * Pattern      : Pure Data Provider
 * Version      : 2.4.0
 * Architecture : Development Constitution v1.1
 * Owner        : CTA Service
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.9
 *
 * API :
 *   getData()
 *   refresh()
 *   clearCache()
 * -----------------------------------------------------------------
 */

const CTAService = {
    cache: null, // runtime cache

    getData() {
        if (this.cache) {
            return this.cache;
        }

        this.cache = {
            heading: "Ready to Transform Your Workflow?",
            subheading: "Join thousands of users experiencing the next evolution of AI-driven personal care and coaching.",
            buttonText: "Start Now for Free",
            buttonAction: "#register",
            backgroundImage: "assets/images/cta-bg.webp"
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

export default CTAService;