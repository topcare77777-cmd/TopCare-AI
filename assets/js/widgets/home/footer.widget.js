/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Widget Layer (Home Footer Widget)
 * Status       : ACTIVE
 * Version      : 2.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Frontend Core Team
 * Created      : BUILD 088 Footer Synchronization
 * 
 * Description  : Synchronized footer widget rendering exact DOM structure 
 *                matching footer-match.css with preserved legacy component API.
 * -----------------------------------------------------------------
 */

export const FooterWidget = {
    initialized: false,
    containerElement: null,

    /**
     * Renders and mounts the footer widget into the target container.
     * Preserves legacy component API contract (render).
     * 
     * @param {HTMLElement|string} container - Target container element or selector.
     */
    render(container) {
        const targetContainer = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;

        if (!targetContainer) {
            return;
        }

        this.containerElement = targetContainer;
        this.containerElement.innerHTML = this.renderTemplate();
        this.initialized = true;
    },

    /**
     * Alias for render to support alternative initialization patterns.
     * 
     * @param {HTMLElement|string} container - Target container element or selector.
     */
    init(container) {
        this.render(container);
    },

    /**
     * Refreshes the footer widget view state.
     */
    refresh() {
        if (this.containerElement && this.initialized) {
            this.containerElement.innerHTML = this.renderTemplate();
        }
    },

    /**
     * Generates the structured HTML matching footer-match.css classes precisely.
     * 
     * @returns {string} HTML markup string.
     */
    renderTemplate() {
        return `
            <footer class="footer-match">
                <div class="footer-grid-match">
                    <section class="footer-col-match">
                        <div class="footer-brand-wrapper">
                            <img src="assets/images/icons/brand-mark.svg" alt="TopCare AI Logo" class="footer-logo-img" loading="lazy">
                            <span class="footer-brand-title">TopCare AI</span>
                        </div>
                        <p class="footer-description">Platform AI untuk belajar, berkembang, mengenal diri, dan membangun masa depan bersama komunitas global.</p>
                    </section>
                    
                    <section class="footer-col-match">
                        <h5>Navigasi</h5>
                        <ul>
                            <li><a href="#/home">Beranda</a></li>
                            <li><a href="#/learning">Belajar AI</a></li>
                            <li><a href="#/personality">Personality</a></li>
                            <li><a href="#/articles">Artikel</a></li>
                        </ul>
                    </section>

                    <section class="footer-col-match">
                        <h5>Platform</h5>
                        <ul>
                            <li><a href="#/coach">AI Coach</a></li>
                            <li><a href="#/prompt">Prompt AI</a></li>
                            <li><a href="#/community">Community</a></li>
                            <li><a href="#/premium">Premium</a></li>
                        </ul>
                    </section>

                    <section class="footer-col-match">
                        <h5>Dukungan</h5>
                        <ul>
                            <li><a href="#/faq">FAQ</a></li>
                            <li><a href="#/contact">Kontak</a></li>
                            <li><a href="#/about">Tentang Kami</a></li>
                        </ul>
                    </section>
                </div>
                <div class="footer-bottom-match">
                    <p>&copy; 2026 TopCare AI. All rights reserved. TopCare AI Platform V2.0.0 RC1</p>
                </div>
            </footer>
        `;
    },

    /**
     * Cleans up widget resources and unmounts content.
     */
    destroy() {
        if (this.containerElement) {
            this.containerElement.innerHTML = '';
        }
        this.containerElement = null;
        this.initialized = false;
    }
};

export default FooterWidget;