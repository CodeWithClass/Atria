import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { DBService } from '../../services/db.service'
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database"; 

import { log } from 'util';
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
  dataToAdd;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fdb: AngularFireDatabase,
  ) {
  }

  launchSettings() {
    this.navCtrl.push(SettingsPage);
  }

  callDB(){
    // console.log(this.fdb.arrData);
    // console.log(this.fdb.getDataFromDB());
  }

  addData() {
    console.log('tryin')
    this.fdb.list('heros/').push(this.dataToAdd);
  }

}
