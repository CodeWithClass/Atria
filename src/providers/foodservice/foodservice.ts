import { HttpClient } from '@angular/common/http';
import { Http, Response} from '@angular/http'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';




/*
  Generated class for the FoodserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodServiceProvider {

  public foodSearchdata = [];
  public foodSearchdata2 = [];
  public foodNutdata = [{}];

  constructor(public http: HttpClient) {
  }
  

  public makeFoodAPICall(url) {
    console.log(url);
    return this.http.get(url).subscribe(Response => this.processFoodAPIresponse(Response));
  }

  public makeNutAPICall(url){
    console.log(url);
    this.http.get(url)
         
       .subscribe(
          response => {
            return this.processNutAPIresponse(response);
            },
          err =>{
            console.log(err);
          }
    );



  }

  processFoodAPIresponse(response){
      //if foodSearchdata is empty then populate 
      //esle populate foodSearch2 and concat.
      if(!this.foodSearchdata)
        return this.foodSearchdata = response.list.item;
      else{
        this.foodSearchdata2 = response.list.item;
         this.foodSearchdata = this.foodSearchdata.concat(this.foodSearchdata2);
      }

  }

  processNutAPIresponse(response) {

     this.foodNutdata = response.report.food.nutrients;
    //  console.log(this.foodNutdata);
     return;

  }



  public strTruncate(str = "no results"){
    let STR = str.toLowerCase();
        STR = STR.split(', upc')[0];
        STR = STR.split(', gtin')[0];
    return STR; 

  }
}


