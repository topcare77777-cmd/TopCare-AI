import {getTestimonialData} from "../services/testimonial.service.js";
import {testimonialRenderer} from "../renderers/testimonial.renderer.js";

export async function initTestimonial(){

const target=document.querySelector("#testimonial");

if(!target) return;

const [template,data]=await Promise.all([

fetch("templates/components/testimonial.html"),

getTestimonialData()

]);

target.innerHTML=testimonialRenderer(

await template.text(),

data

);

initSlider();

console.log("✅ Testimonial Premium Loaded");

}

function initSlider(){

const cards=document.querySelectorAll(".testimonial-card");

if(cards.length===0) return;

let current=0;

function show(index){

cards.forEach(card=>card.classList.remove("active"));

cards[index].classList.add("active");

}

document.getElementById("testimonialNext")?.addEventListener("click",()=>{

current=(current+1)%cards.length;

show(current);

});

document.getElementById("testimonialPrev")?.addEventListener("click",()=>{

current=(current-1+cards.length)%cards.length;

show(current);

});

setInterval(()=>{

current=(current+1)%cards.length;

show(current);

},6000);

}