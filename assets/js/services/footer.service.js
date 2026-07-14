export async function getFooterData(){

const response=await fetch("assets/json/footer.json");

if(!response.ok){

throw new Error("footer.json tidak ditemukan.");

}

return await response.json();

}