import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

interface foodSearchdata {
  item: object []
}

@Injectable()
export class FoodServiceProvider {

  public foodSearchdata: foodSearchdata = {item:[{ none: 0}]}
  public foodNutdata = []
  public offset: number = 0
  public noResult: boolean = false
  public measures;

  constructor(public http: HttpClient) {}
  
  /*
	Function: makeFoodAPICall(url)
	Parameter: url: string
  Return:

  Receieves a url and makes an API call to USDA.
  The response is then passed to processFoodAPIresponse.
  Also catches any errors.
  */
  public makeFoodAPICall(url) {
    console.log(url);
    return this.http.get(url)
      .subscribe(
        Response => this.processFoodAPIresponse(Response),
        err => console.log(err)
      );
  }


  /*
	Function: makeNutAPICall(url)
	Parameter: url: string
  Return: array/object

  Receieves a url and makes an API call to USDA.
  The response is then passed to processNutAPIresponse.
  Also catches any errors.
  */
  public makeNutAPICall(url){
    console.log(url);
    this.http.get(url) 
      .subscribe(
        response => this.processNutAPIresponse(response),
        err => console.log(err)
      );
  }



  /*
	Function: processNutAPIresponse(response)
	Parameter: response
  Return: none

  check if foodSearchdata is non-falsy/empty then set to
  response data. Set noResult to false.
  If foodNutdata is not emtpy then concatinate the response data.
  increment offset by 20, for 20 more results.
  set no result to flase.
  If there is no response then catch errors and set noResult to true.
  */
  processFoodAPIresponse(response){
    this.noResult = false;
    
    try{
      if(!this.foodSearchdata)
        this.foodSearchdata = response.list.item;
      else{
        this.foodSearchdata.item = this.foodSearchdata.item.concat(response.list.item);
        this.offset+=20;
       }
    }
    catch(err){
      this.noResult = true;
    }
  }



   /*
	Function: processNutAPIresponse(response)
	Parameter: response
  Return: array/object

  sets class variable: measures as response's measures.
  then set and retun foodNutdata to response's nutrients.
  */
  processNutAPIresponse(response) {
    this.measures = response.foods[0].food.nutrients[0].measures;
    return this.foodNutdata = response.foods[0].food.nutrients;

  }


   /*
	Function: strToLower(str)
	Parameter: str
  Return: str

  recieves a string and trucates UPC/GTIN and
  converts the string to to lowercase
  */
  public strToLower(_str = "no results") {
    let str = _str.split(", UPC")[0];
    str = str.split(", GTIN")[0];
    str = str.toLocaleLowerCase();
    return str;
  }
  
}


