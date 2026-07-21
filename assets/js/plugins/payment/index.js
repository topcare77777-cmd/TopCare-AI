/**
 * Payment Plugin
 */


const PaymentPlugin = {


name:"payment",



init(){


window.TopCarePayment={



createInvoice(order){


return {


id:
"INV-"+Date.now(),


order,

status:
"pending"


};


}



};



console.log(
"Payment Plugin Ready"
);



}



};



export default PaymentPlugin;