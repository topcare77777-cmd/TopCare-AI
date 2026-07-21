import {loadJson}
from "../services/loader.service.js";

export async function getFaq(){

    return await loadJson(
        "/assets/json/homepage/faq.json"
    );

}