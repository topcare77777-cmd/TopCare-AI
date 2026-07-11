const heroNumbers = document.querySelectorAll(".hero-item h3");

heroNumbers.forEach(number=>{

    const target = parseInt(number.innerText);

    let count = 0;

    const speed = target/60;

    const update = ()=>{

        if(count<target){

            count += speed;

            number.innerText = Math.ceil(count)+"+";

            requestAnimationFrame(update);

        }else{

            number.innerText = target+"+";

        }

    }

    update();

});