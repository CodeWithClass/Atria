import { Injectable } from '@angular/core'
import { recData } from '../../mockData/recommendations'
import { sumData } from '../../mockData/summaries'

@Injectable()
export class RecommenderProvider {
  public recommendations = recData
  public currRecommendation
  public summaries = sumData
  public currSummary

  constructor() {
    this.randomize()
  }

  public randomize() {
    let rand1 = Math.floor(Math.random() * 4)
    let rand2 = Math.floor(Math.random() * 4)
    while (rand1 === rand2) {
      rand2 = Math.floor(Math.random() * 4)
    }
    console.log(rand1, rand2)
    this.currRecommendation = [
      this.recommendations[rand1],
      this.recommendations[rand2]
    ]
    this.currSummary = this.summaries[rand1]
  }
}
