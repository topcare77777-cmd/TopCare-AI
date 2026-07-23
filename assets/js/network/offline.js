class OfflineManager {



register(){



if(
"serviceWorker"
in navigator
){


navigator.serviceWorker
.register(
"/service-worker.js"
)

.then(()=>{


console.log(
"Offline mode enabled"
);


})


.catch(
err=>
console.error(err)
);


}



}



}



export default new OfflineManager();