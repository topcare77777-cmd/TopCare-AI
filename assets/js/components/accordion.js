class Accordion {


init(){


document
.querySelectorAll(".accordion-title")
.forEach(title=>{


title.onclick=()=>{


title
.parentElement
.classList
.toggle("active");


};


});


}



}


export default new Accordion();