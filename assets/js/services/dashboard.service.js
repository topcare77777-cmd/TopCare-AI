import Store from "../state/store.js";

class DashboardService{

async load(){

await Promise.all([

Store.dispatch("loadHero"),

Store.dispatch("loadArticles"),

Store.dispatch("loadFAQ")

]);

}

}

export default new DashboardService();