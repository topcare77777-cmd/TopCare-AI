import { FeatureRegistry } from "../../../config/feature.registry.js";

export function getFeature(name) {

    return FeatureRegistry[name];

}

export function isFeatureActive(name) {

    return FeatureRegistry[name]?.enabled === true;

}

export function getAllFeatures() {

    return FeatureRegistry;

}