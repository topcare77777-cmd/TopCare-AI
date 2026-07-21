import DataEngine from "../core/data.engine.js";

export default class BaseService {

    constructor(source) {

        this.source = source;

    }


    async all() {

        return await DataEngine.load(
            this.source,
            `${this.source}.json`
        );

    }


    async find(id) {

        const data = await this.all();

        if (!Array.isArray(data))
            return null;


        return data.find(
            item => item.id == id
        );

    }


    async search(keyword) {

        const data = await this.all();


        if (!Array.isArray(data))
            return [];


        return data.filter(item =>

            JSON.stringify(item)
            .toLowerCase()
            .includes(
                keyword.toLowerCase()
            )

        );

    }


    async latest(limit = 5) {

        const data = await this.all();


        if (!Array.isArray(data))
            return [];


        return data
            .slice(0, limit);

    }

}