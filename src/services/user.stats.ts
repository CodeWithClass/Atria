import { Injectable } from '@angular/core'
import _ from 'lodash'
import { formatDate } from '../helpers/formatting'
@Injectable()
export class UserStatsProvider {
  todaysDate: string = '0000-00-00'
  ABSOLUTE_DATE: string = '0000-00-00'
  foodIntake: any
  bpData: any
  activityData: any
  sleepData: object
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
    goalCaloriesIn: 0
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

  getActivityGoal(path: string) {
    return _.get(this.activityData, `goals.${path}`, 500)
  }
  getActivityData(path: string) {
    return _.get(this.activityData, `summary.${path}`, 0)
  }

  // =================== sleep ====================

  getBedTotalHrs() {
    const totalMins = _.get(this.sleepData, 'summary.totalTimeInBed', 0)
    return Math.floor(totalMins / 60)
  }

  getBedTotalMins() {
    const totalMins = _.get(this.sleepData, 'summary.totalTimeInBed', 0)
    return totalMins % 60
  }

  getSleepDetails() {
    const sleepDetails = _.get(this.sleepData, 'sleep', {})
    const alseep = _.get(this.sleepData, 'summary.totalMinutesAsleep', 0)
    let awake = 0
    let restless = 0

    sleepDetails.forEach(slp => {
      awake += _.get(slp, 'awakeDuration', 0)
      restless += _.get(slp, 'restlessDuration', 0)
    })
    return [alseep, restless, awake]
  }

  formatSleepDetails(cat) {
    const detailArr = this.getSleepDetails()
    let index
    if (cat === 'asleep') index = 0
    if (cat === 'restless') index = 1
    if (cat === 'awake') index = 2

    const hrs = Math.floor(detailArr[index] / 60)
    const mins = detailArr[index] % 60
    if (hrs > 0) return `${hrs}h ${mins}m`
    return `${mins}m`
  }
}
