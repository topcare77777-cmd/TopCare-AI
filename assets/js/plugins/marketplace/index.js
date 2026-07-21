/**
 * Marketplace Plugin
 */


const MarketplacePlugin={



name:"marketplace",




init(){


window.TopCareMarket={


products:[],



add(product){


this.products.push(
product
);


},




list(){


return this.products;

}



};



console.log(
"Marketplace Plugin Ready"
);



}



};



export default MarketplacePlugin;