const CACHE =
"topcare-ai-v1";


const FILES=[

"/",

"/index.html",

"/assets/css/style.css",

"/assets/js/main.js"

];



self.addEventListener(
"install",
event=>{


event.waitUntil(

caches.open(CACHE)

.then(cache=>
cache.addAll(FILES)
)

);


});



self.addEventListener(
"fetch",
event=>{


event.respondWith(


caches.match(
event.request
)

.then(response=>{


return response ||

fetch(event.request);


})


);



});