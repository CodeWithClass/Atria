import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the MystatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mystats',
  templateUrl: 'mystats.html',
})
export class MyStatsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  launchSettings() {
    this.navCtrl.push(SettingsPage);
  }

}
