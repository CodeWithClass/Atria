import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { ThrowStmt } from '@angular/compiler';

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

  maxCalories: string = "2000";
  currCalories: string = "1560";
  bpMetrics: any[] = [{ data: [148, 159, 135, 128], label: 'Systolic' },
                      { data: [85, 79, 80, 96], label: 'Diastolic' },
                        ];
  bpTimeline: string[] = ['Earlier', 'Previous', 'Current', 'Predicted'];

  public lineChartData: Array<any> = this.bpMetrics;
  public lineChartLabels: Array<any> = this.bpTimeline;
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

  

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }



  launchSettings(){
    this.navCtrl.push(SettingsPage);
  }

  getBP(reading: string): number[]{

    if(reading == 'earlier'){
      let Systolic:  number = this.bpMetrics[0].data[0];
      let Diastolic: number = this.bpMetrics[1].data[0];
      let earlierBP: number[] = [Systolic, Diastolic];
      return earlierBP;  
    }
    else if (reading == 'pevious') {
      let Systolic: number = this.bpMetrics[0].data[1];
      let Diastolic: number = this.bpMetrics[1].data[1];
      let previousBP: number[] = [Systolic, Diastolic];
      return previousBP;
    }
    else if(reading == 'current'){
      let Systolic: number = this.bpMetrics[0].data[2];
      let Diastolic: number = this.bpMetrics[1].data[2];
      let currentBP: number[] = [Systolic, Diastolic];
      return currentBP;
    }
    else if (reading == 'predicted') {
      let Systolic: number = this.bpMetrics[0].data[3];
      let Diastolic: number = this.bpMetrics[1].data[3];
      let predictedBP: number[] = [Systolic, Diastolic];
      return predictedBP;
    }
    else{
      let notfound: any[] = [999,999]
      return notfound;
    }
      
      


    
  }
  
  getCurrCalories(){
    return this.currCalories;    
  }

  getMaxCalories(){
    return this.maxCalories
  }

  setCurrCalories(Curr){
  }

  setMaxCalories(Max) {
  }

}
