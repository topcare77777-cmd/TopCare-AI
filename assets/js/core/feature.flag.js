/**
 * TopCare AI Platform V2.0.0
 * Feature Flag Engine
 * Path: assets/js/core/feature.flag.js
 */
const FeatureFlag = {
    flags: {
        newDashboard: true,
        aiAssistant: true,
        advancedSecurity: false
    },

    isEnabled(flagName) {
        return !!this.flags[flagName];
    },

    toggle(flagName) {
        if (this.flags[flagName] !== undefined) {
            this.flags[flagName] = !this.flags[flagName];
        }
    }
};

export default FeatureFlag;