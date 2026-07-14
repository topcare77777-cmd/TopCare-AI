import { getCommunityData } from "../services/community.service.js";
import { communityRenderer } from "../renderers/community.renderer.js";

export async function initCommunity(){

try{

const target=document.querySelector("#community");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/community.html"),

getCommunityData()

]);

target.innerHTML=communityRenderer(

await template.text(),

data

);

console.log("✅ Community Premium Loaded");

}

catch(error){

console.error(error);

}

}