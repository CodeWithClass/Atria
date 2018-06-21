import { HttpClient } from '@angular/common/http';
import { Http, Response} from '@angular/http'
import { Injectable } from '@angular/core';



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
  

  public makeAPICall(url) {
    console.log(url);
    return this.http.get(url).subscribe(Response => this.processAPIresponse(Response))
  }

  processAPIresponse(response){  

    if(response.list != []){
      this.foodSearchdata = response.list.item;
    }
    else
      this.foodSearchdata = ["No results, maybe try being less specific"];
  }

  public strTruncate(str){
    let STR = str.toLowerCase();
        STR = STR.split(', upc')[0];
        STR = STR.split(', gtin')[0];
    return STR; 

  }
}


