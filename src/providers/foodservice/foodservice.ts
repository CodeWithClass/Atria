import { HttpClient } from '@angular/common/http';
import { Http, Response} from '@angular/http'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


/*
  Generated class for the FoodserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodServiceProvider {

  public foodSearchdata: any[] = [];

  constructor(public http: HttpClient) {
    
  }
  

  makeAPICall(url) {
    return this.http.get(url).subscribe(Response => this.processAPIresponse(Response))
  }

  processAPIresponse(Response){
    this.foodSearchdata = Response.hints;
    console.log(this.foodSearchdata);
    // console.log(Response.hints.food.label);
  }
}
