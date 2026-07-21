class UniversalRenderer {


constructor(){

this.renderers=[];

}



register(renderer){

this.renderers.push(renderer);

}



async run(){

for(const renderer of this.renderers){

if(renderer.init)

await renderer.init();

}

}



}


export default new UniversalRenderer();