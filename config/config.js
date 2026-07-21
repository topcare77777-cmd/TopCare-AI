const configuration = new Map();

export function setConfig(key, value) {

    configuration.set(key, value);

}

export function getConfig(key) {

    return configuration.get(key);

}

export function hasConfig(key) {

    return configuration.has(key);

}

export function removeConfig(key) {

    configuration.delete(key);

}

export function getAllConfig() {

    return Object.fromEntries(configuration);

}