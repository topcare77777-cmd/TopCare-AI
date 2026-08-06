/**
 * TOPCARE AI PLATFORM V2 — CATEGORY REGISTRY
 * Path: assets/js/features/marketplace/domain/category.registry.js
 * Version: 133.0.0 (BUILD 133.0 — MARKETPLACE FOUNDATION)
 * Status: APPROVED & LOCKED
 * SRP: Category metadata registry for Marketplace filtering.
 */

export class CategoryRegistry {
    static getCategories() {
        return [
            { id: "all", label: "Semua Produk", icon: "🌐" },
            { id: "prompt", label: "AI Prompt Kit", icon: "🤖" },
            { id: "ebook", label: "E-Book Digital", icon: "📘" },
            { id: "course", label: "Kursus AI", icon: "🎓" },
            { id: "template", label: "Template & Tools", icon: "🛠️" }
        ];
    }

    static getCategoryLabel(id) {
        const category = this.getCategories().find(c => c.id === id);
        return category ? category.label : "Umum";
    }
}