/**
 * TopCare AI Platform V2.0.0
 * Enterprise Page Registry (BUILD 030 Integrity Audit)
 * Path: assets/js/pages/page.registry.js
 */

import Logger from '../core/logger.js';

const PageRegistry = {
    routes: {
        '/': 'home',
        '/home': 'home',
        '/about': 'about',
        '/learning': 'learning',
        '/personality': 'personality',
        '/ebook': 'ebook',
        '/articles': 'articles',
        '/prompt': 'prompt',
        '/community': 'community',
        '/creator': 'creator',
        '/marketplace': 'marketplace',
        '/premium': 'premium',
        '/faq': 'faq',
        '/contact': 'contact'
    },

    resolve(path) {
        return this.routes[path] || 'home';
    },

    async import(pageKey) {
        try {
            switch (pageKey) {
                case 'home': return await import('../pages/home.page.js');
                case 'about': return await import('../pages/about.page.js');
                case 'learning': return await import('../pages/learning.page.js');
                case 'personality': return await import('../pages/personality.page.js');
                case 'ebook': return await import('../pages/ebook.page.js');
                case 'articles': return await import('../pages/articles.page.js');
                case 'prompt': return await import('../pages/prompt.page.js');
                case 'community': return await import('../pages/community.page.js');
                case 'creator': return await import('../pages/creator.page.js');
                case 'marketplace': return await import('../pages/marketplace.page.js');
                case 'premium': return await import('./premium.page.js');
                case 'faq': return await import('../pages/faq.page.js');
                case 'contact': return await import('../pages/contact.page.js');
                default: return await import('../pages/home.page.js');
            }
        } catch (error) {
            Logger.error(`[PageRegistry] Failed to dynamically import page module: ${pageKey}`, error);
            return await import('../pages/home.page.js');
        }
    }
};

export default PageRegistry;