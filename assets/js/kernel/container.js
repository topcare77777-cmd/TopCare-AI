class Container {
    constructor() {
        this.instances = new Map();
        this.factories = new Map();
    }

    singleton(name, factory) {
        this.factories.set(name, factory);
    }

    register(name, instance) {
        this.instances.set(name, instance);
    }

    has(name) {
        return this.instances.has(name) || this.factories.has(name);
    }

    resolve(name) {

        if (this.instances.has(name))
            return this.instances.get(name);

        if (!this.factories.has(name))
            throw new Error(`${name} not registered`);

        const instance = this.factories.get(name)(this);

        this.instances.set(name, instance);

        return instance;
    }

    remove(name){
        this.instances.delete(name);
    }

    clear(){
        this.instances.clear();
        this.factories.clear();
    }
}

export default new Container();