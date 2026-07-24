/**
 * TopCare AI Platform V2.0.0
 * Token Utility delegating to TokenStrategyFactory
 * Path: assets/js/auth/utils/auth.token.js
 */

class AuthTokenUtil {
    static isJWT(token) {
        return TokenStrategyFactory.create(token) instanceof JwtTokenStrategy;
    }

    static tryParseJWT(token) {
        const strategy = TokenStrategyFactory.create(token);
        return strategy.parse(token);
    }

    static isTokenExpired(token) {
        const strategy = TokenStrategyFactory.create(token);
        return strategy.isExpired(token);
    }
}