/**
 * TopCare AI Platform V2.0.0
 * IAuthenticationService Contract Interface
 * Path: assets/js/auth/application/auth.service.interface.js
 */

class IAuthenticationService {
    async login(email, password, rememberMe = false) { throw new Error("Not implemented"); }
    async register(fullName, email, password) { throw new Error("Not implemented"); }
    async logout() { throw new Error("Not implemented"); }
    async refreshSession() { throw new Error("Not implemented"); }
}