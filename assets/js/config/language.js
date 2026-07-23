class LanguageEngine {
constructor() {
this.currentLang = localStorage.getItem("topcare_lang") || "id";
this.translations = {};
}

async load() {
    try {
        const response = await fetch("assets/js/data/language.json");
        if (!response.ok) throw new Error("Failed to load language definitions.");
        const json = await response.json();
        this.translations = json.data || json;
    } catch (error) {
        console.error("Language load error:", error);
        this.translations = {
            id: { 
                title: "TopCare AI", 
                menu_home: "Beranda",
                hero_title: "Bangun Potensi Dirimu Bersama TopCare AI",
                hero_subtitle: "Platform AI untuk belajar, berkembang, mengenal diri, dan membangun masa depan yang lebih baik.",
                btn_register: "Mulai Gratis",
                btn_explore: "Jelajahi Platform"
            },
            en: { 
                title: "TopCare AI", 
                menu_home: "Home",
                hero_title: "Build Your Potential with TopCare AI",
                hero_subtitle: "AI platform to learn, grow, self-discover, and build the future.",
                btn_register: "Get Started Free",
                btn_explore: "Explore Platform"
            },
            asia: { 
                title: "TopCare AI", 
                menu_home: "Beranda Asia",
                hero_title: "Beranda Asia - TopCare AI",
                hero_subtitle: "Platform AI regional Asia untuk belajar dan berkembang.",
                btn_register: "Mulai Gratis",
                btn_explore: "Jelajahi Platform"
            },
            mandarin: { 
                title: "TopCare AI", 
                menu_home: "主页",
                hero_title: "与 TopCare AI 一起构建您的潜力",
                hero_subtitle: "用于学习、成长、自我发现和构建未来的人工智能平台。",
                btn_register: "免费开始",
                btn_explore: "探索平台"
            },
            japanese: { 
                title: "TopCare AI", 
                menu_home: "ホーム",
                hero_title: "TopCare AI であなたの潜在能力を築く",
                hero_subtitle: "学び、成長し、自己を発見し、未来を築くための AI プラットフォーム。",
                btn_register: "無料で始める",
                btn_explore: "プラットフォームを探索"
            },
            korean: { 
                title: "TopCare AI", 
                menu_home: "홈",
                hero_title: "TopCare AI와 함께 잠재력을 키우세요",
                hero_subtitle: "학습하고, 성장하며, 자신을 발견하고, 미래를 구축하기 위한 AI 플랫폼.",
                btn_register: "무료 시작",
                btn_explore: "플랫폼 탐색"
            }
        };
    }
    this.applyTranslations();
}

setLanguage(lang) {
    if (this.translations[lang]) {
        this.currentLang = lang;
        localStorage.setItem("topcare_lang", lang);
        window.location.reload();
    }
}

getLanguage() {
    return this.currentLang;
}

translate(key) {
    const langData = this.translations[this.currentLang] || this.translations['id'];
    return langData?.[key] || this.translations['id']?.[key] || key;
}

applyTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        const translation = this.translate(key);
        if (translation) {
            if (key === 'hero_title') {
                el.innerHTML = translation.includes('TopCare AI') ? translation.replace('TopCare AI', '<span>TopCare AI</span>') : `Bangun Potensi Dirimu Bersama <span>TopCare AI</span>`;
            } else {
                el.textContent = translation;
            }
        }
    });
}
}

export default new LanguageEngine();