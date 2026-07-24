/**
 * TopCare AI Platform V2.0.0
 * Browser Storage Implementation
 * Path: assets/js/auth/storage/local.storage.js
 */

class AuthLocalStorage extends AuthStorageInterface {
    constructor(config) {
        super();
        this.config = config || {};
        this.prefix = this.config.STORAGE_PREFIX || "topcare_auth_";
        this.type = this.config.STORAGE_TYPE || "localStorage";
    }

    _getEngine() {
        if (this.type === "sessionStorage") return sessionStorage;
        return localStorage;
    }

    setItem(key, value) {
        try {
            const serialized = JSON.stringify(value);
            if (this.type === "cookie") {
                document.cookie = `${this.prefix}${key}=${encodeURIComponent(serialized)}; path=/; max-age=1800; SameSite=Strict`;
            } else {
                this._getEngine().setItem(this.prefix + key, serialized);
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    getItem(key) {
        try {
            let serialized = null;
            if (this.type === "cookie") {
                const name = `${this.prefix}${key}=`;
                const decodedCookie = decodeURIComponent(document.cookie);
                const ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1);
                    if (c.indexOf(name) === 0) serialized = c.substring(name.length, c.length);
                }
            } else {
                serialized = this._getEngine().getItem(this.prefix + key);
            }
            return serialized ? JSON.parse(serialized) : null;
        } catch (e) {
            return null;
        }
    }

    removeItem(key) {
        try {
            if (this.type === "cookie") {
                document.cookie = `${this.prefix}${key}=; path=/; max-age=0;`;
            } else {
                this._getEngine().removeItem(this.prefix + key);
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    clear() {
        try {
            if (this.type === "cookie") {
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
            } else {
                const engine = this._getEngine();
                const keysToRemove = [];
                for (let i = 0; i < engine.length; i++) {
                    const k = engine.key(i);
                    if (k && k.startsWith(this.prefix)) keysToRemove.push(k);
                }
                keysToRemove.forEach(k => engine.removeItem(k));
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    has(key) {
        return this.getItem(key) !== null;
    }

    keys() {
        try {
            const found = [];
            if (this.type !== "cookie") {
                const engine = this._getEngine();
                for (let i = 0; i < engine.length; i++) {
                    const k = engine.key(i);
                    if (k && k.startsWith(this.prefix)) {
                        found.push(k.substring(this.prefix.length));
                    }
                }
            }
            return found;
        } catch (e) {
            return [];
        }
    }

    size() {
        return this.keys().length;
    }
}