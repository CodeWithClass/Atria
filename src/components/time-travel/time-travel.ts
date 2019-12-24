import { Component } from '@angular/core'
import { formatDateShort, timeTravel } from '../../helpers/formatting'
import { UserStatsProvider } from '../../services/user.stats'
@Component({
  selector: 'time-travel',
  templateUrl: 'time-travel.html'
})
export class TimeTravelComponent {
  date: string
  displayDate: string
  notToday: boolean = false
  constructor(public userStats: UserStatsProvider) {
    this.date = userStats.ABSOLUTE_DATE
    this.checkIfToday()
  }

  checkIfToday() {
    if (this.userStats.todaysDate === this.userStats.ABSOLUTE_DATE)
      this.displayDate = 'Today'
    else this.displayDate = formatDateShort(this.date)
  }
  goBack() {
    console.log(this.date)
    this.date = timeTravel(this.date, 'past')
    this.displayDate = formatDateShort(this.date)
    this.userStats.todaysDate = this.date
    this.checkIfToday() //dont need this gonna stop forward when present
  }
  goForward() {
    this.date = timeTravel(this.date, 'future')
    this.displayDate = formatDateShort(this.date)
    this.userStats.todaysDate = this.date
    this.checkIfToday()
  }
}
