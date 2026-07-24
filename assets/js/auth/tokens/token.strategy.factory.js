/**
 * TopCare AI Platform V2.0.0
 * Token Strategy Factory
 * Path: assets/js/auth/tokens/token.strategy.factory.js
 */

class TokenStrategyFactory {
    static create(token) {
        if (token && typeof token === 'string' && token.split('.').length === 3) {
            return new JwtTokenStrategy();
        }
        return new OpaqueTokenStrategy();
    }
}