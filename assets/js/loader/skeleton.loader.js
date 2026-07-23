/**
 * TopCare AI Platform V2.0.0
 * Universal Skeleton Loader Utility
 * Path: assets/js/core/skeleton.loader.js
 */
const SkeletonLoader = {
    renderCard() {
        return `<div class="skeleton" style="height: 220px; width: 100%; border-radius: var(--radius-lg);"></div>`;
    },
    renderText(lines = 3) {
        let html = '';
        for (let i = 0; i < lines; i++) {
            const width = i === lines - 1 ? '60%' : '100%';
            html += `<div class="skeleton" style="height: 16px; width: ${width}; margin-bottom: 8px; border-radius: 4px;"></div>`;
        }
        return html;
    },
    renderAvatar() {
        return `<div class="skeleton" style="width: 48px; height: 48px; border-radius: 50%;"></div>`;
    }
};

export default SkeletonLoader;