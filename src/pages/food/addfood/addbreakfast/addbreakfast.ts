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
  private app_id = "e377c6b9";
  private app_key = "8c62b43a92fbc94c0de54c53f714f9ab"
  private x: number = 0;
  searchInput: string = "";
  pageNo: number = 1;


  

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
  genFoodUrl(searchQuery, page = 1) {
    this.url = "https://api.edamam.com/api/food-database/parser?ingr=" + searchQuery + "&app_id=" + this.app_id + "&app_key="+this.app_key+"&page="+page;
    return this.foodServ.makeFoodAPICall(this.url);
  }

  genNutritionUrl(uri, measures) {
    this.url = "https://api.edamam.com/api/food-database/nutrients?app_id=" + this.app_id + "&app_key=" + this.app_key;
    return this.foodServ.makeNutAPICall(this.url, uri, measures);
  }

  showMoreFood(): Promise<any> {
    
    this.pageNo++;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.genFoodUrl(this.searchInput, this.pageNo);
        resolve();
      }, 100);
    })
  }

  // doAsyncTask(NDBno) {
  //   var promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       this.genNutritionUrl(NDBno);
  //       resolve();
  //     }, 1000);
  //   });
  //   return promise;
  // }




  strToLower(str = "no results") {
    let STR = str.toLowerCase();
    return STR;

  }

  addFoodModal(uri, _measures){ 
    let measures = _measures[1].uri;
    console.log(measures)    
    this.genNutritionUrl(uri, measures);
     
    let addFoodModal = this.modalCtrl.create(AddFoodModal)
    addFoodModal.present();
    
  }



  


}
