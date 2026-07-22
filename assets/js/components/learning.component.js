/**
 * TopCare AI Platform V2.0.0
 * Learning Component
 * Path: assets/js/components/learning.component.js
 */

const LearningComponent = {
    mount(containerId, html) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log("[LearningComponent] Mounted Successfully");
        } else {
            console.warn(`[Learning Component] Container with ID "${containerId}" not found.`);
        }
    }
};

export default LearningComponent;