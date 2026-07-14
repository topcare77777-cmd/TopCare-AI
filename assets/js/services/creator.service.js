export async function getCreatorData(){

try{

const response=await fetch("assets/json/creator.json");

if(!response.ok){

throw new Error("creator.json tidak ditemukan.");

}

return await response.json();

}

catch(error){

console.error(error);

return null;

}

}