class Modal {


open(title,content){


const modal =
document.createElement("div");


modal.className =
"modal";


modal.innerHTML = `


<div class="modal-box">


<h3>

${title}

</h3>


<div>

${content}

</div>


<button id="closeModal">

Tutup

</button>


</div>


`;



document.body.appendChild(modal);



document
.querySelector("#closeModal")
.onclick=()=>{

modal.remove();

};



}



close(){

const modal =
document.querySelector(".modal");


if(modal)

modal.remove();


}



}


export default new Modal();