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
  searchInput: string = "";
  searchOffset: number = 0;
  showMoreResults: boolean = false;
  showSearchResults: boolean = true;

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public foodServ: FoodServiceProvider,
    public modalCtrl: ModalController,
    ) {   
  }
  
  getSearchInput(searchText) {
    this.searchInput = searchText.srcElement.value;
    this.showSearchResults = true;
    this.genURL(this.searchInput);
    
  }

  genURL(searchQuery, offset = 0) {
    this.url = "https://api.nal.usda.gov/ndb/search/?format=json&q="+searchQuery+"&ort=n&max=20&offset="+offset+"&api_key=dxWIz33dZG11ZFOt5MgAixHizWiH6uGT4W9Jx9JS";
    return this.getSearchResponse(this.url);
 
  }

  getSearchResponse(url) {
     this.foodServ.makeAPICall(url);
  }


  showMoreFood(offset): Promise<any> {
    
    this.searchOffset += offset;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.genURL(this.searchInput, this.searchOffset);
        resolve();
      }, 1000);
    })
  }

  addFoodModal(){
    let addFoodModal = this.modalCtrl.create(AddFoodModal);
        addFoodModal.present(); 

  }

  


}
