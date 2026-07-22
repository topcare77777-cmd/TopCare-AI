/**
 * TopCare AI Platform V2.0.0
 * Footer Renderer (Null-Safe & Sanitized)
 * Path: assets/js/renderers/footer.renderer.js
 */

import BaseRenderer from '../core/base.renderer.js';

const FooterRenderer = {
    render(data) {
        if (!data) return '';
        console.log("[FooterRenderer] HTML generated");

        const brand = data.brand || {};
        const menusHtml = (data.menus || []).map(menu => `
            <div class="footer__col" data-animate="fade-up">
                <h4 class="footer__heading">${BaseRenderer.sanitize(menu.category || '')}</h4>
                <ul class="footer__links">
                    ${(menu.items || []).map(item => `
                        <li><a href="${BaseRenderer.sanitize(item.link || '#')}" class="footer__link">${BaseRenderer.sanitize(item.text || '')}</a></li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        const socialsHtml = (data.socials || []).map(social => `
            <a href="${BaseRenderer.sanitize(social.link || '#')}" class="footer__social-link" aria-label="${BaseRenderer.sanitize(social.name || '')}">${BaseRenderer.sanitize(social.name || '')}</a>
        `).join('');

        return `
            <footer class="footer" data-animate="fade-up">
                <div class="footer__container">
                    <div class="footer__brand" data-animate="fade-right">
                        <div class="footer__logo-wrapper">
                            <div class="footer__logo">${BaseRenderer.sanitize(brand.logoText || 'TC')}</div>
                            <span class="footer__title">${BaseRenderer.sanitize(brand.name || 'TopCare AI')}</span>
                        </div>
                        <p class="footer__desc">${BaseRenderer.sanitize(brand.description || '')}</p>
                        <div class="footer__meta">
                            <span>${BaseRenderer.sanitize(brand.version || 'Version 2.0.0')}</span>
                        </div>
                    </div>
                    ${menusHtml}
                </div>
                <div class="footer__bottom">
                    <p>${BaseRenderer.sanitize(data.copyright || '&copy; 2026 TopCare AI Platform. All rights reserved.')}</p>
                    <div class="footer__socials">
                        ${socialsHtml}
                    </div>
                </div>
            </footer>
        `;
    }
};

export default FooterRenderer;