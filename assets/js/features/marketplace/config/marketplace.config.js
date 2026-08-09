/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE CONFIGURATION CENTER
 * Path: assets/js/features/marketplace/config/marketplace.config.js
 * Version: 134.2.1 (BUILD 134.2.1 — CONFIG SYNTAX REPAIR)
 * Status: LOCK CANDIDATE
 * SRP: Centralized Single Source of Truth for Marketplace settings and catalog.
 */

export const MarketplaceConfig = Object.freeze({
    store: {
        storeName: "TopCare AI Official Store",
        ownerName: "TopCare AI Platform Team"
    },

    whatsapp: {
        whatsappNumber: "6282293047592",
        defaultMessage: "Halo TopCare, saya berminat dengan produk:"
    },

    promotion: {
        promotionEnabled: true,
        defaultDiscountPercent: 0
    },

    buttons: {
        buyButtonLabel: "Beli via WA",
        freeButtonLabel: "Download Gratis"
    },

    defaults: {
        defaultDownloadRoute: "#/download/free-kit"
    },

    currency: {
        locale: "id-ID",
        currency: "IDR"
    },

    products: [
        {
            id: "prod-001",
            title: "TopCare Master Prompt AI Productivity Kit",
            description: "500+ Prompt AI teruji untuk otomasi pekerjaan harian dan bisnis.",
            category: "prompt",
            rating: 5.0,
            normalPrice: 100000,
            discountPercent: 80,
            isFree: false,
            downloadUrl: null,
            badge: "BESTSELLER"
        },
        {
            id: "prod-002",
            title: "E-Book: Panduan Praktis Bikin AI Agent Sendiri",
            description: "Panduan lengkap membangun AI Agent tanpa koding dari dasar.",
            category: "ebook",
            rating: 5.0,
            normalPrice: 150000,
            discountPercent: 60,
            isFree: false,
            downloadUrl: null,
            badge: "POPULER"
        },
        {
            id: "prod-003",
            title: "Mini Course: AI Content Creator Workflow",
            description: "Kuasai strategi pembuatan konten sosial media 10x lebih cepat.",
            category: "course",
            rating: 5.0,
            normalPrice: 299000,
            discountPercent: 50,
            isFree: false,
            downloadUrl: null,
            badge: "PROMO"
        },
        {
            id: "prod-004",
            title: "Starter Prompt Kit: Psikologi & Personality",
            description: "Kumpulan prompt starter untuk eksplorasi psikologi dan personality.",
            category: "prompt",
            rating: 5.0,
            normalPrice: 0,
            discountPercent: 0,
            isFree: true,
            downloadUrl: "/assets/downloads/free/starter-prompt-kit-psikologi-personality.pdf",
            badge: "FREE"
        },
        {
            id: "prod-005",
            title: "UI/UX Dashboard Template for AI Apps",
            description: "Template Figma siap pakai untuk desain aplikasi berbasis AI.",
            category: "template",
            rating: 5.0,
            normalPrice: 250000,
            discountPercent: 50,
            isFree: false,
            downloadUrl: null,
            badge: "NEW"
        }
    ]
});

export default MarketplaceConfig;