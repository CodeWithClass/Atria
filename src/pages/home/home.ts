import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'
import { SettingsPage } from '../settings/settings'
import { UserStatsProvider } from '../../services/user.stats'
import { RecommenderProvider } from '../../providers/recommender/recommender.service'
import { DBService } from '../../services/db.service'
import { BPService } from '../../services/bp.service'
import { FitbitService } from '../../services/fitbit.service'
import { FoodPage } from '../food/food'
import { MyStatsPage } from '../mystats/mystats'
import { BloodPressurePage } from '../bloodpressure/bloodpressure'
import { SleepPage } from '../sleep/sleep'
import { WelcomePage } from '../welcome/welcome'
import { ActivityPage } from '../activity/activity'
import { sleepChartProperties } from '../../helpers/charts'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public slpProps: object = sleepChartProperties
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public userStats: UserStatsProvider,
    public dbServ: DBService,
    public bpServ: BPService,
    public fbServ: FitbitService,
    public recProv: RecommenderProvider
  ) {}

  ionViewDidLoad() {
    this.events.publish('homeLoaded')
    this.bpServ.fetchBPdata()
    this.fbServ.getData(false, 'activities')
    this.recProv.generateRec()
  }

  public checkIfStats() {
    if (this.userStats.userStatsContainer['nodata'] == true)
      this.navCtrl.setRoot(
        MyStatsPage,
        {},
        { animate: true, direction: 'forward' }
      )
  }

  public pushPage(page: string) {
    switch (page) {
      case 'bloodpressure':
        this.navCtrl.push(
          BloodPressurePage,
          {},
          { animate: true, direction: 'forward' }
        )
        break
      case 'food':
        this.navCtrl.push(FoodPage, {}, { animate: true, direction: 'forward' })
        break
      case 'stats':
        this.navCtrl.push(
          MyStatsPage,
          {},
          { animate: true, direction: 'forward' }
        )
        break
      case 'activity':
        this.navCtrl.push(
          ActivityPage,
          {},
          { animate: true, direction: 'forward' }
        )
        break
      case 'sleep':
        this.navCtrl.push(
          SleepPage,
          {},
          { animate: true, direction: 'forward' }
        )
        break
      case 'welcome':
        this.navCtrl.push(
          WelcomePage,
          {},
          { animate: true, direction: 'forward' }
        )
        break
      case 'settings':
        this.navCtrl.push(
          SettingsPage,
          {},
          { animate: true, direction: 'forward' }
        )
        break
    }
  }

  public chartClicked($event) {}
}
