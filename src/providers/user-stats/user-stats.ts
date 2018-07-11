import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';

@Injectable()
export class UserStatsProvider {
  
  todaysDate ='0000-00-00';
  ABSOLUTE_DATE ='0000-00-00';
  foodIntake;
  bpData;
 
  userNutStats;
  userStatsConatiner = {};
  goalCalories: number = 2000;
  currCalories: number = 0;
 
  bpMetrics: any[] = [{ data: [148, 159, 135, 128], label: 'Systolic' },
  { data: [85, 79, 80, 96], label: 'Diastolic' },
  ];
  bpTimeline: string[] = ['Earlier', 'Previous', 'Current', 'Predicted'];



  constructor(public http: HttpClient) {

    let fullDate = new Date();
    this.todaysDate = this.ABSOLUTE_DATE = fullDate.getFullYear() + "-" + fullDate.getMonth() + "-" + fullDate.getDate();
  }
  
  

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
    try{
      if (this.userNutStats[this.todaysDate])
        return this.userNutStats[this.todaysDate]['Energy']
      else
        return 0;
    }
    catch(e){
      // console.log(e)
      // return 0;
    }
  }

  calcMacros(macro, multiplier){
    let percent;

    try{
      if (this.userNutStats[this.todaysDate]){
        percent = (((this.userNutStats[this.todaysDate][macro] * multiplier)/ this.getCurrCalories()) * 100)
        return percent
      }
      else
        return 0;
    }
    catch(e){

    }
  }

  getgoalCalories() {
    try{
      if (Object.keys(this.userStatsConatiner).length > 0){
        return this.userStatsConatiner['goalCalories']
      }
      else{
        return 0
      }
    }
    catch(e){
      return 0;
    }
  }

  setCurrCalories(Curr) {
  }

  setgoalCalories(Max) {
  }

  sayHello(){
    console.log('infancy');
    return ('a word from our sponsors');
  }
  

}
