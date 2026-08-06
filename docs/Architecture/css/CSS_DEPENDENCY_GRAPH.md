### 📄 2. File: `docs/CSS_DEPENDENCY_GRAPH.md`

```markdown
# TOPCARE AI PLATFORM V2 — CSS DEPENDENCY GRAPH
**Build Target:** BUILD 128.3  
**Status:** APPROVED & LOCKED  
**Cascade Control:** Strict Sequential Evaluation  

---

## 1. Overview
Dokumen ini menjelaskan alur eksekusi stylesheet (*Cascade Evaluation Order*) yang didefinisikan secara eksplisit di dalam `assets/css/app.css`. Urutan pemanggilan ini menjamin bahwa spesifisitas (*specificity*) berjalan dari tingkat paling abstrak (Tokens/Reset) ke tingkat paling spesifik (Page Views & Extensions) tanpa tabrakan gaya (*cascade collision*).

---

## 2. Master Cascade Execution Flow (`app.css`)

```text
app.css (Master Entry Point)
│
├── [LAYER 00] Design System Raw Tokens
│   ├── tokens/color.css
│   ├── tokens/spacing.css
│   ├── tokens/radius.css
│   ├── tokens/shadow.css
│   ├── tokens/zindex.css
│   ├── tokens/glass.css
│   └── tokens/gradient.css
│
├── [LAYER 01] Core & Foundation Base
│   ├── core/design.tokens.css
│   ├── core/animation.css
│   ├── core/components.css
│   ├── core/enterprise-polish.css
│   ├── foundation/base/reset.css
│   ├── foundation/base/variables.css
│   ├── foundation/base/typography.css
│   ├── foundation/base/utilities.css
│   ├── foundation/container.css
│   ├── foundation/grid.css
│   └── foundation/section.css
│
├── [LAYER 02] Reusable UI Components
│   ├── components/button.css
│   ├── components/badge/badge.css
│   ├── components/card/card.css
│   ├── form/input.css
│   ├── components/modal/modal.css
│   ├── components/navbar/navbar.css
│   ├── components/dropdown.css
│   ├── components/tooltip.css
│   ├── components/toast.css
│   ├── components/tabs.css
│   ├── components/pagination.css
│   ├── components/progress.css
│   ├── components/rating.css
│   ├── components/search.css
│   ├── components/sidebar.css
│   ├── components/skeleton.css
│   ├── components/spinner.css
│   ├── components/stats.css
│   ├── components/table/table.css
│   ├── components/avatar/avatar.css
│   ├── components/alert/alert.css
│   ├── components/auth/auth.components.css
│   ├── components/language/language.css
│   └── components/coach/coach-unified.css
│
├── [LAYER 03] Layout & Shell Architecture
│   ├── layout/application-shell.css
│   ├── layout/header.css
│   ├── layout/footer.css
│   └── layout/footer-match.css
│
├── [LAYER 04] Feature & Domain Styles
│   ├── features/personality.css
│   └── features/community/community.css
│
├── [LAYER 05] Personality Engine Domain (LOCKED DOMAIN)
│   ├── features/personality/personality-test.css
│   ├── features/personality/personality-question.css
│   ├── features/personality/personality-result.css
│   ├── features/personality/personality-selector.css
│   ├── features/personality/personality-responsive.css
│   └── features/personality/personality-print.css
│
├── [LAYER 06] Page Views & Home Sub-Components
│   ├── pages/home.css
│   ├── pages/home/hero.css
│   ├── pages/home/features.css
│   ├── pages/home/coach.css
│   ├── pages/home/articles.css
│   ├── pages/home/cta.css
│   ├── pages/home/footer.css
│   ├── pages/home/statistics.css
│   ├── pages/home/testimonials.css
│   ├── pages/home/trusted.css
│   ├── pages/home/pricing.css
│   ├── pages/home/pricing-toggle.css
│   ├── pages/home/bento.css
│   ├── pages/home/product-experience.css
│   ├── pages/dashboard.css
│   ├── pages/creator.css
│   ├── pages/learning.css
│   ├── pages/about.css
│   ├── pages/assistant.css
│   ├── pages/faq.css
│   └── pages/ai-basic.css
│
└── [LAYER 07] BUILD 128.2A Design System Extensions (FINAL OVERRIDES)
    ├── core/design.tokens-ext.css      <-- Precedence Over Core Tokens
    └── core/ui-harmonization.css       <-- Precedence Over Global Components