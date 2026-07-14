import {getFAQData} from "../services/faq.service.js";
import {faqRenderer} from "../renderers/faq.renderer.js";

export async function initFAQ(){

const target=document.querySelector("#faq");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/faq.html"),

getFAQData()

]);

target.innerHTML=faqRenderer(

await template.text(),

data

);

initAccordion();

initSearch();

console.log("✅ FAQ Premium Loaded");

}

function initAccordion(){

document.querySelectorAll(".faq-question")

.forEach(button=>{

button.onclick=()=>{

button.parentElement.classList.toggle("open");

};

});

}

function initSearch(){

const input=document.querySelector("#faqSearch");

if(!input) return;

input.addEventListener("input",()=>{

const keyword=input.value.toLowerCase();

document.querySelectorAll(".faq-item")

.forEach(item=>{

const text=item.innerText.toLowerCase();

item.style.display=text.includes(keyword)?"block":"none";

});

});

}