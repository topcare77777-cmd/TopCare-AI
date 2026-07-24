/**
 * TopCare AI Platform V2.0.0
 * JWT Token Strategy implementation
 * Path: assets/js/auth/tokens/jwt.token.strategy.js
 */

class JwtTokenStrategy extends TokenStrategyInterface {
    parse(token) {
        try {
            if (!token || typeof token !== 'string' || token.split('.').length !== 3) return null;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    isExpired(token) {
        const payload = this.parse(token);
        if (!payload || !payload.exp) return false;
        return Date.now() >= payload.exp * 1000;
    }
}