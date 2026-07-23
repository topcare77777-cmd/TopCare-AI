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
                case 'home': return await import('./home.page.js');
                case 'about': return await import('./about.page.js');
                case 'learning': return await import('./learning.page.js');
                case 'personality': return await import('./personality.page.js');
                case 'ebook': return await import('./ebook.page.js');
                case 'articles': return await import('./articles.page.js');
                case 'prompt': return await import('./prompt.page.js');
                case 'community': return await import('./community.page.js');
                case 'creator': return await import('./creator.page.js');
                case 'marketplace': return await import('./marketplace.page.js');
                case 'premium': return await import('./premium.page.js');
                case 'faq': return await import('./faq.page.js');
                case 'contact': return await import('./contact.page.js');
                default: return await import('./home.page.js');
            }
        } catch (error) {
            Logger.error(`[PageRegistry] Failed to dynamically import page module: ${pageKey}`, error);
            return await import('./home.page.js');
        }
    }
};

export default PageRegistry;