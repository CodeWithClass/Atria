import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FoodServiceProvider } from '../../../../providers/foodservice/foodservice';
import { AddFoodModal } from '../addfoodmodal/addfoodmodal';
import { resolve } from 'path';


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
  private app_id = "e377c6b9";
  private app_key = "dxWIz33dZG11ZFOt5MgAixHizWiH6uGT4W9Jx9JS"
  hasSearched: boolean = false;
  searchInput: string = "";
 

  

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
    this.foodServ.foodSearchdata.item = [];
    this.hasSearched = true;
    this.foodServ.offset = 0;
    this.genFoodUrl(this.searchInput);
    
  }

  //receives a search query and offset, uses them to
  //composes a url and passes the url to getSearchResponse
  genFoodUrl(_searchQuery) {
    let searchQuery = encodeURIComponent(_searchQuery);
    this.url = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + searchQuery + "&sort=r&max=20&offset=" +this.foodServ.offset+"&api_key="+this.app_key;
    return this.foodServ.makeFoodAPICall(this.url);
  }

  genNutritionUrl(_ndbno) {
    let ndbno = encodeURIComponent(_ndbno);
    this.url = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=" + ndbno + "&type=b&format=json&api_key=" + this.app_key;
    return this.foodServ.makeNutAPICall(this.url);
    // return new Promise((resolve) =>{
    //   setTimeout(()=>{
    //     this.foodServ.makeNutAPICall(this.url, uri, measures);
    //     resolve();
    //   }, 1000);
    // })
  }

  showMoreFood(): Promise<any> {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.genFoodUrl(this.searchInput);
        resolve();
      }, 1000);
    })
  }






  addFoodModal(_ndbno, _name, _manu){ 

    this.genNutritionUrl(_ndbno);
    
    let addFoodModal = this.modalCtrl.create(AddFoodModal, { Name: _name, Manu: _manu})
    addFoodModal.present();
  }



  


}
