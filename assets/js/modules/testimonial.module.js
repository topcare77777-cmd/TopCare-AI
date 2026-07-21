import TestimonialRenderer from "../renderers/testimonial.renderer.js";


class TestimonialModule {


async init(){

    await TestimonialRenderer.init();

}


}


export default new TestimonialModule();