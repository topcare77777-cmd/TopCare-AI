/**
 * TopCare AI Platform V2.0.0
 * Mouse Glow Cursor Effect (Attaches to specific containers without duplicate listeners)
 * Path: assets/js/core/glow.effect.js
 */
import Logger from '../core/logger.js';

const GlowEffect = {
    attachedContainers: new WeakSet(),

    attach(container = document) {
        if (this.attachedContainers.has(container)) return;

        const cards = container.querySelectorAll ? container.querySelectorAll('.glass-card') : [];
        cards.forEach(card => {
            if (card._hasGlowListener) return;
            card._hasGlowListener = true;
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        this.attachedContainers.add(container);
        Logger.info("[GlowEffect] Attached to container.");
    }
};

export default GlowEffect;