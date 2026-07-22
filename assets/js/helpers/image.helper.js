/**
 * TopCare AI Platform V2.0.0
 * Enterprise Image Helper (IntersectionObserver Lazy Load)
 * Path: assets/js/helpers/image.helper.js
 */
import AssetsRegistry from '../config/assets.registry.js';

const ImageHelper = {
    getImage(pathKey) {
        const keys = pathKey.split('.');
        let current = AssetsRegistry;
        for (const k of keys) {
            if (current && current[k]) {
                current = current[k];
            } else {
                return 'assets/images/icons/favicon.svg'; // Safe fallback
            }
        }
        return current;
    },

    lazyLoadImage(imgElement, src) {
        if (!imgElement) return;
        imgElement.dataset.src = src;
        imgElement.loading = "lazy";
        imgElement.decoding = "async";

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    imgElement.src = imgElement.dataset.src;
                    obs.disconnect();
                }
            });
        });

        observer.observe(imgElement);
    },

    preloadHeroImage(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    }
};

export default ImageHelper;