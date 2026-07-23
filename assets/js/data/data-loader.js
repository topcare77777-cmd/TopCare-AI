/**
 * TopCare AI Data Loader
 * Lightweight JSON Database Engine
 */

class DataLoader {

    constructor(){

        this.cache = new Map();

        this.basePath = "/assets/json/";

    }


    async load(file){

        if(this.cache.has(file)){
            return this.cache.get(file);
        }


        try{

            const response = await fetch(
                `${this.basePath}${file}.json`
            );


            if(!response.ok){
                throw new Error(
                    `JSON not found : ${file}`
                );
            }


            const data = await response.json();


            this.cache.set(
                file,
                data
            );


            return data;


        }catch(error){

            console.error(
                "Data Loader Error:",
                error
            );


            return {};

        }

    }


    clear(){

        this.cache.clear();

    }

}


export default new DataLoader();