import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map'
import _ from 'lodash'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { URLSearchParams } from '@angular/http'
import { HttpClient } from '@angular/common/http'
import { UserStatsProvider } from './user.stats'
import { DBService } from './db.service'
import { AuthService } from './auth.service'
@Injectable()
export class FitbitService {
  private client_id: string = '22DKK3'
  private redirect_uri: string = 'https://atria.coach/api/fitbit/auth'
  private fitbitAuthURL: string = 'https://www.fitbit.com/oauth2/authorize?'
  private revokeURL: string = 'https://atria.coach/api/fitbit/revoketoken?'
  private fitbitDataUrl: string = 'https://atria.coach/api/fitbit/fetchdata?'
  private response_type: string = 'code'
  private scope =
    'activity heartrate location nutrition profile settings sleep social weight'

  constructor(
    public inAppBrowser: InAppBrowser,
    public userStats: UserStatsProvider,
    public dbService: DBService,
    public authService: AuthService,
    public http: HttpClient
  ) {}

  public Auth() {
    let params = new URLSearchParams()
    params.set('client_id', this.client_id)
    params.set('response_type', this.response_type)
    params.set('redirect_uri', this.redirect_uri)
    params.set('scope', this.scope)
    params.set('state', this.authService.getUID())

    // console.log(this.fitbitAuthURL + params.toString())
    const browser = this.inAppBrowser.create(
      this.fitbitAuthURL + params.toString(),
      '_self'
    )
    try {
      browser.on('exit').subscribe(() => {})
    } catch (e) {
      console.log(e)
    }
  }

  public getAuthStatus() {
    const fitbitAuthObj = this.userStats.fitbitAuth
    return !!Object.keys(fitbitAuthObj).length
  }

  public revokeAuth() {
    const token = this.userStats.fitbitAuth['refresh_token'] || ''
    const params = new URLSearchParams()
    params.set('token', token)
    params.set('firebaseUID', this.authService.getUID())
    const url = this.revokeURL + params.toString()

    return this.http.get(url).subscribe(
      res => {},
      err => console.log(err)
    )
  }

  public getData(manual: boolean = false, category: string) {
    if (!this.userStats.fitbitAuth && manual) return this.Auth()
    else if (!this.userStats.fitbitAuth) return

    if (Object.keys(this.userStats.fitbitAuth).length === 0 && manual)
      return this.Auth()
    else if (Object.keys(this.userStats.fitbitAuth).length === 0) return

    const params = new URLSearchParams()
    const refresh_token = _.get(this.userStats, 'fitbitAuth.refresh_token', '')
    params.set('refresh_token', refresh_token)
    params.set('firebaseUID', this.authService.getUID())
    params.set('category', category)
    params.set('date', this.userStats.todaysDate)

    const url = this.fitbitDataUrl + params.toString()
    this.http.get(url).subscribe(
      res => {
        if (_.get(res, 'response.fbstatus') !== 200)
          console.log('fitbit.com data fetch err: ', res)
      },
      err => {
        console.log('fitbit data fetch err: ', err)
      }
    )
  }
}
