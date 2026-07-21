import StatisticsRenderer from "../renderers/statistics.renderer.js";


class StatisticsModule {


async init(){

    await StatisticsRenderer.init();

}


}


export default new StatisticsModule();