import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserStatsProvider } from '../../services/user.stats';
/**
 * Generated class for the SleepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sleep',
  templateUrl: 'sleep.html',
})
export class SleepPage {

  public sleepChartType: string = 'doughnut';
  public sleepChartColors: any[] = [{ backgroundColor: ["rgba(167,72,195,0.8)", "rgba(110,89,201,0.8)", "rgba(85,173,224,0.8)"] }];
  public sleepChartData: any[] = [350, 450, 100];
  public sleepTotal: number[] = [8, 39];
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
    },
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userStats: UserStatsProvider){
  }

  ionViewDidLoad() { }
  
  public chartClicked($event) { }

}
