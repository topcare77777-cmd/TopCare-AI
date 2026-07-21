import BaseRepository 
from "./base.repository.js";



class EbookRepository
extends BaseRepository{


constructor(){

super(
"ebook"
);

}





async premium(){


return await this.where(

item =>
item.premium===true

);


}




}



export default new EbookRepository();