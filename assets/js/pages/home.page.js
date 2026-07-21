import Hero
from "../components/hero.component.js";


import Personality
from "../components/personality.component.js";


import Article
from "../components/article.component.js";


import FAQ
from "../components/faq.component.js";




class HomePage{


async mount(){


await Hero.mount();


await Personality.mount();


await Article.mount();


await FAQ.mount();



}



}



export default new HomePage();