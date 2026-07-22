/**
 * TopCare AI Platform V2.0.0
 * Hero Component
 */

const HeroComponent = {
    mount(containerId, html) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log("[HeroComponent] Mounted Successfully");
        } else {
            console.warn(`[Hero Component] Container with ID "${containerId}" not found.`);
        }
    }
};

export default HeroComponent;