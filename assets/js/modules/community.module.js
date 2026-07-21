import CommunityRenderer from "../renderers/community.renderer.js";


class CommunityModule {


async init(){

    await CommunityRenderer.init();

}


}


export default new CommunityModule();