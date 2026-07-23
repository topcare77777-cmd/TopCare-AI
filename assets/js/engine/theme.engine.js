/**
 * TopCare AI Platform V2.0.0
 * Theme Engine
 * Path: assets/js/core/theme.engine.js
 */
const ThemeEngine = {
    init() {
        const saved = localStorage.getItem('topcare_theme') || 'system';
        this.apply(saved);
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (localStorage.getItem('topcare_theme') === 'system') {
                this.apply('system');
            }
        });
    },

    apply(theme) {
        localStorage.setItem('topcare_theme', theme);
        let effectiveTheme = theme;
        if (theme === 'system') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', effectiveTheme);
    },

    get() {
        return localStorage.getItem('topcare_theme') || 'system';
    }
};

export default ThemeEngine;