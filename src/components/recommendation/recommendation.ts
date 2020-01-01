import { Component, Input } from '@angular/core'
import { formatDateDetailed } from '../../helpers/formatting'

@Component({
  selector: 'recommendation',
  templateUrl: 'recommendation.html'
})
export class RecommendationComponent {
  @Input() title: string
  @Input() recommendation = {
    id: 0,
    done: false,
    doneTime: '',
    show: true,
    skipCount: 0,
    skipTime: '',
    text: ''
  }
  showConfirmation = false
  countdown

  constructor() {}

  logDrag(item) {
    const percent = item.getSlidingPercent()
    if (percent > 2) {
      return this.done()
    }
    if (percent < -2) {
      return this.skip()
    }
  }

  skip() {
    this.confirmation('skip')
  }
  done() {
    this.confirmation('done')
  }

  confirmation(action: string) {
    this.showConfirmation = true
    this.recommendation.show = false
    this.countdown = setTimeout(() => {
      this.showConfirmation = false

      if (action === 'skip') {
        this.recommendation.skipCount += 1
        this.recommendation.skipTime = formatDateDetailed()
      }
      if (action === 'done') {
        this.recommendation.done = true
        this.recommendation.doneTime = formatDateDetailed()
      }
    }, 5000)

    if (action === 'cancel') {
      clearTimeout(this.countdown)
      this.showConfirmation = false
      this.recommendation.show = true
    }
  }
}
