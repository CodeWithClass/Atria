import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserStatsProvider {

  constructor(public http: HttpClient) {
      
  }

  maxCalories: string = "2000";
  currCalories: string = "1560";
  bpMetrics: any[] = [{ data: [148, 159, 135, 128], label: 'Systolic' },
  { data: [85, 79, 80, 96], label: 'Diastolic' },
  ];
  bpTimeline: string[] = ['Earlier', 'Previous', 'Current', 'Predicted'];
  foodIntake =[];




  getBP(reading: string): number[] {

    if (reading == 'earlier') {
      let Systolic: number = this.bpMetrics[0].data[0];
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
    else if (reading == 'current') {
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
    else {
      let notfound: any[] = [999, 999]
      return notfound;
    }

  }

  getCurrCalories() {
    return this.currCalories;
  }

  getMaxCalories() {
    return this.maxCalories
  }

  setCurrCalories(Curr) {
  }

  setMaxCalories(Max) {
  }

  sayHello(){
    console.log('infancy');
    return ('a word from our sponsors');
  }
  

}
