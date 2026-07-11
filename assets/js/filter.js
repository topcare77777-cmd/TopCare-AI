// ==========================
// Portfolio Filter
// ==========================

const filterBtns =
document.querySelectorAll(".filter-btn");

const cards =
document.querySelectorAll(".project-card");

filterBtns.forEach(button=>{

button.addEventListener("click",()=>{

filterBtns.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

const filter =
button.dataset.filter;

cards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

}

else if(card.dataset.category===filter){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

});