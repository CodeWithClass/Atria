import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FitbitService } from '../../services/fitbit.service'

@IonicPage()
@Component({
    selector: 'page-activity',
    templateUrl: 'activity.html'
})
export class ActivityPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fbService: FitbitService
    ) {}

    fitbitAuth() {
        return this.fbService.Auth()
    }
}
