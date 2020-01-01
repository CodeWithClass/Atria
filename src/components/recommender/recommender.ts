import { Component } from '@angular/core'
import { RecommenderProvider } from '../../providers/recommender/recommender.service'
import { UserStatsProvider } from '../../services/user.stats'
@Component({
  selector: 'recommender',
  templateUrl: 'recommender.html'
})
export class RecommenderComponent {
  public recommendations
  public one
  public two
  public fname: string
  public summary = { key: '', msg: '' }

  constructor(rProv: RecommenderProvider, uStats: UserStatsProvider) {
    this.recommendations = rProv.recommendations
    this.one = rProv.currRecommendation[0]
    this.two = rProv.currRecommendation[1]
    this.fname = uStats.userStatsContainer.fname
    this.summary = rProv.currSummary.msg
  }

  getCurrRecommendation() {}
}
