import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddBreakfastPage } from './addbreakfast/addbreakfast';

/**
 * Generated class for the AddfoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfood',
  templateUrl: 'addfood.html',
})
export class AddFoodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  launchAddFoodSubPage(){
    this.navCtrl.push(AddBreakfastPage, {}, {animate: true , direction: 'forward'});
  }
}
