import DataLoader
from "../core/data-loader.js";



class HeroService{


async get(){


return await DataLoader.load(
"homepage/hero"
);


}


}



export default new HeroService();