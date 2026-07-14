import { getPersonalityData } from "../services/personality.service.js";
import { personalityRenderer } from "../renderers/personality.renderer.js";

export async function initPersonality(){

try{

const target=document.querySelector("#personality");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/personality.html"),

getPersonalityData()

]);

target.innerHTML=personalityRenderer(

await template.text(),

data

);

console.log("✅ Personality Premium Loaded");

}

catch(error){

console.error(error);

}

}