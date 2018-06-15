import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MongosedbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MongoosedbProvider {
  
//   private Mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
  private url: any = "mongodb://dominicevans123:<Passw0rd1!>@ds257470.mlab.com:57470/blackops"
  constructor(public http: HttpClient) {

  }

  MakeDBconnection(){
    console.log('test');
    return this.http.get(this.url).subscribe(Response => console.log(Response))
   // console.log( this.http.get('mongodb://dominicevans123:<Passw0rd1!>@ds257470.mlab.com:57470/blackops')  )
   
  }

}
