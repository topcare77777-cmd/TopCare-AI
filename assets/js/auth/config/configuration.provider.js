/**
 * TopCare AI Platform V2.0.0
 * Configuration Provider utilizing deepFreeze() upon build
 * Path: assets/js/auth/config/configuration.provider.js
 */

class ConfigurationProvider {
    constructor(baseConfig) {
        this.config = JSON.parse(JSON.stringify(baseConfig || {}));
        this.runtimeOverrides = {};
        this.isBuilt = false;
    }

    _isPlainObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    _deepMerge(target, source) {
        const output = Object.assign({}, target);
        if (this._isPlainObject(target) && this._isPlainObject(source)) {
            Object.keys(source).forEach(key => {
                if (this._isPlainObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this._deepMerge(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }

    build() {
        if (!this.isBuilt) {
            const finalConfig = this._deepMerge(this.config, this.runtimeOverrides);
            this.config = deepFreeze(finalConfig);
            this.isBuilt = true;
        }
        return this.config;
    }

    get(key) {
        const current = this.build();
        return current[key];
    }

    setRuntimeOverride(key, value) {
        if (this.isBuilt) {
            throw new Error("Cannot modify configuration after build() has been locked.");
        }
        if (this._isPlainObject(value) && this._isPlainObject(this.config[key])) {
            this.runtimeOverrides[key] = this._deepMerge(this.config[key], value);
        } else {
            this.runtimeOverrides[key] = value;
        }
    }

    getAll() {
        return this.build();
    }
}