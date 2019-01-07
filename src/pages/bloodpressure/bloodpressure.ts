import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserStatsProvider } from '../../services/user.stats';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ManualbpPage } from './manualbp/manualbp';
import { BPService } from '../../services/bp.service'
import { from } from 'rxjs';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the BloodpressurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bloodpressure',
  templateUrl: 'bloodpressure.html',
})

export class BloodPressurePage {
  @ViewChild(BaseChartDirective)

  public chart: BaseChartDirective;
  public lineChartData: Array<any>;
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


 
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userStats: UserStatsProvider,
              public bpService: BPService,
              // public inAppBrowser: InAppBrowser
            ) {
     
  
    let myChartData = [
      {data: [], label: "systolic"},
      { data: [], label: "diastolic" }
    ];

    myChartData[0].data = this.userStats.bpMetrics.map(each=>{
      return each.measurement.systolic || 0
    });
    myChartData[1].data = this.userStats.bpMetrics.map(each => {
      return each.measurement.diastolic || 0
    });
    
    //ensure only last 4 readings
    // let noOfBpReadings = this.userStats.bpMetrics.length
    // myChartData[0].data.slice(noOfBpReadings - 4, noOfBpReadings -1)
    // myChartData[1].data.slice(noOfBpReadings - 4, noOfBpReadings- 1)

    this.lineChartData = myChartData;
  }

   // line chart events
  // public chartClicked(e: any): void {
  //   console.log(e)
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }

  bpAuth(){
    return this.bpService.withingsAuth(); 
  }

  fetchBPdata(manual){
    return this.bpService.fetchBPdata(manual);
  }

  launchManualAdd(){
    this.navCtrl.push(ManualbpPage, {}, { animate: true, direction: 'forward' });
  }

  ngAfterViewInit() {

  }

  ionViewDidLoad(){
  }

  public refresh(){
    this.bpService.fetchBPdata(true);
    this.chart.ngOnChanges({});
  }


}
