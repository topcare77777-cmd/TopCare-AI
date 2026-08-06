/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4.5 - Component
 * Status       : ACTIVE
 * Version      : 2.5.0 (BUILD 129.0 — ROUTER SERVICE MIGRATION)
 * Owner        : Home Module
 * Architecture : Development Constitution v1.1
 * Pattern      : Conductor Component
 * Runtime      : V2 Runtime
 * -----------------------------------------------------------------
 */

import { HeroWidget } from '../../widgets/home/hero.widget.js';
import { Router } from '../../router/index.js';

const HeroComponent = {
    container: null,
    isMounted: false,

    async mount(container) {
        if (!container) return;

        if (this.container !== container) {
            this.container = container;
        }

        if (this.isMounted) {
            return this.update();
        }

        try {
            await HeroWidget.render(this.container);
            this.isMounted = true;
            this.bindGetStarted();
        } catch (err) {
            console.error("[HeroComponent] mount:", err);
        }
    },

    bindGetStarted() {
        if (!this.container) return;

        const getStartedButtons = this.container.querySelectorAll('[data-action="get-started"], #btn-get-started, .hero-btn-primary');
        getStartedButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.setItem("topcare.pending.route", "/coach-selection");
                Router.navigate("/login");
            });
        });
    },

    async update() {
        if (!this.isMounted || !this.container) return;

        try {
            if (typeof HeroWidget.refresh === 'function') {
                await HeroWidget.refresh();
            } else {
                await HeroWidget.render(this.container);
            }
            this.bindGetStarted();
        } catch (err) {
            console.error("[HeroComponent] update:", err);
        }
    },

    destroy() {
        if (!this.container) return;

        if (typeof HeroWidget.destroy === 'function') {
            try {
                HeroWidget.destroy();
            } catch (err) {
                console.error("[HeroComponent] destroy:", err);
            }
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        this.isMounted = false;
        this.container = null;
    },

    cleanup() {
        this.isMounted = false;
        this.container = null;
    }
};

export default HeroComponent;