import { getCreatorData } from "../services/creator.service.js";
import { creatorRenderer } from "../renderers/creator.renderer.js";

export async function initCreator(){

try{

const target=document.querySelector("#creator");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/creator.html"),

getCreatorData()

]);

target.innerHTML=creatorRenderer(

await template.text(),

data

);

console.log("✅ Creator Marketplace Loaded");

}

catch(error){

console.error(error);

}

}