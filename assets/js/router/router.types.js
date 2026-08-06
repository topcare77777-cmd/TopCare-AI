/**
 * file: assets/js/router/router.types.js
 * Version: 131.0.0
 * Status: RESTORED
 * SRP: Router Domain Event Contracts
 */

import { ROUTER_LOADER_EVENTS } from './route.loader.types.js';


export const ROUTER_EVENTS = Object.freeze({

    NAVIGATE: 'router.navigate',

    CHANGED: 'router.changed',

    NOT_FOUND: 'router.notFound',

    REGISTERED: 'router.registered',

    UNREGISTERED: 'router.unregistered',

    ROUTE_ALLOWED: 'route.allowed',

    ROUTE_DENIED: 'route.denied',

    ROUTE_REDIRECT: 'route.redirect',

    HISTORY_PUSH: 'router.history.push',

    HISTORY_REPLACE: 'router.history.replace',

    HISTORY_BACK: 'router.history.back',

    HISTORY_FORWARD: 'router.history.forward',

    ROUTE_LOADING: ROUTER_LOADER_EVENTS.LOADING,

    ROUTE_LOADED: ROUTER_LOADER_EVENTS.LOADED,

    ROUTE_LOAD_FAILED: ROUTER_LOADER_EVENTS.FAILED

});


export { ROUTER_LOADER_EVENTS };


export const ROUTER_MODES = Object.freeze({

    HASH: 'hash',

    HISTORY: 'history'

});