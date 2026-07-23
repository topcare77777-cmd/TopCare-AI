import CacheEngine from "./cache.engine.js";

import RequestPool from "../network/request.pool.js";

class JsonDatabase{

async load(path){

const cached=CacheEngine.get(path);

if(cached)return cached;

return RequestPool.add(async()=>{

const response=await fetch(

`assets/json/${path}.json`

);

const json=await response.json();

CacheEngine.set(path,json);

return json;

});

}

}

export default new JsonDatabase();