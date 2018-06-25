import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FoodServiceProvider } from '../../../../providers/foodservice/foodservice';
import { AddFoodModal } from '../addfoodmodal/addfoodmodal';


/**
 * Generated class for the AddbreakfastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addbreakfast',
  templateUrl: 'addbreakfast.html',
})
export class AddBreakfastPage {
  // private url: string = "https://api.edamam.com/api/food-database/parser?ingr=chicken&app_id=e377c6b9&app_key=96dfe8d0cc43da2ac99a89ee8fa1ec04&page=0";
  
  private url: string = "";
  private api_key = "dxWIz33dZG11ZFOt5MgAixHizWiH6uGT4W9Jx9JS";
  searchInput: string = "";
  searchOffset: number = 0;


  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public foodServ: FoodServiceProvider,
    public modalCtrl: ModalController,
    ) {   
  }
  
  //get the serach element and extract the search value.
  //then pass the value to genFoodUrl
  getSearchInput(searchText) {
    this.searchInput = searchText.srcElement.value;
    this.foodServ.foodSearchdata = [];
    this.genFoodUrl(this.searchInput);
    
  }

  //receives a search query and offset, uses them to
  //composes a url and passes the url to getSearchResponse
  genFoodUrl(searchQuery, offset = 0) {
    this.url = "https://api.nal.usda.gov/ndb/search/?format=json&q="+searchQuery+"&ort=n&max=20&offset="+offset+"&api_key="+this.api_key;
    return this.foodServ.makeFoodAPICall(this.url);
  }

  genNutritionUrl(ndbno) {
    this.url = "https://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=b&format=json&api_key=" + this.api_key;


    return this.foodServ.makeNutAPICall(this.url);
  }

  showMoreFood(offset): Promise<any> {
    
    this.searchOffset += offset;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.genFoodUrl(this.searchInput, this.searchOffset);
        resolve();
      }, 500);
    })
  }

  doAsyncTask(NDBno) {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.genNutritionUrl(NDBno);
        resolve();
      }, 1000);
    });
    return promise;
  }

  addFoodModal(_NDBno){ 

    this.genNutritionUrl(_NDBno);
     
    let addFoodModal = this.modalCtrl.create(AddFoodModal, { NDBno: _NDBno })
    addFoodModal.present();
    

  }

  


}
