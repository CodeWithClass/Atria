import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FoodPage } from '../food/food';
import { MyStatsPage } from '../mystats/mystats';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  foodRoot = FoodPage;
  mystatsRoot = MyStatsPage;



  constructor(public navCtrl: NavController) {}

}
