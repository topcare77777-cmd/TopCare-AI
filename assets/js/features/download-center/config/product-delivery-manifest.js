/**
 * TOPCARE AI PLATFORM V2 — PRODUCT DELIVERY MANIFEST SSOT
 * Path: assets/js/features/download-center/config/product-delivery-manifest.js
 * Version: 135.1.0 (BUILD 135.1 — MULTI-ASSET PACKAGE ARCHITECTURE)
 * Status: APPROVED & LOCKED
 * SRP: Central Source of Truth for digital product package specifications, bonuses, licensing, and asset manifests.
 */

export const ProductDeliveryManifest = Object.freeze([
    {
        packageId: "pkg-001",
        productId: "prod-001",
        title: "TopCare Master Prompt AI Productivity Kit (Ultimate Bundle)",
        version: "v2.1.0",
        licenseType: "Commercial License", // "Commercial License" | "Personal Use Only"
        updatePolicy: "Lifetime Free Updates",
        contentsSummary: [
            "500+ Master Prompt AI Teruji (Notion & PDF)",
            "Cheatsheet Otomasi Workflow AI",
            "Bonus: Template Prompt Engineering Masterclass"
        ],
        bonuses: [
            { name: "Prompt Refinement Cheatsheet", filesize: "1.2 MB", format: "PDF" },
            { name: "Video Mini-Guide Prompting", filesize: "45 MB", format: "MP4" }
        ],
        isFree: false,
        assetIds: ["dl-001-a", "dl-001-b", "dl-001-c"]
    },
    {
        packageId: "pkg-002",
        productId: "prod-002",
        title: "E-Book: Panduan Praktis Bikin AI Agent Sendiri",
        version: "v1.0.4",
        licenseType: "Personal Use Only",
        updatePolicy: "1 Year Standard Updates",
        contentsSummary: [
            "E-Book Utama AI Agent Architecture (PDF)",
            "Source Code Bot Starter Kit (ZIP)",
            "Diagram Arsitektur High-Res (PNG)"
        ],
        bonuses: [
            { name: "List 50+ Framework AI Agent Gratis", filesize: "850 KB", format: "PDF" }
        ],
        isFree: false,
        assetIds: ["dl-002-a", "dl-002-b"]
    },
    {
        packageId: "pkg-004",
        productId: "prod-004",
        title: "Starter Prompt Kit: Psikologi & Personality",
        version: "v1.0.0",
        licenseType: "Personal Use Only",
        updatePolicy: "Community Driven Updates",
        contentsSummary: [
            "Koleksi 50 Prompt Analisis Kepribadian",
            "Panduan Komunikasi Empatis via AI"
        ],
        bonuses: [],
        isFree: true,
        assetIds: ["dl-004-a"]
    },
    {
        packageId: "pkg-005",
        productId: "prod-005",
        title: "UI/UX Dashboard Template for AI Apps",
        version: "v3.0.0",
        licenseType: "Commercial License",
        updatePolicy: "Lifetime Free Updates",
        contentsSummary: [
            "Figma Master Design System (.fig)",
            "Icon Pack Vector (.SVG)",
            "Dokumentasi Komponen UI (.PDF)"
        ],
        bonuses: [
            { name: "Dark & Light Mode UI Kit Extension", filesize: "12 MB", format: "FIG" }
        ],
        isFree: false,
        assetIds: ["dl-005-a", "dl-005-b", "dl-005-c"]
    }
]);

export default ProductDeliveryManifest;