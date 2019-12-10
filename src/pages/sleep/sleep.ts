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
  public mainSleep = {
    startTime: '',
    timeInBed: [0, 0],
    minutesAsleep: 0,
    sleepTime: [0, 0],
    awakeningsCount: 0,
    awakeDuration: 0,
    awakeTime: [0, 0],
    restlessCount: 0,
    restlessDuration: 0,
    restlessTime: [0, 0]
  }
  public slpProps: object = sleepChartProperties

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FitbitService,
    public userStats: UserStatsProvider
  ) {
    this.mainSleep = userStats.sleepData.mainSleep
  }

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
