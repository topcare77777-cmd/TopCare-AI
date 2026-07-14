import { getStatisticsData } from "../services/statistics.service.js";
import { statisticsRenderer } from "../renderers/statistics.renderer.js";

export async function initStatistics(){

    try{

        const target=document.querySelector("#statistics");

        if(!target){

            console.warn("Statistics section tidak ditemukan.");

            return;

        }

        const [templateResponse,data]=await Promise.all([

            fetch("templates/components/statistics.html"),

            getStatisticsData()

        ]);

        if(!templateResponse.ok){

            throw new Error("statistics.html tidak ditemukan.");

        }

        const template=await templateResponse.text();

        target.innerHTML=statisticsRenderer(template,data);

        initCounter(target);

        console.log("✅ Statistics Premium Loaded");

    }

    catch(error){

        console.error(error);

    }

}

function initCounter(root){

    const counters=root.querySelectorAll(".stat-value");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting){

                return;

            }

            animate(entry.target);

            observer.unobserve(entry.target);

        });

    },{

        threshold:.35

    });

    counters.forEach(counter=>observer.observe(counter));

}

function animate(element){

    const target=Number(element.dataset.value);

    const suffix=element.dataset.suffix;

    const duration=1800;

    const start=performance.now();

    function frame(now){

        const progress=Math.min((now-start)/duration,1);

        const value=Math.floor(progress*target);

        element.textContent=value.toLocaleString()+suffix;

        if(progress<1){

            requestAnimationFrame(frame);

        }

    }

    requestAnimationFrame(frame);

}