/**
 * TOPCARE AI PLATFORM V2 — PRODUCT MODEL ENTITY
 * Path: assets/js/features/marketplace/domain/product.model.js
 * Version: 133.0.1 (BUILD 133.0 — GOLDEN BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Immutable Product domain entity constructor and formatter.
 */

export class ProductModel {
    constructor(data = {}) {
        if (!data.id) {
            throw new Error("[ProductModel] Product ID is required.");
        }

        this.id = String(data.id);
        this.title = data.title || "Untitled Product";
        this.category = data.category || "uncategorized";
        this.price = Number(data.price) || 0;
        this.rating = Number(data.rating) || 5.0;
        this.image = data.image || "assets/images/icons/topcare-logo.svg";
        this.description = data.description || "";
        this.badge = data.badge || null;
        this.whatsappText = data.whatsappText || `Halo, saya tertarik dengan produk ${this.title}`;
    }

    get formattedPrice() {
        if (this.price === 0) return "GRATIS";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(this.price);
    }

    get whatsappUrl() {
        const encodedMsg = encodeURIComponent(this.whatsappText);
        return `https://wa.me/6281234567890?text=${encodedMsg}`;
    }
}