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
  data = this.foodServ.foodNutdata;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public foodServ: FoodServiceProvider) {
    
    
  }
  ionViewDidLoad(){

  }


  closeModal() {
    this.viewCtrl.dismiss();
  }
  

}
