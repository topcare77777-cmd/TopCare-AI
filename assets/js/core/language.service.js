/**
 * TOPCARE AI PLATFORM V2 — LANGUAGE SERVICE
 * Path: assets/js/core/language.service.js
 */

export const Translations = {
    id: {
        nav_home: "Beranda",
        nav_coach: "AI Coach",
        nav_personality: "Tes Kepribadian",
        nav_learning: "Belajar",
        nav_prompt: "Prompt AI",
        nav_community: "Komunitas",
        nav_premium: "Premium",
        nav_about: "Tentang Kami",
        nav_login: "Masuk",
        nav_register: "Mulai Gratis"
    },
    en: {
        nav_home: "Home",
        nav_coach: "AI Coach",
        nav_personality: "Personality Test",
        nav_learning: "Learn",
        nav_prompt: "AI Prompts",
        nav_community: "Community",
        nav_premium: "Premium",
        nav_about: "About Us",
        nav_login: "Sign In",
        nav_register: "Get Started Free"
    }
};

export class LanguageService {
    static getLanguage() {
        return localStorage.getItem('topcare_lang') || 'id';
    }

    static setLanguage(lang) {
        localStorage.setItem('topcare_lang', lang);
        this.applyLanguage();
    }

    static toggleLanguage() {
        const current = this.getLanguage();
        const next = current === 'id' ? 'en' : 'id';
        this.setLanguage(next);
        return next;
    }

    static applyLanguage() {
        const lang = this.getLanguage();
        const dict = Translations[lang] || Translations.id;

        // Update atribut data-lang pada tag html
        document.documentElement.lang = lang;

        // Update teks tombol switcher di header
        const langBtnSpan = document.querySelector('#lang-toggle-btn span');
        if (langBtnSpan) {
            langBtnSpan.textContent = lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN';
        }

        // Cari semua elemen yang memiliki atribut data-i18n dan perbarui teksnya
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (dict[key]) {
                element.textContent = dict[key];
            }
        });
    }
}