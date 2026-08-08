/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE CONFIGURATION CENTER
 * Path: assets/js/features/marketplace/config/marketplace.config.js
 * Version: 134.1.0 (BUILD 134.1 — CONFIGURATION-DRIVEN ARCHITECTURE)
 * Status: APPROVED & LOCKED
 * SRP: Centralized Single Source of Truth (SSOT) for all Marketplace business settings and product catalog.
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
            normalPrice: 0,
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
            normalPrice: 150000,
            discountPercent: 50,
            isFree: false,
            downloadUrl: null,
            badge: "POPULER"
        },
        {
            id: "prod-003",
            title: "Mini Course: AI Content Creator Workflow",
            description: "Kuasai strategi pembuatan konten sosial media 10x lebih cepat.",
            category: "course",
            normalPrice: 299000,
            discountPercent: 50,
            isFree: false,
            downloadUrl: null,
            badge: "PROMO"
        },
        {
            id: "prod-004",
            title: "Starter Prompt Kit: Psikologi & Personality",
            description: "Koleksi prompt gratis untuk analisis kepribadian & komunikasi.",
            category: "prompt",
            normalPrice: 0,
            discountPercent: 0,
            isFree: true,
            downloadUrl: "#/download/starter-kit",
            badge: "FREE"
        },
        {
            id: "prod-005",
            title: "UI/UX Dashboard Template for AI Apps",
            description: "Template Figma siap pakai untuk desain aplikasi berbasis AI.",
            category: "template",
            normalPrice: 250000,
            discountPercent: 50,
            isFree: false,
            downloadUrl: null,
            badge: "NEW"
        }
    ]
});

export default MarketplaceConfig;