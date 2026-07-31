/**
 * file: assets/js/plugins/plugin.marketplace.ranking.engine.js
 * Trust Store langsung memengaruhi bobot peringkat marketplace.
 */
import { PublisherTrustStore } from './plugin.trust.store.js';
import { TRUST_LEVELS } from './plugin.marketplace.types.js';

export class MarketplaceRankingEngine {
    static calculateScore(item) {
        if (!item) return 0;
        let score = 0;

        const publisherId = item.publisherId || item.publisher;
        const isTrustedPublisher = publisherId && PublisherTrustStore.isTrusted(publisherId);

        // Official & Trusted Publishers mendapat dorongan ranking tertinggi
        if (item.trustLevel === TRUST_LEVELS.OFFICIAL || isTrustedPublisher) {
            score += 50;
        } else if (item.trustLevel === TRUST_LEVELS.VERIFIED) {
            score += 35;
        } else if (item.trustLevel === TRUST_LEVELS.COMMUNITY) {
            score += 15;
        } else {
            score += 0; // Unsigned / Untrusted selalu di posisi paling bawah
        }

        const rating = item.rating || 0;
        score += (rating / 5.0) * 30;

        const downloads = item.downloads || 0;
        score += Math.min(20, Math.log10(downloads + 1) * 5);

        return parseFloat(score.toFixed(2));
    }
}