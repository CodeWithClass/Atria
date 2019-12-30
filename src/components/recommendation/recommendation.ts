import { Component, Input } from '@angular/core'

@Component({
  selector: 'recommendation',
  templateUrl: 'recommendation.html'
})
export class RecommendationComponent {
  @Input() title: string
  @Input() id: number

  private recomendations = [
    { id: 0, text: 'Drink 8 oz of water' },
    { id: 1, text: 'Drink 16 oz of water' },
    { id: 2, text: 'Perform 10 jumping jax' },
    { id: 3, text: 'Perform 20 squats' }
  ]
  constructor() {}

  logDrag(item) {
    const percent = item.getSlidingPercent()
    console.log(this.id)

    if (percent > 2) {
      return this.completed()
    }
    if (percent < -2) {
      return this.skip(item)
    }
  }

  skip(item) {
    console.log('skip', item)
  }
  completed() {
    console.log('completely')
  }
}
