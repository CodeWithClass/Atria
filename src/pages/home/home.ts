import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  maxCalories: string = "2000";
  currCalories: string = "1560";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  launchSettings(){
    this.navCtrl.push(SettingsPage);
  }
  
  getCurrCalories(){
    return this.currCalories;    
  }

  getMaxCalories(){
    return this.maxCalories
  }

  setCurrCalories(Curr){
  }

  setMaxCalories(Max) {
  }

}
