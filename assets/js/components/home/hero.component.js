/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/components/home/hero.component.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../../core/router/app-router.js';

export class HeroComponent {
    constructor(container) {
        this.container = container;
    }
    render() {
        return `
            <div class="hero">
                <h1>Welcome to TopCare AI</h1>
                <button id="btn-hero-cta">Get Started</button>
            </div>
        `;
    }
    async mount(target) {
        if (target) target.innerHTML = this.render();
        const btn = document.getElementById('btn-hero-cta');
        if (btn) {
            btn.addEventListener('click', () => {
                appRouter.navigate('/register');
            });
        }
    }
}
export default HeroComponent;