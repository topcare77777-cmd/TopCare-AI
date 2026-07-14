const registry = new Map();

export function register(name,module){

    registry.set(name,module);

}

export function resolve(name){

    return registry.get(name);

}

export function getModules(){

    return registry;

}