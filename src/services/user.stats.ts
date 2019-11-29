import { Injectable } from '@angular/core'

@Injectable()
export class UserStatsProvider {
  todaysDate: string = '0000-00-00'
  ABSOLUTE_DATE: string = '0000-00-00'
  foodIntake: any
  bpData: any
  activityData: any
  withingsAuth: object
  fitbitAuth: object
  userDailyStats: any
  userStatsContainer = {
    fname: '',
    lname: '',
    age: 0,
    heightFeet: '',
    heightInches: '',
    goalCalories: 0
  }
  goalCalories: number = 2000
  currCalories: number = 0

  bpMetrics: any[] = [
    {
      measurement: { date: 0, diastolic: 0, systolic: 0, hr: 0 }
    },
    {
      measurement: { date: 0, diastolic: 0, systolic: 0, hr: 0 }
    }
  ]
  bpTimeline: string[] = ['Earlier', 'Previous', 'Current', 'Predicted']

  constructor() {
    let fullDate = new Date()
    this.todaysDate = this.ABSOLUTE_DATE =
      fullDate.getFullYear() +
      '-' +
      (fullDate.getMonth() + 1) +
      '-' +
      fullDate.getDate()
  }

  getBP(reading: string): number[] {
    if (!this.bpMetrics) return [0, 0]
    // let bpMetrics = this.bpMetrics
    let eIndex = this.bpMetrics.length - 4
    let pIndex = this.bpMetrics.length - 3
    let cIndex = this.bpMetrics.length - 2
    let predIndex = this.bpMetrics.length - 1
    // console.log(this.bpMetrics)

    if (reading == 'earlier') {
      let Systolic: number = this.bpMetrics[eIndex]['HP'] || 0
      let Diastolic: number = this.bpMetrics[eIndex]['LP'] || 0
      return [Systolic, Diastolic]
    } else if (reading == 'pevious') {
      let Systolic: number = this.bpMetrics[pIndex]['HP'] || 0
      let Diastolic: number = this.bpMetrics[pIndex]['LP'] || 0
      return [Systolic, Diastolic]
    } else if (reading == 'current') {
      let Systolic: number = this.bpMetrics[cIndex]['HP'] || 0
      let Diastolic: number = this.bpMetrics[cIndex]['LP'] || 0
      return [Systolic, Diastolic]
    } else if (reading == 'predicted') {
      let Systolic: number = this.bpMetrics[predIndex]['HP'] || 0
      let Diastolic: number = this.bpMetrics[predIndex]['LP'] || 0
      return [Systolic, Diastolic]
    } else {
      let notfound: any[] = [999, 999]
      return notfound
    }
  }

  calcMacros(macro: string | number, multiplier: number) {
    let percent: number

    try {
      if (this.userDailyStats[this.todaysDate]) {
        percent =
          ((this.userDailyStats[this.todaysDate]['nutrients'][macro] *
            multiplier) /
            this.getCurrCalories()) *
          100
        return percent
      } else return 0
    } catch (e) {}
  }

  getMicro(microNutrient: string | number) {
    let micro: any
    try {
      if (this.userDailyStats[this.todaysDate]) {
        micro = this.userDailyStats[this.todaysDate]['nutrients'][microNutrient]
        return micro
      } else return 0
    } catch (e) {}
  }

  getCurrCalories() {
    try {
      if (this.userDailyStats[this.todaysDate])
        return this.userDailyStats[this.todaysDate]['nutrients']['Energy']
      else return 0
    } catch (e) {
      // console.log(e)
      // return 0;
    }
  }

  getgoalCalories() {
    try {
      if (Object.keys(this.userStatsContainer).length > 0) {
        return this.userStatsContainer['goalCalories']
      } else {
        return 0
      }
    } catch (e) {
      return 0
    }
  }

  setCurrCalories(Curr: any) {}

  setgoalCalories(Max: any) {}

  sayHello() {
    console.log('infancy')
    return 'a word from our sponsors'
  }
}
