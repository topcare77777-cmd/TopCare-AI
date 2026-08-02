/**
 * TOPCARE AI PLATFORM V2 — COACH MODAL COMPONENT (DISPOSABLE UI)
 * Path: assets/js/coach/coach.modal.js
 * Status: ACTIVE - SPRINT 1A CANONICAL RELEASE
 * Role: Pure UI Renderer for Coach Selection Modal (FOUC-Free & CSP-Friendly)
 */

import { COACH_REGISTRY } from './coach.types.js';

export const CoachModal = (() => {
    let overlayElement = null;

    function loadStylesheet() {
        return new Promise((resolve) => {
            if (document.getElementById('tc-coach-modal-stylesheet')) {
                resolve(true);
                return;
            }

            const link = document.createElement('link');
            link.id = 'tc-coach-modal-stylesheet';
            link.rel = 'stylesheet';
            link.href = 'assets/css/coach/coach.modal.css';

            link.onload = () => resolve(true);
            link.onerror = () => {
                console.warn('[CoachModal] Failed to load modal CSS. Fallback applied.');
                resolve(false);
            };

            document.head.appendChild(link);
        });
    }

    function createFallbackSVG(colorHex) {
        return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(colorHex)}" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`;
    }

    async function show(onSelectCallback) {
        if (overlayElement) destroy(); // Guarantee single instance

        // FOUC Prevention: Guarantee CSS is loaded before DOM mounting
        await loadStylesheet();

        overlayElement = document.createElement('div');
        overlayElement.className = 'tc-coach-modal-overlay';

        const modalCard = document.createElement('div');
        modalCard.className = 'tc-coach-modal-card';

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'tc-coach-modal-close';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.innerHTML = '&times;';

        // Header
        const header = document.createElement('div');
        header.className = 'tc-coach-modal-header';
        header.innerHTML = `
            <h2 class="tc-coach-modal-title">Pilih Mentor AI Coach</h2>
            <p class="tc-coach-modal-subtitle">Pilih pembimbing yang sesuai dengan kebutuhan pengembangan diri Anda.</p>
        `;

        // Grid Container
        const grid = document.createElement('div');
        grid.className = 'tc-coach-grid';

        // Helper to Render Individual Coach Card
        const renderCard = (coach, btnClass, colorHex) => {
            const card = document.createElement('div');
            card.className = 'tc-coach-card';

            const img = document.createElement('img');
            img.src = coach.avatar;
            img.alt = coach.label;
            img.className = 'tc-coach-avatar-img';

            // CSP-Friendly Error Listener (Zero Inline onerror)
            img.addEventListener('error', () => {
                img.src = createFallbackSVG(colorHex);
            });

            const name = document.createElement('h3');
            name.className = 'tc-coach-name';
            name.textContent = coach.label;

            const subtitle = document.createElement('span');
            subtitle.className = `tc-coach-subtitle ${coach.id === 'maya' ? 'tc-coach-subtitle-maya' : ''}`;
            subtitle.textContent = coach.subtitle;

            const desc = document.createElement('p');
            desc.className = 'tc-coach-desc';
            desc.textContent = coach.description;

            const selectBtn = document.createElement('button');
            selectBtn.className = `tc-coach-btn-select ${btnClass}`;
            selectBtn.setAttribute('data-coach-id', coach.id);
            selectBtn.textContent = `Pilih ${coach.label}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(subtitle);
            card.appendChild(desc);
            card.appendChild(selectBtn);

            return card;
        };

        grid.appendChild(renderCard(COACH_REGISTRY.ALEX, 'tc-coach-btn-alex', '#3B82F6'));
        grid.appendChild(renderCard(COACH_REGISTRY.MAYA, 'tc-coach-btn-maya', '#10B981'));

        modalCard.appendChild(closeBtn);
        modalCard.appendChild(header);
        modalCard.appendChild(grid);
        overlayElement.appendChild(modalCard);

        // Event Handling
        overlayElement.addEventListener('click', (e) => {
            if (e.target === overlayElement || e.target === closeBtn) {
                destroy();
                return;
            }

            const selectBtn = e.target.closest('[data-coach-id]');
            if (selectBtn) {
                const selectedId = selectBtn.getAttribute('data-coach-id');
                destroy(); // Fully disposable DOM removal
                if (typeof onSelectCallback === 'function') {
                    onSelectCallback(selectedId);
                }
            }
        });

        document.body.appendChild(overlayElement);
    }

    function destroy() {
        if (overlayElement && overlayElement.parentNode) {
            overlayElement.parentNode.removeChild(overlayElement);
            overlayElement = null;
        }
    }

    return Object.freeze({
        show,
        destroy
    });
})();

export default CoachModal;
