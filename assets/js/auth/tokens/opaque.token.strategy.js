/**
 * TopCare AI Platform V2.0.0
 * Opaque Token Strategy implementation
 * Path: assets/js/auth/tokens/opaque.token.strategy.js
 */

class OpaqueTokenStrategy extends TokenStrategyInterface {
    parse(token) {
        // Opaque tokens don't carry payload on client side
        return { token, type: "opaque" };
    }

    isExpired(token) {
        // Opaque tokens require backend validation
        return false;
    }
}