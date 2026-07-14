export async function getLearningData(){

try{

const response=await fetch("assets/json/learning.json");

if(!response.ok){

throw new Error("learning.json tidak ditemukan.");

}

return await response.json();

}

catch(error){

console.error(error);

return null;

}

}