class LazyLoader{

observe(selector,callback){

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

callback(entry.target);

observer.unobserve(entry.target);

}

});

});

document.querySelectorAll(selector)

.forEach(el=>observer.observe(el));

}

}

export default new LazyLoader();