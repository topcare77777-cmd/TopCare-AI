import App from "../core/app.js";

import LazyLoader 
from "../core/lazy.loader.js";

import ErrorHandler
from "../core/error.handler.js";

import Offline
from "../core/offline.js";

import Performance
from "../core/performance.js";

class Bootstrap {



async init(){


Performance.start();


ErrorHandler.init();


LazyLoader.init();


Offline.register();


this.detectPage();



Performance.end();



}


this.detectPage();



}



detectPage(){


const page =
document.body.dataset.page;



if(!page){

return;

}



const pages =
page.split(",");



pages.forEach(
item=>{

App.register(
item.trim()
);


});


}



async run(){


await this.init();


await App.start();


}



}



export default new Bootstrap();
