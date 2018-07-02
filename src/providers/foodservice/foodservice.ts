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

  public foodSearchdata = {
    "q": "butter",
    "sr": "Legacy",
    "ds": "any",
    "start": 0,
    "end": 2,
    "total": 4550,
    "group": "",
    "sort": "r",
    "item": [
      {
        "offset": 0,
        "group": "Branded Food Products Database",
        "name": "No results",
        "ndbno": "45112260",
        "ds": "LI",
        "manu": "Try a less specific search"
      }
    ]
  };
  public foodSearchdata2;
  public foodNutdata;
  public offset: number = 0;
  public noResult: boolean = false;
  public measures;

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
    try{
      if(!this.foodSearchdata){
        this.foodSearchdata = response.list.item;
        this.noResult = false;
        // console.log(this.foodSearchdata)
      }
      else{
        this.foodSearchdata2 = response.list;
        this.foodSearchdata.item = this.foodSearchdata.item.concat(this.foodSearchdata2.item);
        this.offset+=20;
        this.noResult = false;
        // console.log(this.foodSearchdata)
       }
    }
    catch(err){
      // console.log(err);
      this.noResult = true;
    }

  }

  processNutAPIresponse(response) {
    console.log(response.foods[0].food.nutrients);
    this.measures = response.foods[0].food.nutrients[0].measures;
    console.log(this.measures)
    return this.foodNutdata = response.foods[0].food.nutrients;

  }

  public strToLower(str = "no results") {
    str = str.split(", UPC")[0];
    str = str.split(", GTIN")[0];
    str = str.toLocaleLowerCase();
    return str;
  }



  
}


