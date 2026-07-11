// =====================================
// TopCare AI
// Main Script
// =====================================

console.log("TopCare AI Loaded");

// Data
const nama = "Syaiful";
const umur = 52;

console.log("Nama :", nama);
console.log("Umur :", umur);

// Mengambil Judul
const judul = document.querySelector("h1");

if (judul) {

    judul.classList.add("title-active");

}

// Tombol Belajar
const btnBelajar = document.getElementById("btnBelajar");

if (btnBelajar) {

    btnBelajar.addEventListener("click", () => {

        console.log("Mulai Belajar");

    });

}

//=====================================
// Portfolio Filter
//=====================================

const filterBtns =
document.querySelectorAll(".filter-btn");

const projects =
document.querySelectorAll(".project-card");

filterBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filterBtns.forEach(item=>{

            item.classList.remove("active");

        });

        btn.classList.add("active");

        const filter =
        btn.dataset.filter;

        projects.forEach(project=>{

            if(

                filter==="all" ||

                project.dataset.category===filter

            ){

                project.classList.remove("hide");

            }

            else{

                project.classList.add("hide");

            }

        });

    });

});