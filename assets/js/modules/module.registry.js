/**
 * TopCare AI Platform V2.0.0
 * Module Registry (Auto Configurable & Error Boundary Protected)
 * Path: assets/js/modules/module.registry.js
 */

import ModuleLoader from '../core/module-loader.js';
import PerformanceMonitor from '../core/performance.monitor.js';

import HeroModule from './hero.module.js';
import TrustedModule from './trusted.module.js';
import StatisticsModule from './statistics.module.js';
import AboutModule from './about.module.js';
import PersonalityModule from './personality.module.js';
import LearningModule from './learning.module.js';
import CommunityModule from './community.module.js';
import AssistantModule from './assistant.module.js';
import CtaModule from './cta.module.js';
import FooterModule from './footer.module.js';

const HOMEPAGE_MODULES = [
    { name: 'hero', module: HeroModule, containerId: 'hero-wrapper' },
    { name: 'trusted', module: TrustedModule, containerId: 'trusted-wrapper' },
    { name: 'statistics', module: StatisticsModule, containerId: 'statistics-wrapper' },
    { name: 'about', module: AboutModule, containerId: 'about-wrapper' },
    { name: 'personality', module: PersonalityModule, containerId: 'personality-wrapper' },
    { name: 'learning', module: LearningModule, containerId: 'learning-wrapper' },
    { name: 'community', module: CommunityModule, containerId: 'community-wrapper' },
    { name: 'assistant', module: AssistantModule, containerId: 'assistant-wrapper' },
    { name: 'cta', module: CtaModule, containerId: 'cta-wrapper' },
    { name: 'footer', module: FooterModule, containerId: 'footer-wrapper' }
];

const ModuleRegistry = {
    async init() {
        console.log('[ModuleRegistry] Initializing modules with Error Boundary & Lazy Observer...');
        PerformanceMonitor.init();

        const loadModuleWithBoundary = async (item) => {
            try {
                await ModuleLoader.load(item.name, item.module);
            } catch (error) {
                console.error(`[ModuleRegistry] Error Boundary caught failure in module: ${item.name}`, error);
                const container = document.getElementById(item.containerId);
                if (container) {
                    container.innerHTML = `<div style="padding: 1rem; text-align: center; color: #ef4444; font-size: 0.875rem;">[Module Error Boundary] Failed to load ${item.name} section safely.</div>`;
                }
            }
        };

        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '200px 0px',
                threshold: 0.01
            };

            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetId = entry.target.id;
                        const matchedItem = HOMEPAGE_MODULES.find(m => m.containerId === targetId);
                        if (matchedItem && !matchedItem._loaded) {
                            matchedItem._loaded = true;
                            observerInstance.unobserve(entry.target);
                            loadModuleWithBoundary(matchedItem);
                        }
                    }
                });
            }, observerOptions);

            HOMEPAGE_MODULES.forEach(item => {
                const element = document.getElementById(item.containerId);
                if (element) {
                    // Always load Hero immediately, lazy load others
                    if (item.name === 'hero') {
                        item._loaded = true;
                        loadModuleWithBoundary(item);
                    } else {
                        // Insert Skeleton Loader before observation triggers
                        element.innerHTML = `<div class="skeleton-loader" style="height: 200px; background: rgba(255,255,255,0.02); border-radius: 12px; margin: 2rem 0; animation: pulse 1.5s infinite;"></div>`;
                        observer.observe(element);
                    }
                }
            });
        } else {
            // Fallback for environments without IntersectionObserver
            for (const item of HOMEPAGE_MODULES) {
                if (item.module) {
                    await loadModuleWithBoundary(item);
                }
            }
        }

        setTimeout(() => {
            PerformanceMonitor.report();
        }, 1500);
    }
};

export default ModuleRegistry;