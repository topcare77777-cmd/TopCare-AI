/**
 * TopCare AI Platform V2.0.0
 * Personality Component
 * Path: assets/js/components/personality.component.js
 */

const PersonalityComponent = {
    mount(containerId, html) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log("[PersonalityComponent] Mounted Successfully");
        } else {
            console.warn(`[Personality Component] Container with ID "${containerId}" not found.`);
        }
    }
};

export default PersonalityComponent;