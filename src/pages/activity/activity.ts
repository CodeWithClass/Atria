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
}
