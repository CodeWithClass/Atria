import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { SettingsPage } from '../settings/settings'
import { DBService } from '../../services/db.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserStatsProvider } from '../../services/user.stats'

@IonicPage()
@Component({
  selector: 'page-mystats',
  templateUrl: 'mystats.html'
})
export class MyStatsPage {
  dataToAdd
  mystats = this.userStats.userStatsContainer || {
    age: 0,
    fname: '',
    lname: '',
    goalCaloriesIn: 0,
    heightFeet: '',
    heightInches: '',
    weight: 0,
    gender: 'Male'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fdb: AngularFireDatabase,
    public dbService: DBService,
    public userStats: UserStatsProvider
  ) {}

  launchSettings() {
    this.navCtrl.push(SettingsPage)
  }

  callDB() {
    // console.log(this.fdb.arrData);
    // console.log(this.fdb.getDataFromDB());
  }

  addData() {
    // console.log('writing stats to DB')
    this.dbService.writeStatsToDB(this.mystats)
    this.navCtrl.pop()
  }
}
