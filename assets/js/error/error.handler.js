class ErrorHandler {



init(){


window.onerror =
(
message,
source,
line,
column
)=>{


console.error({

message,

source,

line,

column

});



return true;



};



}



show(message){


const box =
document.createElement(
"div"
);



box.className=
"error-box";


box.innerText=
message;



document.body.appendChild(
box
);



setTimeout(()=>{

box.remove();

},4000);



}



}



export default new ErrorHandler();