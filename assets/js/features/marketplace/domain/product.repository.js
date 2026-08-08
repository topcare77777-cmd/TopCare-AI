/**
 * TOPCARE AI PLATFORM V2 — PRODUCT REPOSITORY
 * Path: assets/js/features/marketplace/domain/product.repository.js
 * Version: 134.1.0 (BUILD 134.1 — CONFIGURATION-DRIVEN ARCHITECTURE)
 * Status: APPROVED & LOCKED
 * SRP: Data Repository fetching product collection directly from MarketplaceConfig without duplication.
 */

import { ProductModel } from './product.model.js';
import { MarketplaceConfig } from '../config/marketplace.config.js';

export class ProductRepository {
    constructor(customProducts = null) {
        const hasValidCustomProducts = Array.isArray(customProducts) && customProducts.length > 0;

        if (hasValidCustomProducts) {
            this._products = customProducts.map(p => p instanceof ProductModel ? p : new ProductModel(p));
        } else {
            // Map directly from MarketplaceConfig (Zero duplicated product definitions)
            this._products = MarketplaceConfig.products.map(productData => new ProductModel(productData));
        }
    }

    async getAllProducts() {
        return Promise.resolve([...this._products]);
    }
}