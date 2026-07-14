export async function getFAQData(){

const response=await fetch("assets/json/faq.json");

if(!response.ok){

throw new Error("faq.json tidak ditemukan");

}

return await response.json();

}