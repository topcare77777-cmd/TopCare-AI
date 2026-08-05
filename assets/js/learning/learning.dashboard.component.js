/**
 * TOPCARE AI PLATFORM V2 — LEARNING DASHBOARD COMPONENT
 * Path: assets/js/learning/learning.dashboard.component.js
 * Status: ACTIVE (BUILD 126.2A — LEARNING UI DOMAIN)
 * Role: Renders responsive 10-category grid layout using TopCare Design System.
 */

import { LEARNING_CATEGORIES } from './learning.data.js';

export class LearningDashboardComponent {
    constructor() {
        this.categories = LEARNING_CATEGORIES;
    }

    /**
     * Renders HTML string for the Learning Dashboard module.
     * @returns {string}
     */
    render() {
        return `
            <div class="tc-learning-wrapper">
                <!-- Learning Dashboard Header Section -->
                <header class="tc-learning-header">
                    <div class="tc-learning-header-badge">
                        <span class="tc-badge-pulse"></span> Module Pembelajaran V2
                    </div>
                    <h1 class="tc-learning-title">Pusat Belajar Kepribadian & Kepemimpinan</h1>
                    <p class="tc-learning-subtitle">
                        Eksplorasi modul interaktif mengenai empat temperamen utama, psikologi interaksi, 
                        serta strategi pengembangan diri holistik bersama TopCare AI.
                    </p>
                </header>

                <!-- Responsive Grid Dashboard (10 Cards) -->
                <div class="tc-learning-grid">
                    ${this.categories.map(cat => this._renderCard(cat)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Private renderer for individual category cards.
     * @private
     */
    _renderCard(category) {
        return `
            <article class="tc-learning-card" style="--accent-color: ${category.accentColor}">
                <div class="tc-card-top">
                    <div class="tc-card-icon" aria-hidden="true">${category.icon}</div>
                    <span class="tc-card-badge">${category.badge}</span>
                </div>
                <div class="tc-card-body">
                    <h2 class="tc-card-title">${category.title}</h2>
                    <p class="tc-card-desc">${category.description}</p>
                </div>
                <div class="tc-card-footer">
                    <button type="button" 
                            class="tc-btn-learn" 
                            data-category-id="${category.id}"
                            aria-label="Pelajari materi ${category.title}">
                        <span>Pelajari</span>
                        <svg class="tc-icon-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </article>
        `;
    }

    /**
     * Binds user interactions and events for learning cards.
     * @param {HTMLElement} container 
     */
    bindEvents(container) {
        if (!container) return;

        container.addEventListener('click', (e) => {
            const learnBtn = e.target.closest('.tc-btn-learn');
            if (!learnBtn) return;

            e.preventDefault();
            const categoryId = learnBtn.getAttribute('data-category-id');
            const category = this.categories.find(c => c.id === categoryId);

            if (category) {
                this._showPlaceholderModal(category);
            }
        });
    }

    /**
     * Shows lightweight placeholder modal when user clicks "Pelajari".
     * @private
     */
    _showPlaceholderModal(category) {
        const modalId = 'tc-learning-modal';
        let modalEl = document.getElementById(modalId);

        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = modalId;
            modalEl.className = 'tc-modal-overlay';
            document.body.appendChild(modalEl);
        }

        modalEl.innerHTML = `
            <div class="tc-modal-content" role="dialog" aria-modal="true">
                <div class="tc-modal-header">
                    <span class="tc-modal-icon">${category.icon}</span>
                    <h3>${category.title}</h3>
                    <button type="button" class="tc-modal-close" id="tc-modal-close-btn" aria-label="Tutup">&times;</button>
                </div>
                <div class="tc-modal-body">
                    <div class="tc-modal-status-badge">Segera Hadir — SPRINT 31</div>
                    <p>Materi modul <strong>"${category.title}"</strong> sedang disiapkan oleh tim kurator TopCare AI.</p>
                    <p class="tc-modal-hint">Anda dapat berkonsultasi langsung mengenai topik ini dengan AI Coach pada menu Workspace.</p>
                </div>
                <div class="tc-modal-footer">
                    <button type="button" class="btn-primary" id="tc-modal-action-btn">Paham</button>
                </div>
            </div>
        `;

        modalEl.classList.add('active');

        const closeModal = () => {
            modalEl.classList.remove('active');
        };

        const closeBtn = modalEl.querySelector('#tc-modal-close-btn');
        const actionBtn = modalEl.querySelector('#tc-modal-action-btn');

        if (closeBtn) closeBtn.onclick = closeModal;
        if (actionBtn) actionBtn.onclick = closeModal;
        modalEl.onclick = (e) => {
            if (e.target === modalEl) closeModal();
        };
    }
}

export default LearningDashboardComponent;