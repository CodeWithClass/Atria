import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserStatsProvider } from '../../providers/user-stats/user-stats';
import { DBService } from '../../services/db.service'
import { FoodPage } from "../food/food";
import { MyStatsPage } from '../mystats/mystats';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public userStats: UserStatsProvider,
              public dbServ: DBService) {
      
    this.dbServ.loadDBdata();

  }

  public lineChartData: Array<any> = this.userStats.bpMetrics;
  public lineChartLabels: Array<any> = this.userStats.bpTimeline;
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: "white",
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "white",
        }
      }],
      yAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "white",
          stepSize: 20,
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },

    { // grey
      backgroundColor: 'rgba(256,256,256,0.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  

  // line chart events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  public pushFoodPage() {
    this.navCtrl.push(FoodPage, {}, { animate: true, direction: 'forward' });
  }

  public popFoodPage(){
    this.navCtrl.pop();
  }

  public pushPage(page, swipe = {offsetDirection: 0}){
    
    if (swipe.offsetDirection === 2 || swipe.offsetDirection === 0){
    // console.log(direction)
      if(page == 'food')
        this.navCtrl.push(FoodPage, {}, { animate: true, direction: 'forward' });  
      else if(page == 'stats')
        this.navCtrl.push(MyStatsPage, {}, { animate: true, direction: 'forward' });  
    }
  
    }

  launchSettings(){
    this.navCtrl.push(SettingsPage);
  }


}
