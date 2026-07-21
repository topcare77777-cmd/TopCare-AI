export default class Service {

    async json(url) {

        const response = await fetch(url);

        if (!response.ok)
            throw new Error(url);

        return response.json();

    }

}