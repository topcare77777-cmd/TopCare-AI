/**
 * TOPCARE AI PLATFORM V2 — PRODUCT MODEL ENTITY
 * Path: assets/js/features/marketplace/domain/product.model.js
 * Version: 134.1.0 (BUILD 134.1 — CONFIGURATION-DRIVEN ARCHITECTURE)
 * Status: APPROVED & LOCKED
 * SRP: Immutable Product domain entity constructor consuming MarketplaceConfig for dynamic price calculations.
 */

import { MarketplaceConfig } from '../config/marketplace.config.js';

export class ProductModel {
    constructor(data = {}) {
        if (!data.id) {
            throw new Error("[ProductModel] Product ID is required.");
        }

        this.id = String(data.id);
        this.title = data.title || "Untitled Product";
        this.description = data.description || "";
        this.category = data.category || "uncategorized";
        this.rating = Number(data.rating) || 5.0;
        this.badge = data.badge || null;

        // Raw Pricing & Config Fallbacks
        const parsedNormalPrice = Number(data.normalPrice !== undefined ? data.normalPrice : data.price) || 0;
        const globalDiscount = MarketplaceConfig.promotion.promotionEnabled
            ? MarketplaceConfig.promotion.defaultDiscountPercent
            : 0;

        const rawDiscount = data.discountPercent !== undefined ? data.discountPercent : data.discount;
        this.discountPercent = Number(rawDiscount !== undefined ? rawDiscount : globalDiscount) || 0;

        this.originalPrice = parsedNormalPrice;

        // Automatic Free Detection
        this.isFree = data.isFree === true || this.originalPrice === 0;

        // AUTOMATIC FINAL PRICE CALCULATION (Never edited manually)
        if (this.isFree) {
            this.finalPrice = 0;
            this.discountPercent = 0;
        } else if (this.discountPercent > 0 && this.originalPrice > 0) {
            const discountAmount = (this.originalPrice * this.discountPercent) / 100;
            this.finalPrice = Math.max(0, Math.round(this.originalPrice - discountAmount));
        } else {
            this.finalPrice = this.originalPrice;
        }

        // Action URLs & Button Labels
        this.downloadUrl = data.downloadUrl || MarketplaceConfig.defaults.defaultDownloadRoute;
        this.customWhatsappText = data.whatsappText || null;
    }

    /**
     * Checks if product has an active discount.
     */
    get hasDiscount() {
        return !this.isFree && this.discountPercent > 0 && this.originalPrice > this.finalPrice;
    }

    /**
     * Formats final price cleanly without decimals (e.g. Rp100.000 or GRATIS).
     */
    get formattedPrice() {
        if (this.isFree) return "GRATIS";
        return this._formatRupiah(this.finalPrice);
    }

    /**
     * Formats original price for strikethrough display.
     */
    get formattedOriginalPrice() {
        return this._formatRupiah(this.originalPrice);
    }

    /**
     * Dynamically generates WhatsApp Purchase URL from MarketplaceConfig.
     */
    get whatsappUrl() {
        if (this.isFree) return "#";

        const phone = MarketplaceConfig.whatsapp.whatsappNumber;
        const defaultMsg = MarketplaceConfig.whatsapp.defaultMessage;
        const text = this.customWhatsappText || `${defaultMsg} ${this.title}`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }

    /**
     * Internal Rupiah Currency Formatter Helper (Rp100.000 format).
     * @param {number} amount
     */
    _formatRupiah(amount) {
        const locale = MarketplaceConfig.currency.locale || "id-ID";
        const formattedNumber = new Intl.NumberFormat(locale, {
            maximumFractionDigits: 0
        }).format(amount);

        return `Rp${formattedNumber}`;
    }
}
