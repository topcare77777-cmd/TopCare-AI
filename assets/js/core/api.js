import {CSRF}
from "../security/index.js";


class API {



async request(url,options={}){


options.headers={

"Content-Type":
"application/json",

"X-CSRF-TOKEN":
CSRF.get(),

...options.headers

};



try{


const response =
await fetch(
url,
options
);



return await response.json();



}

catch(error){


console.error(
"API ERROR",
error
);


return null;


}



}



}



export default new API();