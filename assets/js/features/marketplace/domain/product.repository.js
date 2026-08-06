/**
 * TOPCARE AI PLATFORM V2 — PRODUCT REPOSITORY
 * Path: assets/js/features/marketplace/domain/product.repository.js
 * Version: 133.1.3 (BUILD 133.1.3 — RENDER PIPELINE REPAIR)
 * Status: APPROVED & LOCKED
 * SRP: Static Data Repository providing product collection with strict array validation.
 */

import { ProductModel } from './product.model.js';

export class ProductRepository {
    constructor(customProducts = null) {
        const hasValidCustomProducts = Array.isArray(customProducts) && customProducts.length > 0;

        this._products = hasValidCustomProducts ? customProducts : [
            new ProductModel({
                id: "prod-001",
                title: "TopCare Master Prompt AI Productivity Kit",
                category: "prompt",
                price: 149000,
                rating: 4.9,
                badge: "BESTSELLER",
                description: "500+ Prompt AI teruji untuk otomasi pekerjaan harian dan bisnis.",
                whatsappText: "Halo TopCare, saya mau beli Master Prompt AI Kit."
            }),
            new ProductModel({
                id: "prod-002",
                title: "E-Book: Panduan Praktis Bikin AI Agent Sendiri",
                category: "ebook",
                price: 99000,
                rating: 4.8,
                badge: "POPULER",
                description: "Panduan lengkap membangun AI Agent tanpa koding dari dasar.",
                whatsappText: "Halo TopCare, saya berminat E-Book AI Agent."
            }),
            new ProductModel({
                id: "prod-003",
                title: "Mini Course: AI Content Creator Workflow",
                category: "course",
                price: 299000,
                rating: 5.0,
                badge: "PROMO",
                description: "Kuasai strategi pembuatan konten sosial media 10x lebih cepat.",
                whatsappText: "Halo TopCare, saya ingin daftar Mini Course AI Content Creator."
            }),
            new ProductModel({
                id: "prod-004",
                title: "Starter Prompt Kit: Psikologi & Personality",
                category: "prompt",
                price: 0,
                rating: 4.7,
                badge: "FREE",
                description: "Koleksi prompt gratis untuk analisis kepribadian & komunikasi.",
                whatsappText: "Halo TopCare, saya mau download Starter Prompt Kit Gratis."
            }),
            new ProductModel({
                id: "prod-005",
                title: "UI/UX Dashboard Template for AI Apps",
                category: "template",
                price: 199000,
                rating: 4.9,
                badge: "NEW",
                description: "Template Figma siap pakai untuk desain aplikasi berbasis AI.",
                whatsappText: "Halo TopCare, saya berminat dengan UI/UX Dashboard Template."
            })
        ];
    }

    async getAllProducts() {
        return Promise.resolve([...this._products]);
    }
}