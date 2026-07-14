export async function getCommunityData(){

try{

const response=await fetch("assets/json/community.json");

if(!response.ok){

throw new Error("community.json tidak ditemukan.");

}

return await response.json();

}

catch(error){

console.error(error);

return null;

}

}