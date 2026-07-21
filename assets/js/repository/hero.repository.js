import {loadJson}
from "../services/loader.service.js";

export async function getHero(){

    return await loadJson(
        "/assets/json/homepage/hero.json"
    );

}