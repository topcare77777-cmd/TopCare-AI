import {
EbookRepository
}
from "../repository/index.js";



class EbookService{


async list(){

return await EbookRepository.all();

}



async premium(){

return await EbookRepository.premium();

}



}


export default new EbookService();