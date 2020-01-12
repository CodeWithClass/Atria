import { Component } from '@angular/core'
import { formatDateShort, timeTravel } from '../../helpers/time'
import { UserStatsProvider } from '../../services/user.stats'
import _ from 'lodash'

@Component({
  selector: 'time-travel',
  templateUrl: 'time-travel.html'
})
export class TimeTravelComponent {
  date: string
  displayDate: string
  preventForward: boolean = true
  dateColor: string = 'white'

  constructor(public userStats: UserStatsProvider) {
    this.date = userStats.ABSOLUTE_DATE
    this.checkIfToday()
  }

  checkIfToday() {
    if (this.userStats.todaysDate === this.userStats.ABSOLUTE_DATE) {
      this.displayDate = 'Today'
      this.preventForward = true
    } else {
      this.displayDate = formatDateShort(this.userStats.todaysDate)
      this.preventForward = false
    }
  }
  goBack() {
    this.preventForward = false
    this.userStats.todaysDate = timeTravel(this.userStats.todaysDate, 'past')
    this.displayDate = formatDateShort(this.userStats.todaysDate)
    this.processData(this.userStats.allData)
  }
  goForward() {
    this.userStats.todaysDate = timeTravel(this.userStats.todaysDate, 'future')
    this.displayDate = formatDateShort(this.userStats.todaysDate)
    this.checkIfToday()
    this.processData(this.userStats.allData)
  }

  public processData(data = {}) {
    const { todaysDate } = this.userStats
    this.userStats.bpData = _.get(
      data,
      `dailyStats.${todaysDate}.bp`,
      this.userStats.bpData
    )
    this.userStats.processActivityData(
      _.get(data, `dailyStats.${todaysDate}.activities`, {})
    )
    this.userStats.processSleepData(
      _.get(data, `dailyStats.${todaysDate}.sleep`, {})
    )
    this.userStats.processNutrientData(
      _.get(data, `dailyStats.${todaysDate}.nutrients`, {})
    )
  }
}
