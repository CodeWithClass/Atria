import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DBService } from '../../../services/db.service'
import { UserStatsProvider } from '../../../services/user.stats'
import _ from 'lodash'

@IonicPage()
@Component({
  selector: 'page-manualbp',
  templateUrl: 'manualbp.html'
})
export class ManualbpPage {
  bpData = this.userStats.bpData
  pid = null
  systolic = null
  diastolic = null
  hr = null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbService: DBService,
    public userStats: UserStatsProvider
  ) {}

  public addData() {
    console.log(this.bpData)
    this.bpData.unshift({
      measurement: {
        pid: _.random(1221226674, 8321226674),
        date: this.userStats.todaysDate,
        diastolic: this.diastolic,
        systolic: this.systolic,
        hr: this.hr || 0
      }
    })

    this.dbService.writeDailyStatsToDB(
      this.userStats.todaysDate,
      this.bpData,
      'bp'
    )
  }
}
