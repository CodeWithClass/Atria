import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FoodServiceProvider } from '../../../services/food.service';
import { AddFoodModal } from '../addfoodmodal/addfoodmodal';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-addmeal',
  templateUrl: 'addmeal.html',
})
export class addmealPage {
  
  pageTitle;
  private url: string = "";
  private app_key = "dxWIz33dZG11ZFOt5MgAixHizWiH6uGT4W9Jx9JS"
  hasSearched: boolean = false;
  searchInput: string = "";
 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public foodServ: FoodServiceProvider,
    public modalCtrl: ModalController,
    private keyboard: Keyboard,
    ) {
    this.pageTitle = navParams.get('PageTitle');
      
  }


  /*
	Function: getSearchInput(searchText)
	Parameter: searchText
  Return: none

  - get the serach element and extract the search value.
  - clear the previously retreived search data 
  - set hasSearch as true for search results div to be displayed.
  - reset search results offset to 0 for api call url.
  - finally pass the search text to genFoodUrl

  */

  getSearchInput(searchText){
    this.searchInput = searchText.srcElement.value;
    this.foodServ.foodSearchdata.item = [];
    this.hasSearched = true;
    this.foodServ.offset = 0;
    this.genFoodUrl(this.searchInput);
    this.keyboard.close();
  }


  /*
	Function: genFoodUrl(_searchQuery)
	Parameter: _searchQuery
  Return: function

  receives a search query and offset, uses them to
  composes a url and passes the url to foodServ.makeFoodAPICall
  */

  genFoodUrl(_searchQuery){
    let searchQuery = encodeURIComponent(_searchQuery);
    this.url = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + searchQuery + "&sort=r&max=20&offset=" +this.foodServ.offset+"&api_key="+this.app_key;
    return this.foodServ.makeFoodAPICall(this.url);
  }


    /*
	Function: genNutritionUrl(_ndbno)
	Parameter: _ndbno
  Return: function

  receives a search query and offset, uses them to
  composes a url and passes the url to foodServ.makeNutAPICall
  */
  genNutritionUrl(_ndbno) {
    let ndbno = encodeURIComponent(_ndbno);
    this.url = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=" + ndbno + "&type=b&format=json&api_key=" + this.app_key;
    return this.foodServ.makeNutAPICall(this.url);
    
  }
  


  /*
	Function: showMoreFood()
	Parameter: none
	Return: Promise
	
  Returns a promise that genFoodUrl will be called and passed
  the search input so that more search results can be retreive
  for Infinite scroll
  */
  showMoreFood(): Promise<any> {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.genFoodUrl(this.searchInput);
        resolve();
      }, 1000);
    })
  }



  /*
	Function: addFoodModal(_ndbno, _name, _manu)
	Parameter: _ndbno, _name, _manu
  Return: none

  Recieves _ndbno (ndbno number) for selected food,
  _name (name) of the food, _manu (manufacturer).
  Makes a genNutritionUrl call with the ndbno number
  Create modal object, passing _name, manu then
  presenting modal.

  */
  addFoodModal(_foodrecord){ 
    this.genNutritionUrl(_foodrecord.ndbno);

    let addFoodModal = this.modalCtrl.create(AddFoodModal, { PageTitle: this.pageTitle, Record: _foodrecord})
    addFoodModal.present();
  }


}
