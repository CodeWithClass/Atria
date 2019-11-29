import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { SettingsPage } from '../settings/settings'
import { UserStatsProvider } from '../../services/user.stats'
import { DBService } from '../../services/db.service'
import { BPService } from '../../services/bp.service'
import { FoodPage } from '../food/food'
import { MyStatsPage } from '../mystats/mystats'
import { BloodPressurePage } from '../bloodpressure/bloodpressure'
import { SleepPage } from '../sleep/sleep'
import { WelcomePage } from '../welcome/welcome'
import { ActivityPage } from '../activity/activity'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // public sleepChartLabels: string[] = ['Deep Sleep', 'Light Sleep', 'Wake Sleep'];
  public sleepChartType: string = 'doughnut'
  public sleepChartColors: object[] = [
    {
      backgroundColor: [
        'rgba(167,72,195,0.8)',
        'rgba(110,89,201,0.8)',
        'rgba(85,173,224,0.8)'
      ]
    }
  ]
  public sleepChartData: number[] = [350, 450, 100]
  public sleepTotal: number[] = [8, 39]
  public sleepChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userStats: UserStatsProvider,
    public dbServ: DBService,
    public bpServ: BPService
  ) {}

  ionViewDidLoad() {
    this.bpServ.fetchBPdata()
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
