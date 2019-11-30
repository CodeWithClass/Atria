import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { AuthService } from './auth.service'
import { UserStatsProvider } from './user.stats'
import _ from 'lodash'
@Injectable()
export class DBService {
  public arrData
  public fireDBload = false
  constructor(
    private fdb: AngularFireDatabase,
    public authService: AuthService,
    public userStats: UserStatsProvider
  ) {}

  loadDBdata(cb) {
    this.fdb
      .object('users/' + this.authService.getUID())
      .valueChanges()
      .subscribe(data => {
        if (!data) return cb()
        try {
          const { todaysDate } = this.userStats
          this.userStats.withingsAuth = _.get(data, 'withingsAuth', '')
          this.userStats.fitbitAuth = _.get(data, 'fitbitAuth', '')
          this.userStats.userStatsContainer = _.get(data, 'stats', '')
          this.userStats.foodIntake = _.get(data, 'meals', '')
          this.userStats.userDailyStats = _.get(
            data,
            `dailyStats.${todaysDate}`,
            ''
          )
          this.userStats.bpMetrics = _.get(
            data,
            `dailyStats.${todaysDate}.bp`,
            this.userStats.bpMetrics
          )
          this.userStats.activityData = _.get(
            this.userStats.userDailyStats,
            'activities',
            ''
          )

          return cb(data)
        } catch (e) {
          console.log(e)
          return cb()
        }
      })
  }

  public setIfStats(userProfileStats) {
    if (userProfileStats)
      _.set(this.userStats, 'userStatsContainer.nodata', false)
    else _.set(this.userStats, 'userStatsContainer.nodata', true)

    console.log(this.userStats.userStatsContainer)
  }

  writeFoodToDB(date, meal, foodname, data) {
    this.fdb
      .list(
        'users/' + this.authService.getUID() + '/meals/' + date + '/' + meal
      )
      .set(this.strCleanUp(foodname), data)
  }

  removeFromDB(date, meal, foodname) {
    console.log('removal of ' + foodname)
    this.fdb
      .list(
        'users/' + this.authService.getUID() + '/meals/' + date + '/' + meal
      )
      .remove(this.strCleanUp(foodname))
  }

  writeDailyStatsToDB(date, data, cat) {
    this.fdb
      .list('users/' + this.authService.getUID() + '/dailyStats/' + date)
      .set(cat, data)
  }

  writeStatsToDB(data) {
    this.fdb.list('users/' + this.authService.getUID()).set('stats', data)
  }

  storewithingsAuth(data) {
    this.fdb
      .list('users/' + this.authService.getUID())
      .set('withingsAuth', data)
  }

  user(data) {
    this.fdb.list('users/' + this.authService.getUID()).set('user', data)
  }

  strCleanUp(str) {
    let STR = str.replace(/:[..#$\[\]\///\._]/g, ' ')
    return STR
  }
}
