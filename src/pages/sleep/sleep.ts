import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FitbitService } from '../../services/fitbit.service'
import { UserStatsProvider } from '../../services/user.stats'
import { sleepChartProperties } from '../../helpers/charts'

@IonicPage()
@Component({
  selector: 'page-sleep',
  templateUrl: 'sleep.html'
})
export class SleepPage {
  public slpProps: object = sleepChartProperties

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FitbitService,
    public userStats: UserStatsProvider
  ) {}

  ionViewDidLoad() {}

  public chartClicked($event) {}

  public fitbitAuth() {
    return this.fbService.Auth()
  }

  public fitbitAuthStatus() {
    return this.fbService.getAuthStatus()
  }

  public fetchActData(manual: boolean = false) {
    return this.fbService.getData(manual, 'sleep')
  }
}
