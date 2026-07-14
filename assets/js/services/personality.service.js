export async function getPersonalityData(){

try{

const response=await fetch("assets/json/personality.json");

if(!response.ok){

throw new Error("personality.json tidak ditemukan.");

}

return await response.json();

}

catch(error){

console.error(error);

return null;

}

}