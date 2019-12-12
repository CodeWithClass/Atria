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
  public syncErr = false

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

  public shouldDisplay(val) {
    if (val > 0) return true
    return false
  }
  public refresh(event = { complete: () => {} }) {
    this.syncErr = false
    this.fbService
      .getData(true, 'sleep')
      .then(() => {
        event.complete()
      })
      .catch(() => {
        this.syncErr = true
        event.complete()

        setTimeout(() => {
          this.syncErr = false
        }, 2000)
      })
  }
}
