import { Component, Input, NgZone } from '@angular/core'
import { formatDateDetailed } from '../../helpers/formatting'
import { RecommenderProvider } from '../../providers/recommender/recommender.service'

@Component({
  selector: 'recommendation',
  templateUrl: 'recommendation.html'
})
export class RecommendationComponent {
  @Input() recommendation
  showConfirmation: boolean = false
  showCongratsToast: boolean = false
  showSkippedToast: boolean = false

  countdown: number
  // userCancel: boolean = false  //remove if works in a few days from 4/1/20
  userAction: string = ''
  constructor(public rProv: RecommenderProvider, public ngZone: NgZone) {}

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
    // this.userCancel = false
    if (action === 'skip') this.userAction = 'Skipping'
    if (action === 'done') this.userAction = 'Calculating'

    clearTimeout(this.countdown)

    this.countdown = setTimeout(() => {
      if (action === 'skip') {
        this.recommendation.skipCount += 1
        this.recommendation.skipTime = formatDateDetailed()
        this.showSkipped()
      }
      if (action === 'done') {
        this.recommendation.done = true
        this.recommendation.doneTime = formatDateDetailed()
        this.showCongrats()
      }
      this.ngZone.run(() => {
        this.showConfirmation = false
      })
    }, 2500)
  }

  cancelConfirmation() {
    // this.userCancel = true
    clearTimeout(this.countdown)
    this.showConfirmation = false
    this.showCongratsToast = false
    this.recommendation.show = true
    return
  }

  showCongrats() {
    // if (this.userCancel) return
    this.showCongratsToast = true

    setTimeout(() => {
      this.ngZone.run(() => {
        this.showCongratsToast = false
      })
    }, 1200)
  }

  showSkipped() {
    // if (this.userCancel) return
    this.showSkippedToast = true

    setTimeout(() => {
      this.ngZone.run(() => {
        this.showSkippedToast = false
      })
    }, 1000)
  }
}
