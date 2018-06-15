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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public foodServ: FoodServiceProvider,
    public modalCtrl: ModalController,
    ) {   
  }
  
  getSearchInput(searchbar) {
    let query = searchbar.srcElement.value;
    console.log(query);
    this.genURL(query);
  }

  genURL(searchQuery) {
    this.url = "https://api.edamam.com/api/food-database/parser?ingr=" + searchQuery + "&app_id=e377c6b9&app_key=96dfe8d0cc43da2ac99a89ee8fa1ec04&page=0";
    console.log(this.url)
    this.getSearchResponse(this.url);
  }

  getSearchResponse(url) {
    this.foodServ.makeAPICall(url);
  }

  addFoodModal(){
    let addFoodModal = this.modalCtrl.create(AddFoodModal);
        addFoodModal.present(); 

  }

  


}
