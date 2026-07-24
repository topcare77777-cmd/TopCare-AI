/**
 * TopCare AI Platform V2.0.0
 * Enterprise Dependency Container with iteration safety on Set collections, isolated reinitialization without terminal state interruption, global root child registry, and strict encapsulation
 * Path: assets/js/auth/container/dependency.container.js
 */

const ServiceLifetime = Object.freeze({
    Singleton: "SINGLETON",
    Transient: "TRANSIENT",
    Scoped: "SCOPED"
});

class DependencyContainer {
    constructor(parent = null) {
        this.services = new Map();
        this.parent = parent;
        this.root = parent ? parent.root : this;
        
        // Shared references across container hierarchy
        this.singletons = parent ? parent.singletons : new Map();
        this.scopedInstances = new Map();
        
        this.singletonDisposables = parent ? parent.singletonDisposables : new Set();
        this.scopedDisposables = new Set();
        
        // Global root child scope registry for hierarchical subtree tracking
        this.children = parent ? null : new Set();
        if (parent) {
            this.root.children.add(this);
        }
        
        this.lockState = parent ? parent.lockState : { locked: false };
        this.lifecycle = parent ? parent.lifecycle : { disposed: false };
    }

    _assertActive() {
        if (this.lifecycle.disposed) {
            throw new Error("Container is disposed and has reached a terminal state. Operation prohibited.");
        }
    }

    _assertUnlocked() {
        this._assertActive();
        if (this.lockState.locked) {
            throw new Error("Container is locked. Mutations are prohibited after application bootstrap phase.");
        }
    }

    register(token, definition, lifetime = ServiceLifetime.Singleton) {
        this._assertUnlocked();
        if (!token) throw new Error("Injection token is required.");
        this.services.set(token, { definition, lifetime });
    }

    lock() {
        this._assertActive();
        this.lockState.locked = true;
    }

    has(token) {
        if (this.lifecycle.disposed) return false;
        if (this.services.has(token)) return true;
        return this.parent ? this.parent.has(token) : false;
    }

    _findServiceDefinition(token) {
        if (this.services.has(token)) {
            return this.services.get(token);
        }
        return this.parent ? this.parent._findServiceDefinition(token) : null;
    }

    resolve(token) {
        this._assertActive();
        return this._internalResolve(token, []);
    }

    _internalResolve(token, resolutionStack) {
        this._assertActive();
        if (resolutionStack.includes(token)) {
            throw new Error(`Circular Dependency Detected: ${[...resolutionStack, token].map(t => t.toString()).join(' -> ')}`);
        }

        const serviceDef = this._findServiceDefinition(token);
        if (!serviceDef) {
            throw new Error(`Dependency for token not registered in container.`);
        }

        const nextStack = Object.freeze([...resolutionStack, token]);
        const currentTraceId = (typeof RequestContext !== 'undefined' && RequestContext.current) ? RequestContext.current.traceId : undefined;

        const createProxyFor = (targetContainer) => {
            const resolutionContext = Object.freeze({
                stack: nextStack,
                traceId: currentTraceId,
                resolve: (t) => targetContainer._internalResolve(t, nextStack),
                tryResolve: (t) => {
                    try { return targetContainer._internalResolve(t, nextStack); } catch (e) { return null; }
                },
                resolveOrDefault: (t, def) => {
                    try { return targetContainer._internalResolve(t, nextStack); } catch (e) { return def; }
                }
            });

            return new Proxy(resolutionContext, {
                get(target, prop, receiver) {
                    if (prop in target) {
                        const val = target[prop];
                        return typeof val === 'function' ? val.bind(target) : val;
                    }
                    if (typeof prop === 'symbol' || prop === 'constructor' || prop === 'toString' || prop === 'valueOf' || prop === 'toJSON') {
                        return Reflect.get(target, prop, receiver);
                    }
                    return undefined;
                }
            });
        };

        const containerProxy = createProxyFor(this);

        if (serviceDef.lifetime === ServiceLifetime.Transient) {
            const instance = serviceDef.definition(containerProxy);
            this._trackDisposable(instance, ServiceLifetime.Transient);
            return instance;
        }

        if (serviceDef.lifetime === ServiceLifetime.Scoped) {
            if (!this.scopedInstances.has(token)) {
                const instance = serviceDef.definition(containerProxy);
                this.scopedInstances.set(token, instance);
                this._trackDisposable(instance, ServiceLifetime.Scoped);
            }
            return this.scopedInstances.get(token);
        }

        // Singleton: Built and bound strictly using root container context
        if (!this.singletons.has(token)) {
            const rootContainer = this.root;
            const rootProxy = createProxyFor(rootContainer);
            const instance = serviceDef.definition(rootProxy);
            this.singletons.set(token, instance);
            if (!rootContainer.parent) {
                rootContainer._trackDisposable(instance, ServiceLifetime.Singleton);
            }
        }
        return this.singletons.get(token);
    }

    tryResolve(token) {
        try {
            if (this.lifecycle.disposed) return null;
            if (!this.has(token)) return null;
            return this.resolve(token);
        } catch (e) {
            return null;
        }
    }

    resolveOrDefault(token, defaultValue) {
        const instance = this.tryResolve(token);
        return instance !== null ? instance : defaultValue;
    }

    _trackDisposable(instance, lifetime) {
        if (instance && typeof instance.dispose === 'function') {
            if (lifetime === ServiceLifetime.Singleton) {
                this.singletonDisposables.add(instance);
            } else {
                this.scopedDisposables.add(instance);
            }
        }
    }

    createScope() {
        if (this.lifecycle.disposed) {
            throw new Error("Cannot create scope from a disposed container.");
        }
        return new DependencyContainer(this);
    }

    dispose() {
        if (this.lifecycle.disposed) return;
        this.lifecycle.disposed = true;

        // Self-unregistration from root registry
        if (this.parent) {
            this.root.children.delete(this);
        }

        // Cascaded disposal of all registered child scopes using snapshot array for iteration safety
        if (!this.parent && this.children) {
            const childrenSnapshot = Array.from(this.children);
            for (const childScope of childrenSnapshot) {
                try {
                    childScope.dispose();
                } catch (e) {}
            }
            this.children.clear();
        }

        for (const disposable of this.scopedDisposables) {
            try {
                disposable.dispose();
            } catch (e) {}
        }
        this.scopedDisposables.clear();
        this.scopedInstances.clear();

        // Terminal cleanup of singletons if root container
        if (!this.parent) {
            for (const disposable of this.singletonDisposables) {
                try {
                    disposable.dispose();
                } catch (e) {}
            }
            this.singletonDisposables.clear();
            this.singletons.clear();
        }
    }

    clear() {
        this._assertUnlocked();
        if (this.parent) {
            throw new Error("clear() can only be invoked on the root container instance. Use dispose() for child scopes.");
        }
        this.dispose();
        this.services.clear();
    }

    _resetScopeResources() {
        // Internal helper to clean up instances and disposables without triggering terminal lifecycle state change
        for (const disposable of this.singletonDisposables) {
            try { disposable.dispose(); } catch (e) {}
        }
        for (const disposable of this.scopedDisposables) {
            try { disposable.dispose(); } catch (e) {}
        }
        if (this.children) {
            const childrenSnapshot = Array.from(this.children);
            for (const childScope of childrenSnapshot) {
                try {
                    if (typeof childScope._resetScopeResources === 'function') {
                        childScope._resetScopeResources();
                    } else {
                        childScope.dispose();
                    }
                } catch (e) {}
            }
            this.children.clear();
        }

        this.singletonDisposables.clear();
        this.scopedDisposables.clear();
        this.singletons.clear();
        this.scopedInstances.clear();
    }

    reset() {
        // Independent clean reinitialization path completely decoupled from terminal dispose lifecycle state
        if (this.parent) {
            throw new Error("reset() can only be invoked on the root container instance.");
        }
        
        this._assertUnlocked();
        this._resetScopeResources();
        this.services.clear();
        
        this.lockState.locked = false;
        this.lifecycle.disposed = false;
    }
}