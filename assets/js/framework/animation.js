export function revealOnScroll(){

    const items=document.querySelectorAll("[data-animate]");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting){

                return;

            }

            const animation=entry.target.dataset.animate;

            entry.target.classList.add(animation);

            observer.unobserve(entry.target);

        });

    },{

        threshold:.20

    });

    items.forEach(item=>{

        observer.observe(item);

    });

}