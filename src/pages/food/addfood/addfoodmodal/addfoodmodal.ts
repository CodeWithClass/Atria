import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FoodServiceProvider } from '../../../../providers/foodservice/foodservice';

/**
 * Generated class for the AddfoodmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-addfoodmodal',
  templateUrl: 'addfoodmodal.html',
})
export class AddFoodModal {
  ndbno;
  nutData = this.foodServ.foodNutdata;
  brand = this.navParams.get('Brand');
  label = this.navParams.get('Label');
  measures = this.navParams.get('Measures');
  NoOfServ: number = 1;
  ServingSize: number = 0;
  cow = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public foodServ: FoodServiceProvider) {
    
    
  }
  ionViewDidLoad(){
    console.log(this.measures)
  }

  
  closeModal() {
    this.viewCtrl.dismiss();
  }
  
  getNutdata(_macro: string, _quantity: string){  
    if (typeof this.foodServ.foodNutdata.totalNutrients[_macro] === "object"){
      // console.log(this.foodServ.foodNutdata.totalNutrients[_macro][_quantity]);
      return this.foodServ.foodNutdata.totalNutrients[_macro][_quantity];
    }
    else{
      return 0;
    }
  }

}
