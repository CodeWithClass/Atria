import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DBService } from '../../../services/db.service'
import { UserStatsProvider } from '../../../services/user.stats'

@IonicPage()
@Component({
  selector: 'page-manualbp',
  templateUrl: 'manualbp.html'
})
export class ManualbpPage {
  bpData = this.userStats.bpData
  systolic = null
  diastolic = null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbService: DBService,
    public userStats: UserStatsProvider
  ) {}

  public addData() {
    this.bpData[0]['data'].push(this.systolic)
    this.bpData[1]['data'].push(this.diastolic)

    this.dbService.writeDailyStatsToDB(
      this.userStats.todaysDate,
      this.bpData,
      'bp'
    )
  }
}
