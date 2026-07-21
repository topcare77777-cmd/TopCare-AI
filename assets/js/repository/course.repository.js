import BaseRepository
from "./base.repository.js";



class CourseRepository
extends BaseRepository{


constructor(){

super(
"courses"
);

}





async featured(){


return await this.where(

course =>
course.featured===true

);


}



}


export default new CourseRepository();