import {getFooterData} from "../services/footer.service.js";
import {footerRenderer} from "../renderers/footer.renderer.js";

export async function initFooter(){

const target=document.querySelector("#footer");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/footer.html"),

getFooterData()

]);

target.innerHTML=footerRenderer(

await template.text(),

data

);

document.getElementById("backTop")?.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

console.log("✅ Footer Premium Loaded");

}