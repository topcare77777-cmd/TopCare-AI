class Tabs {


init(){


document
.querySelectorAll("[data-tab]")
.forEach(tab=>{


tab.onclick=()=>{


const target =
tab.dataset.tab;



document
.querySelectorAll(".tab-content")
.forEach(x=>
x.style.display="none"
);



const content =
document.querySelector(target);



if(content)

content.style.display="block";



};


});


}


}


export default new Tabs();