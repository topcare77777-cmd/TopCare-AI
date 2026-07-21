class ComponentRegistry {

    constructor() {

        this.components = {};

    }

    register(name, component) {

        this.components[name] = component;

    }

    resolve(name) {

        return this.components[name];

    }

}

export default new ComponentRegistry();