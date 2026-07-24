/**
 * TopCare AI Platform V2.0.0
 * Membership Policy enforcing valid business rules for tier upgrades
 * Path: assets/js/auth/domain/membership.policy.js
 */

const MembershipTier = Object.freeze({
    STANDARD: 'STANDARD',
    PREMIUM: 'PREMIUM',
    ENTERPRISE: 'ENTERPRISE'
});

const TIER_RANK = Object.freeze({
    [MembershipTier.STANDARD]: 1,
    [MembershipTier.PREMIUM]: 2,
    [MembershipTier.ENTERPRISE]: 3
});

class MembershipPolicy {
    static canUpgrade(currentTier, targetTier) {
        const currentRank = TIER_RANK[currentTier] || 0;
        const targetRank = TIER_RANK[targetTier] || 0;
        return targetRank > currentRank;
    }
}