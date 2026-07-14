import { getAssistantData } from "../services/assistant.service.js";
import { assistantRenderer } from "../renderers/assistant.renderer.js";

export async function initAssistant(){

try{

const target=document.querySelector("#assistant");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/assistant.html"),

getAssistantData()

]);

target.innerHTML=assistantRenderer(

await template.text(),

data

);

console.log("✅ Assistant Premium Loaded");

}

catch(error){

console.error(error);

}

}