import HeroRenderer from "../renderers/hero.renderer.js";


class HeroModule {


async init(){

    await HeroRenderer.init();

}


}


export default new HeroModule();