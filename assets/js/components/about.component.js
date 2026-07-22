/**
 * TopCare AI Platform V2.0.0
 * About Component
 * Path: assets/js/components/about.component.js
 */

const AboutComponent = {
    mount(containerId, html) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log("[AboutComponent] Mounted Successfully");
        } else {
            console.warn(`[About Component] Container with ID "${containerId}" not found.`);
        }
    }
};

export default AboutComponent;