export async function getAssistantData(){

try{

const response=await fetch("assets/json/assistant.json");

if(!response.ok){

throw new Error("assistant.json tidak ditemukan.");

}

return await response.json();

}

catch(error){

console.error(error);

return null;

}

}