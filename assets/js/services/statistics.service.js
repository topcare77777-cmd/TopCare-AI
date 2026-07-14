export async function getStatisticsData(){

    try{

        const response=await fetch("assets/json/statistics.json");

        if(!response.ok){

            throw new Error("statistics.json tidak ditemukan.");

        }

        return await response.json();

    }

    catch(error){

        console.error(error);

        return null;

    }

}