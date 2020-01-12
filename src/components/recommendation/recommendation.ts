import { Component, Input, NgZone } from '@angular/core'
import { formatDateDetailed } from '../../helpers/time'
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
  userAction: string = ''
  bkgColor: string = ''
  txtColor: string = ''
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
    if (action === 'skip') {
      this.userAction = 'Skipping'
      this.bkgColor = '#488aff'
      this.txtColor = '#fff'
    }
    if (action === 'done') {
      this.userAction = 'Calculating'
      this.bkgColor = '#2ffcaa'
      this.txtColor = '#222'
    }

    clearTimeout(this.countdown)

    this.countdown = setTimeout(() => {
      if (action === 'skip') {
        this.recommendation.skipCount += 1
        this.recommendation.skipTime = formatDateDetailed()
        this.showSkipped()
        this.rProv.process(this.recommendation)
      }
      if (action === 'done') {
        this.recommendation.done = true
        this.recommendation.doneTime = formatDateDetailed()
        this.showCongrats()
        this.rProv.process(this.recommendation)
      }
      this.ngZone.run(() => {
        this.showConfirmation = false
      })
    }, 2500)
  }

  cancelConfirmation() {
    clearTimeout(this.countdown)
    this.showConfirmation = false
    this.showCongratsToast = false
    this.recommendation.show = true
    return
  }

  showCongrats() {
    this.showCongratsToast = true

    setTimeout(() => {
      this.ngZone.run(() => {
        this.showCongratsToast = false
      })
    }, 1200)
  }

  showSkipped() {
    this.showSkippedToast = true

    setTimeout(() => {
      this.ngZone.run(() => {
        this.showSkippedToast = false
      })
    }, 1000)
  }
}
