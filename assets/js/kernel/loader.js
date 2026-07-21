class Loader{

    async json(url){

        const response=await fetch(url);

        if(!response.ok)
            throw new Error(url);

        return response.json();

    }

    async text(url){

        const response=await fetch(url);

        return response.text();

    }

}

export default new Loader();