/**
 * TOPCARE AI PLATFORM V2 — PRODUCT MODEL ENTITY
 * Path: assets/js/features/marketplace/domain/product.model.js
 * Version: 135.1.0 (BUILD 135.1 — FREE DIGITAL DELIVERY)
 * Status: PENDING LOCK
 * SRP: Immutable Product domain entity consuming MarketplaceConfig.
 */

import { MarketplaceConfig } from '../config/marketplace.config.js';

export class ProductModel {
    constructor(data = {}) {
        if (!data.id) {
            throw new Error('[ProductModel] Product ID is required.');
        }

        this.id = String(data.id);
        this.title = data.title || 'Untitled Product';
        this.description = data.description || '';
        this.category = data.category || 'uncategorized';
        this.rating = Number(data.rating) || 5.0;
        this.badge = data.badge || null;

        const parsedNormalPrice =
            Number(
                data.normalPrice !== undefined
                    ? data.normalPrice
                    : data.price
            ) || 0;

        const globalDiscount =
            MarketplaceConfig.promotion.promotionEnabled
                ? MarketplaceConfig.promotion.defaultDiscountPercent
                : 0;

        const rawDiscount =
            data.discountPercent !== undefined
                ? data.discountPercent
                : data.discount;

        this.discountPercent =
            Number(
                rawDiscount !== undefined
                    ? rawDiscount
                    : globalDiscount
            ) || 0;

        this.originalPrice = parsedNormalPrice;

        this.isFree =
            data.isFree === true ||
            this.originalPrice === 0;

        if (this.isFree) {
            this.finalPrice = 0;
            this.discountPercent = 0;
        } else if (
            this.discountPercent > 0 &&
            this.originalPrice > 0
        ) {
            const discountAmount =
                (this.originalPrice * this.discountPercent) / 100;

            this.finalPrice = Math.max(
                0,
                Math.round(
                    this.originalPrice - discountAmount
                )
            );
        } else {
            this.finalPrice = this.originalPrice;
        }

        /*
         * IMPORTANT:
         * A product without an explicitly configured downloadUrl
         * must NOT receive a fake router download route.
         *
         * Premium products remain without a public download URL.
         */
        this.downloadUrl =
            typeof data.downloadUrl === 'string' &&
                data.downloadUrl.trim()
                ? data.downloadUrl.trim()
                : null;

        this.customWhatsappText =
            data.whatsappText || null;
    }

    get hasDiscount() {
        return (
            !this.isFree &&
            this.discountPercent > 0 &&
            this.originalPrice > this.finalPrice
        );
    }

    get formattedPrice() {
        if (this.isFree) {
            return 'GRATIS';
        }

        return this._formatRupiah(this.finalPrice);
    }

    get formattedOriginalPrice() {
        return this._formatRupiah(this.originalPrice);
    }

    get whatsappUrl() {
        if (this.isFree) {
            return '#';
        }

        const phone =
            MarketplaceConfig.whatsapp.whatsappNumber;

        const defaultMsg =
            MarketplaceConfig.whatsapp.defaultMessage;

        const text =
            this.customWhatsappText ||
            `${defaultMsg} ${this.title}`;

        return (
            `https://wa.me/${phone}` +
            `?text=${encodeURIComponent(text)}`
        );
    }

    _formatRupiah(amount) {
        const locale =
            MarketplaceConfig.currency.locale || 'id-ID';

        const formattedNumber =
            new Intl.NumberFormat(locale, {
                maximumFractionDigits: 0
            }).format(amount);

        return `Rp${formattedNumber}`;
    }
}