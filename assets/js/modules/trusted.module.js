import TrustedRenderer from "../renderers/trusted.renderer.js";


class TrustedModule {


async init(){

    await TrustedRenderer.init();

}


}


export default new TrustedModule();