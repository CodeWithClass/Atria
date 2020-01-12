import _ from 'lodash'
import { Injectable } from '@angular/core'
//TODO remove mockdata
import { recData } from '../../mockData/recommendations'
import { sumData } from '../../mockData/summaries'
import { AuthService } from '../../services/auth.service'
import { HttpClient } from '@angular/common/http'
import { formatDate } from '../../helpers/formatting'
import { UserStatsProvider } from '../../services/user.stats'

@Injectable()
export class RecommenderProvider {
  public recommendations = recData
  public currRecommendation
  public summaries = sumData
  public currSummary = { key: '', msg: '' }
  public recExists = false
  public sumExists = false

  private genRecUrl: string = 'https://atria.coach/api/recommendation/generate?'
  // private genRecUrl: string =
  //   'http://localhost:8080/api/recommendation/generate?'
  private procRecUrl: string = 'https://atria.coach/api/recommendation/process?'
  // private procRecUrl: string =
  //   'http://localhost:8080/api/recommendation/process?'

  constructor(
    public authService: AuthService,
    public http: HttpClient,
    public userStats: UserStatsProvider
  ) {
    this.displayRec()
  }

  public generateRec() {
    // return new Promise((resolve, reject) => {
    const params = new URLSearchParams()
    params.set('firebaseUID', this.authService.getUID())
    params.set('date', formatDate())

    const url = this.genRecUrl + params.toString()
    this.http.get(url).subscribe(
      res => {
        if (_.get(res, 'response.fbstatus') !== 200)
          console.log('fitbit.com data fetch res err: ', res)
        // resolve(res)
      },
      err => {
        console.log('fitbit data fetch err: ', err)
        // reject(err)
      }
    )
    // })
  }

  public process(data = {}) {
    const params = new URLSearchParams()
    params.set('firebaseUID', this.authService.getUID())
    params.set('date', formatDate())

    const url = this.procRecUrl + params.toString()
    this.http.post(url, data).subscribe(
      res => {
        if (_.get(res, 'response.fbstatus') !== 200)
          console.log('fitbit.com data fetch res err: ', res)
      },
      err => {
        console.log('fitbit data fetch err: ', err)
      }
    )
  }

  public displayRec() {
    this.currRecommendation = _.get(
      this.userStats,
      'currRec.recommendations',
      {}
    )
    this.currSummary = _.get(this.userStats, 'currRec.summary', {})
    if (!_.isEmpty(this.currSummary)) this.sumExists = true
    if (!_.isEmpty(this.currRecommendation)) this.recExists = true
  }
  // TODO remove randomize
  public randomize() {
    let rand1 = Math.floor(Math.random() * 4)
    let rand2 = Math.floor(Math.random() * 4)
    while (rand1 === rand2) {
      rand2 = Math.floor(Math.random() * 4)
    }
    this.currRecommendation = [
      this.recommendations[rand1],
      this.recommendations[rand2]
    ]
    this.currSummary = this.summaries[rand1]
  }
}
