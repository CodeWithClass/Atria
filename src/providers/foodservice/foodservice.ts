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

  public foodSearchdata = [{
    "food": {
      "id": "food_a02vjc8abmth5ob3lqnv2ajrikyh",
      "uri": "http://www.edamam.com/ontologies/edamam.owl#Food_23095",
      "label": "No Results",
      "nutrients": {
        "ENERC_KCAL": "",
        "PROCNT": 21.64,
        "FAT": 4.81,
        "CHOCDF": 0.12
      },
      "source": "Generic",
      "brand": ""
    },
    "measures": [{
      "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
      "label": "Kilogram"
    }]
  }];
  public foodSearchdata2;
  public foodNutdata = {
    "uri": "http://www.edamam.com/ontologies/edamam.owl#77e6bbe0-f22d-4554-80a5-fe5809d681be",
    "yield": 1,
    "calories": 283,
    "brand": "pug",
    "totalWeight": 566.9904625,
    "dietLabels": [
      "LOW_FAT",
      "LOW_SODIUM"
          ],
            "healthLabels": [
              "FAT_FREE",
              "LOW_FAT_ABS",
              "GLUTEN_FREE",
              "WHEAT_FREE",
              "EGG_FREE",
              "PEANUT_FREE",
              "TREE_NUT_FREE",
              "SHELLFISH_FREE",
              "CELERY_FREE",
              "SESAME_FREE",
              "LUPINE_FREE",
              "B_HEALTHY"
            ],
              "cautions": [
                "SHELLFISH"
              ],
                "totalNutrients": {
    "ENERC_KCAL": {
      "label": "Energy",
        "quantity": 0,
          "unit": "kcal"
    },
    "CHOCDF": {
      "label": "Carbs",
        "quantity": 0,
          "unit": "g"
    },
    "SUGAR": {
      "label": "Sugars",
        "quantity": 0,
          "unit": "g"
    },
    "PROCNT": {
      "label": "Protein",
        "quantity": 0,
          "unit": "g"
    },
    "MG": {
      "label": "Magnesium",
        "quantity": 0,
          "unit": "mg"
    },
    "K": {
      "label": "Potassium",
        "quantity": 0,
          "unit": "mg"
    },
    "P": {
      "label": "Phosphorus",
        "quantity": 0,
          "unit": "mg"
    },
    "VITC": {
      "label": "Vitamin C",
        "quantity": 0,
          "unit": "mg"
    }
  },
  "totalDaily": {
    "ENERC_KCAL": {
      "label": "Energy",
        "quantity": 14.174761562500002,
          "unit": "%"
    },
    "CHOCDF": {
      "label": "Carbs",
        "quantity": 22.830815812473535,
          "unit": "%"
    },
    "PROCNT": {
      "label": "Protein",
        "quantity": 4.762719736300833,
          "unit": "%"
    },
    "MG": {
      "label": "Magnesium",
        "quantity": 9.92233309375,
          "unit": "%"
    },
    "K": {
      "label": "Potassium",
        "quantity": 28.349523124999997,
          "unit": "%"
    },
    "P": {
      "label": "Phosphorus",
        "quantity": 6.479891,
          "unit": "%"
    },
    "VITC": {
      "label": "Vitamin C",
        "quantity": 236.24602604166668,
          "unit": "%"
    }
  },
  "ingredients": [
    {
      "parsed": [
        {
          "quantity": 20,
          "measure": "ounce",
          "food": "ORANGE JUICE",
          "foodId": "Food_USDABR_45268136",
          "foodURI": "http://www.edamam.com/ontologies/edamam.owl#Food_USDABR_45268136",
          "foodContentsLabel": " ORANGE JUICE ",
          "weight": 566.9904625,
          "retainedWeight": 566.9904625,
          "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
          "status": "OK"
        }
      ]
    }
  ]
  }
  public micros = Object.values(this.foodNutdata.totalNutrients);

  public x: number = 0;

  constructor(public http: HttpClient) {
  }
  

  public makeFoodAPICall(url) {
    console.log(url);
    return this.http.get(url).subscribe(Response => this.processFoodAPIresponse(Response));
  }

  public makeNutAPICall(url, uri, measures){
    console.log(url);
    this.http.post(url,
      {
        "yield": 1,
        "ingredients": [
          {
            "quantity": 100,
            "measureURI": measures,
            "foodURI": uri
          }
        ]
      }
    ) 
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
    if(!(response.hints.length < 1)){

      if(!this.foodSearchdata){
         this.foodSearchdata = response.hints;
        console.log(this.foodSearchdata)
      }
      else{
        this.foodSearchdata2 = response.hints;
        this.foodSearchdata = this.foodSearchdata.concat(this.foodSearchdata2);
        console.log(this.foodSearchdata)
       }
    }

  }

  processNutAPIresponse(response) {
    console.log(response);
    this.micros = Object.values(response.totalNutrients);
    console.log(this.micros)
    return this.foodNutdata = response;

  }





  
}


