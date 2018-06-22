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

  public foodSearchdata = [];
  public foodSearchdata2 = [];

  constructor(public http: HttpClient) {
  }
  

  public makeAPICall(url) {
    console.log(url);
    return this.http.get(url).subscribe(Response => this.processAPIresponse(Response))
  }

  processAPIresponse(response){
      //if foodSearchdata is empty then populate 
      //esle populate foodSearch2 and concat.
      if(!this.foodSearchdata)
        return this.foodSearchdata = response.list.item;
      else{
        this.foodSearchdata2 = response.list.item;
        return this.foodSearchdata = this.foodSearchdata.concat(this.foodSearchdata2);
      }

  }


  public strTruncate(str = "no results"){
    let STR = str.toLowerCase();
        STR = STR.split(', upc')[0];
        STR = STR.split(', gtin')[0];
    return STR; 

  }
}


