export async function getTestimonialData(){

const response=await fetch("assets/json/testimonial.json");

if(!response.ok){

throw new Error("testimonial.json tidak ditemukan.");

}

return await response.json();

}