import { getLearningData } from "../services/learning.service.js";
import { learningRenderer } from "../renderers/learning.renderer.js";

export async function initLearning(){

try{

const target=document.querySelector("#learning");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/learning.html"),

getLearningData()

]);

const html=await template.text();

target.innerHTML=learningRenderer(html,data);

console.log("✅ Learning Premium Loaded");

}

catch(error){

console.error(error);

}

}