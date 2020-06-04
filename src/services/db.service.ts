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

  loadDBdata(cb, signout: string = '') {
    if (signout === 'gracefulSignout') {
      this.fdb.database.goOffline()
      return cb()
    }

    this.fdb
      .object('users/' + this.authService.getUID())
      .valueChanges()
      .subscribe(data => {
        if (!data) return cb()
        try {
          const { todaysDate } = this.userStats
          this.userStats.allData = data
          this.userStats.withingsAuth = _.get(data, 'withingsAuth', '')
          this.userStats.fitbitAuth = _.get(data, 'fitbitAuth', '')
          this.userStats.userStatsContainer = _.get(data, 'stats', '')
          this.userStats.foodIntake = _.get(data, 'meals', '')
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
          this.userStats.currRec = _.get(data, 'currRec', {})
          //MACHING LEARNING PLACEHOLDER
          // this.userStats.bpData.unshift({
          //   measurement: {
          //     pid: _.random(1221226674, 8321226674),
          //     date: '',
          //     diastolic: 80,
          //     systolic: 120,
          //     hr: 60
          //   }
          // })
          // ==============================
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
    console.log('uea', data)
    this.fdb
      .list('users/' + this.authService.getUID() + '/dailyStats/' + date)
      .set(cat, data)
  }

  writeStatsToDB(data) {
    this.fdb.list('users').update(`${this.authService.getUID()}/stats`, data)
  }

  storewithingsAuth(data) {
    this.fdb
      .list('users/' + this.authService.getUID())
      .set('withingsAuth', data)
  }

  user(data) {
    this.fdb.list('users').update(`${this.authService.getUID()}/user`, data)
  }

  strCleanUp(str) {
    let STR = str.replace(/:[..#$\[\]\///\._]/g, ' ')
    return STR
  }
}
