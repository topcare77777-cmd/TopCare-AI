export function getCurrentRoute(){

    return window.location.pathname;

}

export function isHome(){

    return getCurrentRoute().includes("index");

}