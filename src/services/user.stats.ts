import { Injectable } from '@angular/core'
import _ from 'lodash'
import { formatDate, timeAmPm, formatMinutes } from '../helpers/formatting'
@Injectable()
export class UserStatsProvider {
  todaysDate: string = '0000-00-00'
  ABSOLUTE_DATE: string = '0000-00-00'
  foodIntake: any
  bpData: any
  activityData = {
    activeScore: 0,
    activityCalories: 0,
    caloriesBMR: 0,
    caloriesOut: 0,
    distances: [],
    fairlyActiveMinutes: 0,
    lightlyActiveMinutes: 0,
    marginalCalories: 0,
    sedentaryMinutes: 0,
    steps: 0,
    veryActiveMinutes: 0
  }
  sleepData = {
    mainSleep: {
      startTime: '',
      endTime: '',
      timeInBed: [0, 0],
      minutesAsleep: 0,
      sleepTime: [0, 0],
      awakeningsCount: 0,
      awakeDuration: 0,
      awakeTime: [0, 0],
      restlessCount: 0,
      restlessDuration: 0,
      restlessTime: [0, 0],
      efficiency: 0
    }
  }
  withingsAuth: object
  fitbitAuth: object
  userDailyStats: any
  userStatsContainer = {
    fname: '',
    lname: '',
    age: 0,
    gender: '',
    heightFeet: '',
    heightInches: '',
    healthGoal: '',
    goalCaloriesIn: 0,
    goalCaloriesOut: 0
  }
  goalCaloriesIn: number = 2000
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
    this.todaysDate = this.ABSOLUTE_DATE = formatDate(new Date())
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
        return (
          this.userStatsContainer['goalCaloriesIn'] ||
          this.userStatsContainer['goalCalories'] ||
          0
        )
      } else {
        return 0
      }
    } catch (e) {
      return 0
    }
  }

  setCurrCalories(Curr: any) {}

  setgoalCalories(Max: any) {}

  //================= activity ====================/
  processActivityData(data) {
    this.activityData = _.get(data, `summary`, {})
  }
  getActivityGoal(path: string) {
    return _.get(this.activityData, `goals.${path}`, 500)
  }
  getActivityData(path: string) {
    return _.get(this.activityData, `summary.${path}`, 0)
  }

  // =================== sleep ====================
  processSleepData(data) {
    this.formatMainSleep(data)
  }

  formatMainSleep(data) {
    const sleepDetails = _.get(data, 'sleep', [])
    const mainSleep = sleepDetails.filter(slpElem => {
      return slpElem.isMainSleep === true
    })

    this.sleepData.mainSleep = { ...mainSleep[0] }
    this.sleepData.mainSleep.timeInBed = formatMinutes(mainSleep[0].timeInBed) // prettier-ignore
    this.sleepData.mainSleep.sleepTime = formatMinutes(mainSleep[0].minutesAsleep) // prettier-ignore
    this.sleepData.mainSleep.restlessTime = formatMinutes( mainSleep[0].restlessDuration) // prettier-ignore
    this.sleepData.mainSleep.awakeTime = formatMinutes(mainSleep[0].awakeDuration) // prettier-ignore
    this.sleepData.mainSleep.startTime = timeAmPm(mainSleep[0].startTime) // prettier-ignore
    this.sleepData.mainSleep.endTime = timeAmPm(mainSleep[0].endTime) // prettier-ignore
  }
}
