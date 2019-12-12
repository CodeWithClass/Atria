import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FitbitService } from '../../services/fitbit.service'
import { UserStatsProvider } from '../../services/user.stats'

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {
  public syncErr = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FitbitService,
    public userStats: UserStatsProvider
  ) {}

  public fitbitAuth() {
    return this.fbService.Auth()
  }

  public fitbitAuthStatus() {
    return this.fbService.getAuthStatus()
  }

  public refresh(event = { complete: () => {} }) {
    this.syncErr = false
    this.fbService
      .getData(true, 'activities')
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
