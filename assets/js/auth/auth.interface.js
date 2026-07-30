/**
 * file: assets/js/auth/auth.interface.js
 */

export class AuthInterface {
    login(credentials) { throw new Error("Not implemented"); }
    logout() { throw new Error("Not implemented"); }
    restore() { throw new Error("Not implemented"); }
    refresh() { throw new Error("Not implemented"); }
    validate() { throw new Error("Not implemented"); }
    isAuthenticated() { throw new Error("Not implemented"); }
    getUser() { throw new Error("Not implemented"); }
    getToken() { throw new Error("Not implemented"); }
}